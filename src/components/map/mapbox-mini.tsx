"use client";

import { useEffect, useRef } from "react";
import type { Map as MapboxMap, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  MAPBOX_TOKEN,
  MAPBOX_STYLE,
  applySlovakLabels,
  createDotMarker,
} from "./mapbox-shared";

/* Malá Mapbox mapa s jedným bodom — rovnaký štýl (outdoors + slovenské
   popisky) ako hlavná mapa. Použitá v itinerári pre lokalitu dňa. */
export function MapboxMini({
  lat,
  lng,
  label,
  zoom = 9,
  heightCss = "16rem",
}: {
  lat: number;
  lng: number;
  label?: string;
  zoom?: number;
  heightCss?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  // Inicializácia — raz
  useEffect(() => {
    if (!MAPBOX_TOKEN || !containerRef.current || mapRef.current) return;
    let cancelled = false;

    import("mapbox-gl").then((mod) => {
      const el = containerRef.current;
      if (cancelled || !el) return;
      const mapboxgl = mod.default;
      mapboxgl.accessToken = MAPBOX_TOKEN!;
      const map = new mapboxgl.Map({
        container: el,
        style: MAPBOX_STYLE,
        center: [lng, lat],
        zoom,
        projection: "mercator", // klasická plochá mapa (v3 default globe robí biele dlaždice)
        attributionControl: false, // nahradíme kompaktnou (i) — ToS-compliant
      });
      map.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "top-right"
      );
      map.addControl(new mapboxgl.AttributionControl({ compact: true }));
      map.on("style.load", () => {
        applySlovakLabels(map);
        map.resize();
      });
      map.on("load", () => map.resize());

      markerRef.current = new mapboxgl.Marker({
        element: createDotMarker("#2f6d5e"),
      })
        .setLngLat([lng, lat])
        .addTo(map);

      mapRef.current = map;

      // Prekresli pri každej zmene veľkosti kontajnera (grid stĺpec sa dopočíta
      // až po layoute, plus plynulé zväčšenie) — observer viazaný na túto mapu.
      if (typeof ResizeObserver !== "undefined") {
        roRef.current = new ResizeObserver(() => map.resize());
        roRef.current.observe(el);
      }
      // Poistka: prekresli po ďalšom frame (kontajner mohol mať 0 šírku).
      requestAnimationFrame(() =>
        requestAnimationFrame(() => !cancelled && map.resize())
      );
    }).catch((e) => console.error("MapboxMini init zlyhal:", e));

    return () => {
      cancelled = true;
      roRef.current?.disconnect();
      roRef.current = null;
      markerRef.current?.remove();
      markerRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prepni stred + bod pri zmene dňa
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({ center: [lng, lat], zoom, duration: 800, essential: true });
    markerRef.current?.setLngLat([lng, lat]);
  }, [lat, lng, zoom]);

  // Fallback bez tokenu — OpenStreetMap embed
  if (!MAPBOX_TOKEN) {
    return (
      <iframe
        title={label ? `Mapa — ${label}` : "Mapa"}
        className="w-full"
        style={{ height: heightCss, transition: "height 300ms" }}
        loading="lazy"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.25},${lat - 0.18},${lng + 0.25},${lat + 0.18}&marker=${lat},${lng}`}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ height: heightCss, transition: "height 300ms" }}
    />
  );
}
