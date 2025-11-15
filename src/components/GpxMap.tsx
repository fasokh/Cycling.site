"use client";

import { useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-gpx";
import GPXLoader from "./GpxLoader";

interface GPXMapProps {
  gpxFile: string;
  isActive: boolean;
}

const GpxMap = ({ gpxFile, isActive }: GPXMapProps) => {
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
        <GPXLoader gpxFile={gpxFile} setLinks={setLinks} isActive={isActive} />
      </MapContainer>
    </div>
  );
};

export default GpxMap;
