import React, { FC, useState } from "react";
import dynamic from "next/dynamic";

interface Rout {
  id: string;
  name: string;
  description: string;
  distance: number;
  gpxFile: string;
  date: string;
}

interface RoutCardProps {
  rout: Rout;
}

const GpxMap = dynamic(() => import("@/src/components/GpxMap"), { ssr: false });

const RoutCard: FC<RoutCardProps> = ({ rout }) => {
  const [activeRouted, setActiveRouted] = useState<string | null>(null);
  const clickHandler = () => {
    setActiveRouted(rout.id);
  };
  return (
    <li className="relative bg-white shadow-sm rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-200 flex flex-col md:flex-row gap-6">
      <span className="absolute right-0 top-0 h-full w-0.5 bg-orange-500 rounded-r-2xl"></span>

      <div className="flex flex-col gap-2 md:w-1/2">
        <div className="text-lg font-semibold text-gray-950">{rout.name}</div>
        <div className="text-xs text-gray-500">{rout.date}</div>
        <div className="text-sm text-gray-700 leading-6">
          {rout.description}
        </div>
        <div className="text-sm font-medium text-gray-800">
          {rout.distance} km
        </div>
      </div>

      <div className="flex-1 min-w-[240px] max-w-[380px] rounded-xl overflow-hidden">
        <GpxMap gpxFile={rout.gpxFile} />
      </div>
    </li>
  );
};

export default RoutCard;
