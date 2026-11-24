import { existsSync } from "node:fs";
import { join } from "node:path";
import { SiteHeader } from "@/components/site-header";
import { ScrollProgress } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/data/site";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const hasResume = existsSync(join(process.cwd(), "public", site.resumePath.replace(/^\//, "")));
  return <><a className="skip-link" href="#main">Skip to content</a><ScrollProgress /><SiteHeader hasResume={hasResume} />{children}<SiteFooter /></>;
}
