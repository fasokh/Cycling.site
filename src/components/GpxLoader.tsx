"use client";

import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { LatLngBounds } from "leaflet";
import "leaflet-gpx";

const GPXLoader = ({
  gpxFile,
  setLinks,
  isActive,
}: {
  gpxFile: string;
  setLinks: any;
  isActive: boolean;
}) => {
  const map = useMap();
  const [loaded, setLoaded] = useState(false);
  const boundsRef = useRef<LatLngBounds | null>(null);

  useEffect(() => {
    const gpxLayer = new (L as any).GPX(gpxFile, {
      async: true,
      marker_options: {
        startIconUrl: "/marker-icon.png",
        endIconUrl: "/marker-icon.png",
        shadowUrl: "/marker-shadow.png",
      },
      polyline_options: {
        color: "#ff5e00",
        weight: isActive ? 5 : 3,
        opacity: isActive ? 1 : 0.6,
      },
    });

    gpxLayer.on("loaded", (e: any) => {
      const bounds = e.target.getBounds();
      map.fitBounds(bounds);

      const center = bounds.getCenter();

      const googleUrl = `https://www.google.com/maps/@${center.lat},${center.lng},14z`;
      const neshanUrl = `https://neshan.org/maps/@${center.lat},${center.lng},14z`;

      // ✅ این خیلی مهمه: گرفتن polyline
      const line = e.target.getLayers()[0];

      // ✅ فعال‌کردن کلیک روی کل مسیر
      line.options.interactive = true;
      line.on("click", () => {
        window.open(googleUrl, "_blank");
        setTimeout(() => window.open(neshanUrl, "_blank"), 300);
      });

      setLinks({
        google: googleUrl,
        neshan: neshanUrl,
      });

      setLoaded(true);
      boundsRef.current = bounds;
      if (isActive && map && boundsRef.current) {
        map.fitBounds(boundsRef.current);
      }
    });

    gpxLayer.on("error", (err: any) => {
      console.error("❌ GPX load error:", err);
    });

    gpxLayer.addTo(map);

    return () => {
      gpxLayer.remove();
    };
  }, [gpxFile, map, setLinks, isActive]);

  if (!loaded) return <p>در حال بارگذاری مسیر...</p>;
  return null;
};

interface GPXMapProps {
  gpxFile: string;
  isActive: boolean;
}

export default GPXLoader;
