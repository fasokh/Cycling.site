import React from "react";
import AddRouteForm from "./AddRouteForm";
import { useAuth } from "@/src/context/AuthContext";
import RouteList from "./RouteList";

const DashboardContent = () => {
  const { user } = useAuth();

  return (
    <main>
      <h1 className="mb-8 mt-8 mr-18">داشبورد من</h1>
      <h2 className="mb-8 mt-8 mr-18">سلام {user?.email}</h2>
      <section className="border border-gray-200 rounded mb-8 p-4">
        <AddRouteForm />
      </section>
      <section>
        <RouteList />
      </section>
    </main>
  );
};

export default DashboardContent;
