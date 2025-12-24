"use client";

import ProtectedRout from "@/src/components/ProtectedRoute";
import HeaderDashboard from "@/src/components/header/AppHeader";
import { useAuth } from "@/src/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="w-full flex">
      <ProtectedRout>
        <HeaderDashboard />
      </ProtectedRout>
    </div>
  );
};

export default Dashboard;
