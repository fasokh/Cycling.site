"use client";

import ProtectedRout from "@/src/components/ProtectedRout";

const DashboardPage = () => {
  return (
    <ProtectedRout>
      <div>Welcome to your Dashboard!</div>
    </ProtectedRout>
  );
};

export default DashboardPage;
