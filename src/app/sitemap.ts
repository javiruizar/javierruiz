import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-13");
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/aviso-legal`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/privacidad`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
