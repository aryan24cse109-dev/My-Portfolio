import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  const routes = ["", "/about", "/skills", "/projects", "/experience", "/github", "/contact", ...projects.map((project) => `/projects/${project.slug}`)];
  return routes.map((route) => ({ url: `${site.url}${route}`, lastModified: new Date(), changeFrequency: route.includes("/projects/") ? "monthly" : "weekly", priority: route === "" ? 1 : route.includes("/projects/") ? 0.7 : 0.8 }));
}
