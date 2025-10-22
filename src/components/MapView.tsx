"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// تصاویر آیکون leaflet
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// TS ممکنه بگه نوعی نداره، پس با as unknown as string مشخص می‌کنیم
const defaultIcon = L.icon({
  iconUrl: iconUrl as unknown as string,
  shadowUrl: iconShadow as unknown as string,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapViewProps {
  lat: number;
  lng: number;
  zoom?: number;
}

export default function MapView({ lat, lng, zoom = 13 }: MapViewProps) {
  const center: L.LatLngExpression = [lat, lng];

  return (
    <div style={{ height: 420 }}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>نقطه شروع مسیر</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
