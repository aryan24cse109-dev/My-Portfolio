import Image from "next/image";
import type { ReactNode } from "react";

type Readme = { content: string; htmlUrl: string; htmlBase: string; assetBase: string };
const headingTags = { 1: "h1", 2: "h2", 3: "h3", 4: "h4", 5: "h5", 6: "h6" } as const;

function resolveUrl(value: string, base: string) {
  try {
    const url = new URL(value, base);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function inline(value: string, readme: Readme, keyPrefix: string): ReactNode[] {
  const tokens = /(!?)\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)|`([^`]+)`|\*\*([^*]+)\*\*|__([^_]+)__|~~([^~]+)~~|\*([^*]+)\*|_([^_]+)_/g;
  const result: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = tokens.exec(value))) {
    if (match.index > cursor) result.push(value.slice(cursor, match.index));
    const key = `${keyPrefix}-${index++}`;
    if (match[2] !== undefined) {
      const image = match[1] === "!";
      const base = image ? readme.assetBase : readme.htmlBase;
      const href = resolveUrl(match[3], base);
      if (image && href) result.push(<Image key={key} className="github-readme-image" src={href} alt={match[2]} title={match[4]} width={1200} height={720} unoptimized />);
      else if (!image && href) result.push(<a key={key} href={href} target="_blank" rel="noopener noreferrer">{inline(match[2], readme, key)}</a>);
      else result.push(match[2]);
    } else if (match[5] !== undefined) result.push(<code key={key}>{match[5]}</code>);
    else if (match[6] !== undefined || match[7] !== undefined) result.push(<strong key={key}>{match[6] ?? match[7]}</strong>);
    else if (match[8] !== undefined) result.push(<del key={key}>{match[8]}</del>);
    else result.push(<em key={key}>{match[9] ?? match[10]}</em>);
    cursor = tokens.lastIndex;
  }
  if (cursor < value.length) result.push(value.slice(cursor));
  return result;
}

function isBlockStart(line: string) {
  return /^\s*```/.test(line) || /^#{1,6}\s/.test(line) || /^\s*>/.test(line) || /^\s*[-+*]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line) || /^\s*([-*_]\s*){3,}$/.test(line);
}

function cells(line: string) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function Markdown({ readme }: { readme: Readme }) {
  const lines = readme.content.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index++; continue; }
    const fence = line.match(/^\s*```\s*([\w+-]*)/);
    if (fence) {
      index++;
      const code: string[] = [];
      while (index < lines.length && !/^\s*```/.test(lines[index])) code.push(lines[index++]);
      if (index < lines.length) index++;
      blocks.push(<pre key={`code-${index}`}><code className={fence[1] ? `language-${fence[1]}` : undefined}>{code.join("\n")}</code></pre>);
      continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.*?)(?:\s+#+)?$/);
    if (heading) {
      const Tag = headingTags[heading[1].length as keyof typeof headingTags];
      blocks.push(<Tag key={`heading-${index}`}>{inline(heading[2], readme, `h-${index}`)}</Tag>);
      index++;
      continue;
    }
    if (/^\s*([-*_]\s*){3,}$/.test(line)) { blocks.push(<hr key={`hr-${index++}`} />); continue; }
    if (/^\s*>/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^\s*>/.test(lines[index])) quote.push(lines[index++].replace(/^\s*> ?/, ""));
      blocks.push(<blockquote key={`quote-${index}`}>{inline(quote.join(" "), readme, `q-${index}`)}</blockquote>);
      continue;
    }
    const listMatch = line.match(/^\s*(?:[-+*]|\d+[.)])\s+/);
    if (listMatch) {
      const ordered = /^\s*\d/.test(line);
      const items: string[] = [];
      while (index < lines.length && /^\s*(?:[-+*]|\d+[.)])\s+/.test(lines[index])) items.push(lines[index++].replace(/^\s*(?:[-+*]|\d+[.)])\s+/, ""));
      const List = ordered ? "ol" : "ul";
      blocks.push(<List key={`list-${index}`}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item, readme, `li-${index}-${itemIndex}`)}</li>)}</List>);
      continue;
    }
    if (line.includes("|") && index + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[index + 1])) {
      const headers = cells(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].includes("|")) rows.push(cells(lines[index++]));
      blocks.push(<div className="github-readme-table-wrap" key={`table-${index}`}><table><thead><tr>{headers.map((cell, cellIndex) => <th key={cellIndex}>{inline(cell, readme, `th-${index}-${cellIndex}`)}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{headers.map((_, cellIndex) => <td key={cellIndex}>{inline(row[cellIndex] ?? "", readme, `td-${index}-${rowIndex}-${cellIndex}`)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }
    const paragraph = [line];
    index++;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) paragraph.push(lines[index++]);
    blocks.push(<p key={`p-${index}`}>{inline(paragraph.join(" "), readme, `p-${index}`)}</p>);
  }
  return <div className="github-readme-content">{blocks}</div>;
}

export function GitHubProfileReadme({ readme, status, login }: { readme: Readme | null; status: "available" | "missing" | "unavailable"; login: string }) {
  return <section className="github-profile-readme" aria-labelledby="github-readme-title">
    <div className="github-panel-heading"><div><span className="eyebrow"><i /> PROFILE README</span><h2 id="github-readme-title">A little more about {login}</h2></div>{readme && <a className="inline-link" href={readme.htmlUrl} target="_blank" rel="noreferrer">View on GitHub ↗</a>}</div>
    {readme ? <Markdown readme={readme} /> : <div className="github-unavailable" role="status"><strong>{status === "missing" ? "No public profile README found" : "Profile README unavailable"}</strong><p>{status === "missing" ? `A public ${login}/${login} repository README will appear here when available.` : "GitHub could not provide this public README right now. The rest of the profile can still be viewed below."}</p></div>}
  </section>;
}
