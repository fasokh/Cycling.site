"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-gpx";

interface GPXMapProps {
  gpxFile: string;
}

const GPXLoader = ({ gpxFile }: { gpxFile: string }) => {
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
    });

    gpxLayer.on("loaded", (e: any) => {
      const bounds = e.target.getBounds();
      console.log("✅ GPX loaded:", bounds.toBBoxString());
      map.fitBounds(bounds);
      setLoaded(true);
    });

    gpxLayer.on("error", (err: any) => {
      console.error("❌ GPX load error:", err);
    });

    gpxLayer.addTo(map);

    return () => {
      gpxLayer.remove();
    };
  }, [gpxFile, map]);

  if (!loaded) return <p>در حال بارگذاری مسیر...</p>;
  return null;
};

const GpxMap = ({ gpxFile }: GPXMapProps) => {
  return (
    <div style={{ marginBottom: "40px" }}>
      <MapContainer
        key={gpxFile}
        center={[32.0, 54.0]}
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GPXLoader gpxFile={gpxFile} />
      </MapContainer>
    </div>
  );
};

export default GpxMap;
