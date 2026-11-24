import { NextResponse } from "next/server";
import { getGitHubDashboard } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requested = Number(new URL(request.url).searchParams.get("year"));
  const includePullRequestStatuses = new URL(request.url).searchParams.get("includePullRequests") === "true";
  const data = await getGitHubDashboard(requested, includePullRequestStatuses);
  return NextResponse.json(data, { headers: { "Cache-Control": "private, max-age=0, must-revalidate" } });
}
