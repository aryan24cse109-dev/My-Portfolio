import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { GitHubDashboard } from "@/components/github-dashboard";
import { getGitHubDashboard } from "@/lib/github";
import { site } from "@/data/site";
import { Reveal } from "@/components/motion";
import { GitHubProfileReadme } from "@/components/github-profile-readme";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "GitHub Activity", description: "GitHub profile, public repositories, and contribution activity for Aryan Agarwal.", alternates: { canonical: "/github" }, openGraph: { images: site.url ? ["/images/og/github-og.png"] : [] } };

export default async function GithubPage() {
  const data = await getGitHubDashboard(new Date().getFullYear());
  const login = data.profile?.login ?? new URL(site.github).pathname.split("/").filter(Boolean).at(-1) ?? "GitHub account";
  return <><section className="page-intro"><Container><Reveal><span className="eyebrow"><i /> GITHUB ACTIVITY</span><h1>Work in the<br />open.</h1><p>Public profile, README, repositories, and GitHub’s contribution calendar when authenticated server-side data is available. Activity counts describe contribution volume, not project quality.</p></Reveal></Container></section><section className="page-body"><Container><GitHubDashboard initialData={data} readme={<Reveal delay={0.20}><GitHubProfileReadme readme={data.profileReadme} status={data.profileReadmeStatus} login={login} /></Reveal>} /></Container></section></>;
}
