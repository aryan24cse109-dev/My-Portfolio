"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import type { GitHubDashboardData } from "@/lib/github";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion";
import type { ReactNode } from "react";

function publicWebsite(value: string | null) {
  if (!value?.trim()) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function GitHubDashboard({ initialData, readme }: { initialData: GitHubDashboardData; readme: ReactNode }) {
  const currentYear = initialData.year;
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const website = publicWebsite(data.profile?.blog ?? null);
  async function selectYear(year: number) {
    setLoading(true);
    try {
      const response = await fetch(`/api/github?year=${year}`);
      const next = await response.json() as GitHubDashboardData;
      setData(next);
    } catch {
      setData((old) => ({ ...old, year, calendar: null, counts: null, error: "GitHub activity could not be refreshed. Try again later." }));
    } finally { setLoading(false); }
  }
  const activityIndex = data.calendar ? Math.min(100, Math.round((data.calendar.total / 365) * 100)) : null;
  const firstDate = data.calendar?.days[0]?.date;
  const leadingEmpty = firstDate ? new Date(`${firstDate}T12:00:00Z`).getUTCDay() : 0;
  const heatmap = data.calendar ? [...Array.from({ length: leadingEmpty }, (_, index) => ({ empty: index })), ...data.calendar.days.map((day) => ({ day }))] : [];

  return <div className="github-dashboard">
    <Reveal delay={0.04}><section className="github-profile-card" aria-label="GitHub profile">
      {data.profile ? <><Image className="github-avatar" src={data.profile.avatar} alt={`${data.profile.login} profile avatar`} width={88} height={88} unoptimized /><div className="github-profile-main"><span className="eyebrow"><i /> PUBLIC PROFILE</span><h2>{data.profile.name || data.profile.login}</h2><p>@{data.profile.login}{data.profile.bio ? ` · ${data.profile.bio}` : ""}</p><div className="github-profile-facts">{data.profile.location && <span>⌖ {data.profile.location}</span>}{data.profile.company && <span>▦ {data.profile.company}</span>}{website && <a href={website} target="_blank" rel="noreferrer">↗ {data.profile.blog}</a>}<span>{data.profile.followers} followers</span><span>{data.profile.following} following</span></div><a className="inline-link" href={data.profile.url} target="_blank" rel="noreferrer">Open GitHub profile ↗</a></div><strong className="github-repo-total">{data.profile.publicRepos}<small> public repositories</small></strong></> : <><div><span className="eyebrow"><i /> PUBLIC PROFILE</span><h2>GitHub profile unavailable</h2><p>GitHub’s public profile endpoint did not return data. You can still open the profile directly.</p></div><a className="inline-link" href={site.github} target="_blank" rel="noreferrer">Open GitHub ↗</a></>}
    </section></Reveal>
    <Reveal delay={0.12}><section className="github-activity-panel">
      <div className="github-panel-heading"><div><span className="eyebrow"><i /> CONTRIBUTION ACTIVITY</span><h2>{data.calendar ? `${data.calendar.total} contributions in ${data.year}` : `Activity for ${data.year}`}</h2></div><label>Year <select value={data.year} onChange={(event) => void selectYear(Number(event.target.value))} disabled={loading}>{Array.from({ length: Math.min(8, currentYear - 2018 + 1) }, (_, index) => currentYear - index).map((year) => <option key={year} value={year}>{year}</option>)}</select></label></div>
      {data.calendar ? <><div className="heatmap-scroll" aria-label={`${data.calendar.total} contributions in ${data.year}`}><div className="heatmap-months" aria-hidden="true">{data.calendar.days.filter((day) => day.date.endsWith("-01")).map((day) => <span key={day.date}>{new Date(`${day.date}T12:00:00Z`).toLocaleString("en", { month: "short", timeZone: "UTC" })}</span>)}</div><div className="heatmap-grid">{heatmap.map((entry) => "empty" in entry ? <i className="heatmap-empty" key={`empty-${entry.empty}`} /> : <i key={entry.day.date} className={`heatmap-day level-${entry.day.level}`} title={`${entry.day.count} contributions on ${entry.day.date}`} role="img" aria-label={`${entry.day.count} contributions on ${entry.day.date}`} />)}</div></div><div className="heatmap-legend"><span>Less</span>{[0,1,2,3,4].map((level) => <i className={`heatmap-day level-${level}`} key={level} />)}<span>More</span><span className="heatmap-total">{data.calendar.total} total for the year</span></div></> : <div className="github-unavailable" role="status"><strong>Contribution calendar unavailable</strong><p>{data.error ?? "GitHub did not return contribution data."} Public repositories may still be listed below. The calendar will appear after the server token is configured and the endpoint is available.</p></div>}
      {data.counts && <div className="github-counts"><div><strong>{data.counts.pullRequests}</strong><span>Pull request contributions</span></div><div><strong>{data.counts.issues}</strong><span>Issue contributions</span></div><div><strong>{data.counts.codeReviews}</strong><span>Code review contributions</span></div></div>}
      {data.calendar && data.counts && <><div className="contribution-table-wrap"><table className="contribution-table"><caption>GitHub contribution categories · {data.year}</caption><thead><tr><th scope="col">Category</th><th scope="col">Count</th></tr></thead><tbody><tr><th scope="row">All contribution types</th><td>{data.calendar.total}</td></tr><tr><th scope="row">Pull request contributions</th><td>{data.counts.pullRequests}</td></tr><tr><th scope="row">Issue contributions</th><td>{data.counts.issues}</td></tr><tr><th scope="row">Code review contributions</th><td>{data.counts.codeReviews}</td></tr></tbody></table></div><aside className="activity-index"><span className="eyebrow"><i /> CUSTOM ACTIVITY INDICATOR</span><strong>{activityIndex}<small>/100</small></strong><p>Activity Index = min(100, round(({data.calendar.total} / 365) × 100)). A volume reference of one contribution per calendar day, capped at 100. It does not measure code quality, skill, impact, or maintainer value and is not an official GitHub rating.</p></aside></>}
    </section></Reveal>
    <Fragment key="profile-readme">{readme}</Fragment>
    <Reveal delay={0.28}><section className="github-repositories"><div className="github-panel-heading"><div><span className="eyebrow"><i /> PUBLIC REPOSITORIES</span><h2>Recently updated repositories</h2></div><a className="inline-link" href={`${data.profile?.url ?? site.github}?tab=repositories`} target="_blank" rel="noreferrer">View all repositories ↗</a></div>{data.repositories.length ? <div className="github-repo-grid">{data.repositories.map((repo, index) => <Reveal key={repo.name} delay={index * 0.055}><a className="github-repo-card" href={repo.url} target="_blank" rel="noreferrer"><span className="eyebrow"><i />{repo.language ?? "Repository"}<em className="github-visibility">PUBLIC</em></span><h3>{repo.name}</h3><p>{repo.description || "No public description provided."}</p><small>★ {repo.stars} <span>·</span> Forks {repo.forks}</small><time dateTime={repo.updatedAt}>Updated {new Date(repo.updatedAt).toLocaleDateString("en", { month: "short", year: "numeric", timeZone: "UTC" })}</time></a></Reveal>)}</div> : <p className="github-unavailable">Public repositories are currently unavailable.</p>}</section></Reveal>
    <p className="contact-note">Data is fetched from GitHub and cached for up to {data.cacheSeconds < 3600 ? `${Math.round(data.cacheSeconds / 60)} minutes` : `${Math.round(data.cacheSeconds / 3600)} hour${data.cacheSeconds >= 7200 ? "s" : ""}`}. GitHub data may change between refreshes.</p>
  </div>;
}
