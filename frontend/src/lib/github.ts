import { contributions } from "@/data/projects";
import { site } from "@/data/site";

const githubHeaders = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "aryan-agarwal-portfolio" };
const cachePolicy = { revalidate: 3600 } as const;
const dashboardCache = new Map<string, { expiresAt: number; value: GitHubDashboardData }>();

export type GitHubDashboardData = {
  year: number;
  cacheSeconds: number;
  profile: { login: string; name: string | null; bio: string | null; avatar: string; url: string; publicRepos: number; location: string | null; blog: string | null; company: string | null; followers: number; following: number } | null;
  profileReadme: { content: string; htmlUrl: string; htmlBase: string; assetBase: string } | null;
  profileReadmeStatus: "available" | "missing" | "unavailable";
  repositories: { name: string; description: string | null; language: string | null; stars: number; forks: number; url: string; updatedAt: string; pushedAt: string | null; visibility: "public" }[];
  calendar: { total: number; days: { date: string; count: number; level: number }[] } | null;
  counts: { pullRequests: number | null; issues: number | null; codeReviews: number | null } | null;
  contributionStatuses: Record<number, "open" | "merged" | "closed" | "unavailable">;
  contributionDetails: Record<number, { title: string; status: "open" | "merged" | "closed" }>;
  contributionStatusError?: string;
  error?: string;
};

type ProfileResponse = { login: string; name: string | null; bio: string | null; avatar_url: string; html_url: string; public_repos: number; location: string | null; blog: string | null; company: string | null; followers: number; following: number };
type RepositoryResponse = { name: string; description: string | null; language: string | null; stargazers_count: number; forks_count: number; html_url: string; fork: boolean; private: boolean; updated_at: string; pushed_at: string | null; visibility?: string }[];
type ReadmeResponse = { content: string; encoding: string; html_url: string; download_url: string };

const graphQLQuery = `query PortfolioActivity($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } }
      pullRequestContributions { totalCount }
      issueContributions { totalCount }
      pullRequestReviewContributions { totalCount }
    }
  }
}`;

