"use client";

import dynamic from "next/dynamic";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/src/firebase/firebaseConfig";
import React, { useEffect, useState } from "react";

interface Route {
  id: string;
  name: string;
  distace: number;
  date: string;
  description: string;
  gpxFile: string;
}

const GpxMap = dynamic(() => import("@/src/components/GpxMap"), { ssr: false });

const Routspage = () => {
  const [routs, setRouts] = useState<Route[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const querySnapshot = await getDocs(collection(db, "routes"));
      querySnapshot.forEach((doc) =>
        console.log("برای هر داکیومنت", doc.id, doc.data())
      );
      const data: Route[] = querySnapshot.docs.map(// هر داک در دیتابیس رو تبدیل به یک ابجگت جاوااسکریپتی کردیم و در نهایت تبدیل به ارایه ای از آبجکتها میشود 
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Route) //گفتیم که این آبجکت از چه نوعی باشه
      );
      setRouts(data);
    };
    fetchRoutes();// نمیتونه بصورت غیرهمزمان استفاده بشه پس برای اینکه یک فانکشن رو بخواهیم بصورت غیرهمزمان استفاده کنیم هم تعریف و بعد داخلش صدا میزنیمEffect 
  }, []);

  return (
    <div className="rtl flex flex-col gap-8">
      <h2>مسیرهای من</h2>
      <ul>
        {routs?.map((rout) => (
          <li key={rout.id}>
            {rout.name} {rout.date} {rout.description} {rout.distace} km
            <GpxMap gpxFile={rout.gpxFile} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Routspage;
