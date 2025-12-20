import React from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

const HeaderDashboard = () => {
  const { user, signoutUser, loading } = useAuth();
  const route = useRouter();

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {user ? (
        <div>
          <h2>سلام {user?.displayName || user.email}</h2>
          <button
            type="button"
            onClick={async () => {
              await signoutUser();
              route.push("/login");
            }}
          >
            خروج
          </button>
        </div>
      ) : (
        <div>
          <button type="button" onClick={() => route.push("/login")}>
            ورود
          </button>
          <button type="button" onClick={() => route.push("/register")}>
            ثبت نام
          </button>
        </div>
      )}
    </header>
  );
};

export default HeaderDashboard;
