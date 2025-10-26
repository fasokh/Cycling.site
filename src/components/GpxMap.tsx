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
  const map = useMap(); //به شی اصلی leaflet دسترسی پیدا میکنیم
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const gpxLayer = new (L as any).GPX(gpxFile, {
      async: true, // میگیم که میتونه غیرهمزمان کار  کنه
      marker_options: {
        //شکل مسیر رو مشخص میکنیم
        startIconUrl: "/marker-icon.png",
        endIconUrl: "/marker-icon.png",
        shadowUrl: "/marker-shadow.png",
      },
    });

    gpxLayer.on("loaded", (e: any) => {
      //وقتیکهgpxLayer انجام شد روش یک event انجام بده
      const bounds = e.target.getBounds(); // این متد از leafLet میاد و یک آبجگت شامل مختصات دو گوشه مخالفه ، جنوب غربی و شمال شرقی
      console.log("✅ GPX loaded:", bounds.toBBoxString());
      map.fitBounds(bounds); // به leafLet میگه نمای داخل نقشه رو طوری تنظیم کن کل مسیر داخل صفحه دیده بشه
      setLoaded(true);
    });

    gpxLayer.on("error", (err: any) => {
      console.error("❌ GPX load error:", err);
    });

    gpxLayer.addTo(map); //gpxLayer رو داخل نقشه میندازه

    return () => {
      gpxLayer.remove(); // اگر کاربر خارج شد ویا gpx تغییر کرد مسیر قبلی از نقشه حذف بشه تا نقشه شلوغ نشه
    };
  }, [gpxFile, map]);

  if (!loaded) return <p>در حال بارگذاری مسیر...</p>;
  return null;
};

const GpxMap = ({ gpxFile }: GPXMapProps) => {
  return (
    <div style={{ marginBottom: "40px" }}>
      <MapContainer // مثل بوم نقاشی میمونه که نقشه رو میسازه و محیط نمایش رو آماده میکنه و بدون این هیچ چیزی جایی برای نمایش ندارند
        key={gpxFile}
        center={[32.0, 54.0]} // تقریبا وسط ایران رو نشون میده بعد با fitBounds نقشه خودش میره روی محدوده واقعی
        zoom={6}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer //فقط زمین و نقشه عمومی رو نشون میده
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GPXLoader gpxFile={gpxFile} />
      </MapContainer>
    </div>
  );
};

export default GpxMap;
