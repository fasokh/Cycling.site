"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-gpx";

interface GPXMapProps {
  gpxFile: string;
}

const GPXLoader = ({
  gpxFile,
  setLinks,
}: {
  gpxFile: string;
  setLinks: any;
}) => {
  const map = useMap();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const gpxLayer = new (L as any).GPX(gpxFile, {
      async: true,
      marker_options: {
        startIconUrl: "/marker-icon.png",
        endIconUrl: "/marker-icon.png",
        shadowUrl: "/marker-shadow.png",
      },
      polyline_options: {
        color: "red",
        weight: 4,
        opacity: 0.9,
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
    });

    gpxLayer.on("error", (err: any) => {
      console.error("❌ GPX load error:", err);
    });

    gpxLayer.addTo(map);

    return () => {
      gpxLayer.remove();
    };
  }, [gpxFile, map, setLinks]);

  if (!loaded) return <p>در حال بارگذاری مسیر...</p>;
  return null;
};

const GpxMap = ({ gpxFile }: GPXMapProps) => {
  const [links, setLinks] = useState({ google: "", neshan: "" });
  return (
    <div>
      <MapContainer // مثل بوم نقاشی میمونه که نقشه رو میسازه و محیط نمایش رو آماده میکنه و بدون این هیچ چیزی جایی برای نمایش ندارند
        key={gpxFile}
        center={[32.0, 54.0]} // تقریبا وسط ایران رو نشون میده بعد با fitBounds نقشه خودش میره روی محدوده واقعی
        zoom={6}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 0 8px rgba(0,0,0,0.15)",
        }}
        className="h-[200px] w-full"
      >
        <TileLayer //فقط زمین و نقشه عمومی رو نشون میده
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GPXLoader gpxFile={gpxFile} setLinks={setLinks} />
      </MapContainer>
    </div>
  );
};

export default GpxMap;
