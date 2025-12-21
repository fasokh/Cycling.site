import React from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

const HeaderDashboard = () => {
  const { user, signoutUser, loading } = useAuth();
  const route = useRouter();

  return (
    <header>
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
