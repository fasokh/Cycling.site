"use client";

import { useEffect, useState } from "react";
import RoutCard from "./RouteCard";
import Header from "@/src/components/header/Header";
import { RouteCardModel } from "@/src/types/routeCardModel";
import { getAllRoutes } from "@/src/services/route.service";
import { mapRouteToCard } from "@/src/mappers/route.mapper";

const Routspage = () => {
  const [routes, setRoutes] = useState<RouteCardModel[]>([]);
  const [activeRoutId, setActiveRouteId] = useState<string | null>(null);

  useEffect(() => {
    getAllRoutes().then((route) => {
      const cardDate = route.map(mapRouteToCard);
      setRoutes(cardDate);
    });
  }, []);

  return (
    <div className="rtl flex flex-col w-full p-5 gap-8">
      <Header />
      <ul className="flex flex-col gap-6">
        {routes?.map((rout) => (
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
