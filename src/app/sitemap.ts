import type { MetadataRoute } from "next";
import { destinations } from "@/lib/data/destinations";

const BASE = "https://vietnam.sk";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = [
    "",
    "/planovac",
    "/mapa",
    "/destinacie",
    "/udalosti",
    "/itinerare",
    "/prakticke-info",
    "/nastroje",
    "/gastro",
    "/nomadi",
  ].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const dests = destinations.map((d) => ({
    url: `${BASE}/destinacie/${d.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...statics, ...dests];
}
