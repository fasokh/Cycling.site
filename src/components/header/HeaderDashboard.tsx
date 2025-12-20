import React from "react";
import { useAuth } from "@/src/context/AuthContext";

const HeaderDashboard = () => {
  const { user, signoutUser, signup, signinWithEmail, loading } = useAuth();

  return (
    <div>
      <div>
        {user ? (
          <div>
            <h2>{user?.displayName}</h2>
            <button type="button" onClick={signoutUser}>
              خروج
            </button>
          </div>
        ) : (
          <div>
            <button type="button">
              ورود
            </button>
            <button type="button">
              ثبت نام
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderDashboard;
