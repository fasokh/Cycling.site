"use client";

import { getUserRoutes } from "@/src/services/route.service";
import { useEffect, useState } from "react";
import { Route } from "@/src/types/route";
import { useAuth } from "@/src/context/AuthContext";

const Routepst = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    setLoading(true); // دارم میرم دیتا بگیرم

    getUserRoutes(user.id)
      .then(setRoutes) //دیتا اومد
      .catch(() => setError("خطا در دریافت مسیرها"))
      .finally(() => setLoading(false)); //کار تموم شد
  }, [user]);

  if (loading) {
    return <p>در حال بارگذاری لیست ها</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  //خالی
  if (routes.length === 0) {
    return <p>هنوز مسیری اضافه نکرده اید</p>;
  }

  return (
    <div className="flex flex-col gap-4 mr-18 mt-6">
      {routes.map((r) => (
        <div
          key={r.id}
          className="border border-b-2 border-gray-200 rounded-lg shadow-md p-4"
        >
          <h3 className="font-bold text-lg">{r.title}</h3>
          {r.description && (
            <p className="test.gray-600 mt-1">{r.description}</p>
          )}
        </div>
      ))}
      <div className="flex gap-4 text-sm text-blue-600">
        <button>مشاهده</button>
        <button>نمایش روی نقشه</button>
        <button className="text-red-500">حذف</button>
      </div>
    </div>
  );
};

export default Routepst;
