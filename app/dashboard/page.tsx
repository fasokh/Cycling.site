"use client";

import ProtectedRout from "@/src/components/ProtectedRout";
import { useAuth } from "@/src/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <ProtectedRout>
      <div> سلام{user?.displayName}</div>
    </ProtectedRout>
  );
};

export default Dashboard;