export async function getGitHubDashboard(year: number, includePullRequestStatuses = false): Promise<GitHubDashboardData> {
  const safeYear = Number.isInteger(year) && year >= 2010 && year <= new Date().getFullYear() ? year : new Date().getFullYear();
  const cacheKey = `${safeYear}:${includePullRequestStatuses ? "with-pull-requests" : "activity-only"}`;
  const cacheSeconds = Math.max(60, Number(process.env.GITHUB_CACHE_SECONDS) || 3600);
  const cached = dashboardCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.value;
  const cache = (value: Omit<GitHubDashboardData, "cacheSeconds">) => { const cachedValue = { ...value, cacheSeconds }; // Never cache failed/empty contribution results as if they were successful, so a
    // corrected token or recovered API is reflected without waiting for the TTL.
    if (!value.error && value.calendar) dashboardCache.set(cacheKey, { value: cachedValue, expiresAt: Date.now() + cacheSeconds * 1000 }); return cachedValue; };
  const start = `${safeYear}-01-01T00:00:00Z`;
  const end = `${safeYear + 1}-01-01T00:00:00Z`;
  const token = process.env.GITHUB_TOKEN;
  const login = new URL(site.github).pathname.split("/").filter(Boolean).at(-1) ?? "";
  const profilePromise = fetch(`https://api.github.com/users/${login}`, { headers: githubHeaders, next: cachePolicy, signal: AbortSignal.timeout(8000) }).then(async (response) => response.ok ? await response.json() as ProfileResponse : null).catch(() => null);
  const repositoriesPromise = fetch(`https://api.github.com/users/${login}/repos?sort=updated&direction=desc&per_page=100&type=owner`, { headers: githubHeaders, next: cachePolicy, signal: AbortSignal.timeout(8000) }).then(async (response) => response.ok ? await response.json() as RepositoryResponse : []).catch(() => [] as RepositoryResponse);
  const readmePromise = fetch(`https://api.github.com/repos/${login}/${login}/readme`, { headers: githubHeaders, next: cachePolicy, signal: AbortSignal.timeout(8000) }).then(async (response) => {
    if (response.status === 404) return { readme: null, status: "missing" as const };
    if (!response.ok) return { readme: null, status: "unavailable" as const };
    const record = await response.json() as ReadmeResponse;
    if (record.encoding !== "base64" || record.content.length > 220_000) return { readme: null, status: "unavailable" as const };
    const content = Buffer.from(record.content.replace(/\s/g, ""), "base64").toString("utf8");
    if (Buffer.byteLength(content, "utf8") > 160_000) return { readme: null, status: "unavailable" as const };
    return { readme: { content, htmlUrl: record.html_url, htmlBase: new URL(".", record.html_url).toString(), assetBase: new URL(".", record.download_url).toString() }, status: "available" as const };
  }).catch(() => ({ readme: null, status: "unavailable" as const }));
  const statusPromise = includePullRequestStatuses ? (async (): Promise<GitHubDashboardData["contributionDetails"] | { __error: string }> => {
    // Authenticated when a token is available (raises the rate limit and is required for
    // consistent access). Targeted per-PR lookups avoid paginating unrelated PRs.
    const authHeaders = token ? { ...githubHeaders, Authorization: `Bearer ${token}` } : githubHeaders;
    const wanted = contributions.map(({ number }) => number);
    const entries = await Promise.all(wanted.map(async (number) => {
      const response = await fetch(`https://api.github.com/repos/PankajSingh18/AlgoMate/pulls/${number}`, { headers: authHeaders, cache: "no-store", signal: AbortSignal.timeout(8000) });
      if (response.ok) {
        const record = await response.json() as { number: number; title: string; state: string; merged_at: string | null };
        const status: "open" | "merged" | "closed" = record.merged_at ? "merged" : record.state === "open" ? "open" : "closed";
        return [number, { title: record.title, status }] as const;
      }
      // A genuine 404 means the PR does not exist in the repository -> legitimately unavailable.
      if (response.status === 404) return [number, null] as const;
      // Auth, rate-limit, or other transient failures must not be reported as "unavailable";
      // surface a sanitized error instead so the failure is visible, not silently swallowed.
      throw new Error(response.status === 401
        ? "GitHub rejected the server token while loading pull request statuses."
        : response.status === 403 || response.status === 429
          ? "GitHub API rate limit reached while loading pull request statuses."
          : "GitHub pull request status is temporarily unavailable.");
    }));
    return Object.fromEntries(entries.filter((entry): entry is readonly [number, { title: string; status: "open" | "merged" | "closed" }] => entry[1] !== null)) as GitHubDashboardData["contributionDetails"];
  })().catch((error) => ({ __error: error instanceof Error ? error.message : "GitHub pull request status is temporarily unavailable." })) : Promise.resolve({} as GitHubDashboardData["contributionDetails"]);

  const [profileResult, reposResult, readmeResult, detailRecords] = await Promise.all([profilePromise, repositoriesPromise, readmePromise, statusPromise]);
  const profile = profileResult ? { login: profileResult.login, name: profileResult.name, bio: profileResult.bio, avatar: profileResult.avatar_url, url: profileResult.html_url, publicRepos: profileResult.public_repos, location: profileResult.location, blog: profileResult.blog, company: profileResult.company, followers: profileResult.followers, following: profileResult.following } : null;
  const repositories = reposResult.filter((repo) => !repo.fork && !repo.private && (repo.visibility === undefined || repo.visibility === "public")).sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)).slice(0, 8).map((repo) => ({ name: repo.name, description: repo.description, language: repo.language, stars: repo.stargazers_count, forks: repo.forks_count, url: repo.html_url, updatedAt: repo.updated_at, pushedAt: repo.pushed_at, visibility: "public" as const }));
  const contributionStatusError = (detailRecords as { __error?: string }).__error;
  const contributionDetails = contributionStatusError ? {} as GitHubDashboardData["contributionDetails"] : detailRecords as GitHubDashboardData["contributionDetails"];
  const contributionStatuses = Object.fromEntries(contributions.map(({ number }) => [number, contributionDetails[number]?.status ?? "unavailable"])) as GitHubDashboardData["contributionStatuses"];

  if (!token) return cache({ year: safeYear, profile, profileReadme: readmeResult.readme, profileReadmeStatus: readmeResult.status, repositories, calendar: null, counts: null, contributionStatuses, contributionDetails, contributionStatusError, error: "Set GITHUB_TOKEN on the server to load contribution calendar and category counts." });
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST", headers: { ...githubHeaders, Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: graphQLQuery, variables: { login: profile?.login ?? site.github.split("/").at(-1), from: start, to: end } }),
      cache: "no-store", signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(response.status === 401 ? "GitHub rejected the server token. Configure a valid GITHUB_TOKEN to load contribution data." : response.status === 403 || response.status === 429 ? "GitHub API rate limit reached. Try again later." : "GitHub contribution data is temporarily unavailable.");
    const result = await response.json() as {
      data?: { user?: { contributionsCollection: {
        contributionCalendar: { totalContributions: number; weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[] };
        pullRequestContributions: { totalCount: number };
        issueContributions: { totalCount: number };
        pullRequestReviewContributions: { totalCount: number };
      } | null } | null };
      errors?: { message: string }[];
    };
    const collection = result.data?.user?.contributionsCollection;
    // Distinguish GraphQL errors from a missing user and from genuinely empty data.
    if (result.errors?.length) {
      const combined = result.errors.map((item) => item.message).join("; ");
      throw new Error(/rate limit/i.test(combined)
        ? "GitHub API rate limit reached. Try again later."
        : /could not resolve to a user|not found|forbidden|access denied/i.test(combined)
          ? "GitHub could not resolve this account for contribution data. Check the token scopes (read:user) and the configured profile."
          : "GitHub returned an error while loading contribution data.");
    }
    if (!result.data?.user) throw new Error("GitHub could not resolve this account for contribution data. Check the configured GitHub profile URL.");
    if (!collection) throw new Error("GitHub did not return contribution data for this account and year.");
    const days = collection.contributionCalendar.weeks.flatMap((week) => week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount, level: Math.min(4, Math.max(0, ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"].indexOf(day.contributionLevel))) })));
    return cache({ year: safeYear, profile, profileReadme: readmeResult.readme, profileReadmeStatus: readmeResult.status, repositories, calendar: { total: collection.contributionCalendar.totalContributions, days }, counts: { pullRequests: collection.pullRequestContributions.totalCount, issues: collection.issueContributions.totalCount, codeReviews: collection.pullRequestReviewContributions.totalCount }, contributionStatuses, contributionDetails, contributionStatusError });
  } catch (error) {
    return cache({ year: safeYear, profile, profileReadme: readmeResult.readme, profileReadmeStatus: readmeResult.status, repositories, calendar: null, counts: null, contributionStatuses, contributionDetails, contributionStatusError, error: error instanceof Error ? error.message : "GitHub activity is temporarily unavailable." });
  }
}
