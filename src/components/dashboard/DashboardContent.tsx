import React from "react";
import AddRouteForm from "./AddRouteForm";

const DashboardContent = () => {
  return (
    <main>
      <h1 className="mb-8 mt-8 mr-18">داشبورد من</h1>
      <section className="border border-gray-200 rounded mb-8 p-4">
        <AddRouteForm />
      </section>
      <section>placeholder for RouteList</section>
    </main>
  );
};

export default DashboardContent;
