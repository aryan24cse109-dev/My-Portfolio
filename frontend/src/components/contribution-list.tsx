"use client";

import { useEffect, useState } from "react";
import { contributions } from "@/data/projects";

type StatusMap = Record<number, "open" | "merged" | "closed" | "unavailable">;
type DetailMap = Record<number, { title: string; status: "open" | "merged" | "closed" }>;

export function ContributionList() {
  const [statuses, setStatuses] = useState<StatusMap>({});
  const [details, setDetails] = useState<DetailMap>({});
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/github?year=${new Date().getFullYear()}&includePullRequests=true`, { signal: controller.signal }).then((response) => response.json()).then((result: { contributionStatuses?: StatusMap; contributionDetails?: DetailMap }) => { setStatuses(result.contributionStatuses ?? {}); setDetails(result.contributionDetails ?? {}); }).catch(() => undefined);
    return () => controller.abort();
  }, []);
  return <div className="contribution-list">{contributions.map((item) => {
    const status = statuses[item.number] ?? "unavailable";
    const label = status === "unavailable" ? "Status unavailable" : status === "merged" ? "Merged" : status === "open" ? "Open" : "Closed, not merged";
    return <article key={item.number}><div><span className="pr-number">#{item.number}</span><span><strong>{details[item.number]?.title ?? item.title}</strong><small>{item.category}</small></span></div><span className={`pr-status status-${status}`} aria-label={`Pull request status: ${label}`}>{label}</span><a href={item.url} target="_blank" rel="noreferrer" aria-label={`Open pull request ${item.number} on GitHub`}>View ↗</a></article>;
  })}<p className="contact-note">Statuses are fetched from the upstream repository; an unavailable label means GitHub’s public API did not confirm that item. No aggregate merged claim is made.</p></div>;
}
