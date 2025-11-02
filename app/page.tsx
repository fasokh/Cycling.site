"use client";

import dynamic from "next/dynamic";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/src/firebase/firebaseConfig";
import { useEffect, useState } from "react";

interface Route {
  id: string;
  name: string;
  distance: number;
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
      const data: Route[] = querySnapshot.docs.map(
        // هر داک در دیتابیس رو تبدیل به یک ابجگت جاوااسکریپتی کردیم و در نهایت تبدیل به ارایه ای از آبجکتها میشود
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Route) //گفتیم که این آبجکت از چه نوعی باشه
      );
      setRouts(data);
    };
    fetchRoutes(); // نمیتونه بصورت غیرهمزمان استفاده بشه پس برای اینکه یک فانکشن رو بخواهیم بصورت غیرهمزمان استفاده کنیم هم تعریف و بعد داخلش صدا میزنیمEffect
  }, []);

  return (
    <div className="rtl flex flex-col w-full p-5 gap-8">
      <h2 className="text-xl font-bold">مسیرهای من</h2>
      <ul className="flex flex-col gap-6">
        {routs?.map((rout) => (
          <li
            key={rout.id}
            className="bg-white shadow-md rounded-xl p-4 flex justify-between gap-4 items-start border border-gray-200"
          >
            <div className="flex flex-col gap-2 w-1/2">
              <div className="text-lg font-semibold text-gray-900">
                {rout.name}
              </div>
              <div className="text-sm text-gray-600">{rout.date}</div>
              <div className="text-sm text-gray-700 leading-6">
                {rout.description}
              </div>
              <div className="text-sm text-gray-800 fontm">
                {rout.distance} km
              </div>
            </div>
            <div className="flex-1 min-w-[300px] max-w-[400px] rounded-lg overflow-hidden shadow-sm border border-gray-300">
              <GpxMap gpxFile={rout.gpxFile} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Routspage;
