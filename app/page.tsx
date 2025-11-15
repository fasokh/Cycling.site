"use client";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/src/firebase/firebaseConfig";
import { useEffect, useState } from "react";
import RoutCard from "./RoutCard";
import Header from "@/src/components/Header";

interface Route {
  id: string;
  name: string;
  distance: number;
  date: string;
  description: string;
  gpxFile: string;
}

const Routspage = () => {
  const [routs, setRouts] = useState<Route[]>([]);
  const [activeRoutId, setActiveRouteId] = useState<string | null>(null);

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
      <Header />
      <ul className="flex flex-col gap-6">
        {routs?.map((rout) => (
          <RoutCard
            key={rout.id}
            rout={rout}
            isActive={activeRoutId === rout.id}
            onActive={() => setActiveRouteId(rout.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Routspage;
