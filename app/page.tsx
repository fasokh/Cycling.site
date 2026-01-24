"use client";

import { useEffect, useState } from "react";
import RoutCard from "./RouteCard";
import { RouteCardModel } from "@/src/types/routeCardModel";
import { getAllRoutes } from "@/src/services/route.service";
import { mapRouteToCard } from "@/src/mappers/route.mapper";

const RoutsPage = () => {
  const [routes, setRoutes] = useState<RouteCardModel[]>([]);
  const [activeRoutId, setActiveRouteId] = useState<string | null>(null);

  useEffect(() => {
    getAllRoutes().then((route) => {
      const cardData = route.map(mapRouteToCard);
      setRoutes(cardData);
    });
  }, []);

  return (
    <div className="rtl flex flex-col w-full p-5 gap-8">
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

export default RoutsPage;
