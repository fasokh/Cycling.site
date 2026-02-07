import { getUserRoutes } from "@/src/services/route.service";
import { useEffect, useState } from "react";
import { Route } from "@/src/types/route";
import { useAuth } from "@/src/context/AuthContext";

const RouteList = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    getUserRoutes(user.id).then((routes) => {
      setRoutes(routes);
    });
  }, [user]);

  return (
    <div className="mr-18">
      <h2 className="text-xl font-bold mb-4">لیست مسیرها</h2>
      {routes.map((r) => (
        <ul
          key={r.id}
          className="border border-b-2 border-gray-200 shadow-md mt-4 ml-18 p-8"
        >
          <li>{r.title}</li>
          <li>{r.description}</li>
        </ul>
      ))}
    </div>
  );
};

export default RouteList;
