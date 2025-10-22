"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-gpx";

interface GPXMapProps {
  gpxFile: string;
}

const GpxMap = ({ gpxFile }: GPXMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const gpxLayer = new (L as any).GPX(gpxFile, {
      async: true,
      marker_options: {
        startIconUrl: "/marker-icon.png",
        endIconUrl: "/marker-icon.png",
        shadowUrl: "/marker-shadow.png",
      },
    });

    gpxLayer.on("loaded", (e: any) => {
      const bounds = e.target.getBounds();
      console.log("✅ GPX loaded:", bounds.toBBoxString());
      mapRef.current?.fitBounds(bounds);
      setLoaded(true);
    });

    gpxLayer.on("error", (err: any) => {
      console.error("❌ GPX load error:", err);
    });

    gpxLayer.addTo(mapRef.current);

    return () => {
      gpxLayer.remove();
    };
  }, [gpxFile]);

  return (
    <div style={{ marginBottom: "40px" }}>
      {!loaded && <p>در حال بارگذاری مسیر...</p>}
      <MapContainer
        key={gpxFile} // این باعث میشه هر فایل GPX یک MapContainer جدید بسازه
        center={[32.0, 54.0]}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default GpxMap;
