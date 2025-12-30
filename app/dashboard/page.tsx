"use client";

import ProtectedRout from "@/src/components/ProtectedRoute";
import { useAuth } from "@/src/context/AuthContext";
import DashboardContent from "@/src/components/dashboard/DashboardContent";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <ProtectedRout>
      <DashboardContent />
    </ProtectedRout>
  );
};

export default Dashboard;
