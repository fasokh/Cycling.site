import React from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import MinimalDashboard from "./MinimalDashboard";

const HeaderDashboard = () => {
  const { user, signoutUser, loading } = useAuth();
  const route = useRouter();

  return (
    <header className="w-full h-28 flex items-center justify-end border-b border-gray-200 bg-white">
      {user ? (
        <div className="w-full flex justify-between items-center px-6 pt-4">
          <MinimalDashboard />
          <div className="flex flex-col justify-between items-end px-4 mt-6">
            <h2>{user?.displayName || user.email}</h2>
            <button
              type="button"
              onClick={async () => {
                await signoutUser();
                route.push("/login");
              }}
              className=""
            >
              خروج
            </button>
          </div>
        </div>
      ) : (
        <div className="flex">
          <button type="button" onClick={() => route.push("/login")}>
            ورود
          </button>
          <p> / </p>
          <button type="button" onClick={() => route.push("/register")}>
            ثبت نام
          </button>
        </div>
      )}
    </header>
  );
};

export default HeaderDashboard;
