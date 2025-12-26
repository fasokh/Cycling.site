"use client";

import ProtectedRout from "@/src/components/ProtectedRoute";
import MenuUserSection from "@/src/components/header/UserMenu";
import { useAuth } from "@/src/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <ProtectedRout>
      <div className="w-full flex flex-col gap-4 p-8">
        <p>سلام{user?.displayName}</p>
        <p>به پنل کاربری خوش آمدید</p>
        <div>
          <ul>
            <li>مسیرهای دوچرخه سواری</li>
            <li>مسیر جدید</li>
            <li>آمار رکاب زدن</li>
          </ul>
        </div>
      </div>
    </ProtectedRout>
  );
};

export default Dashboard;
