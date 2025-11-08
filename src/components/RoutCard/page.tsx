import React, { FC } from "react";
import dynamic from "next/dynamic";

interface Rout {
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

const RoutCard: FC<RoutCardProps> = ({ rout }: { rout: Rout }) => {
  return (
    <li className="bg-white shadow-sm rounded-2xl p-5 justify-between items-start border border-gray-100 hover:shadow-md transition-all duration-200 flex gap-6">
      <div className="flex flex-col gap-2 w-1/2">
        <div className="text-lg font-semibold text-gray-900">{rout.name}</div>
        <div className="text-sm text-gray-600">{rout.date}</div>
        <div className="text-sm text-gray-700 leading-6">
          {rout.description}
        </div>
        <div className="text-sm text-gray-800 font-medium">
          {rout.distance} km
        </div>
      </div>
      <div className="flex-1 min-w-[200px] max-w-[380px] rounded-xl overflow-hidden">
        <GpxMap gpxFile={rout.gpxFile} />
      </div>
    </li>
  );
};

export default RoutCard;
