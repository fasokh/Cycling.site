'use client';

import React from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserMenu = () => {
  const { user, signoutUser, loading } = useAuth();
  const route = useRouter();

  if (loading) return null;

  if (!user) {
    return (
      <div className="flex gap-2">
        <Link href={"/login"}>ورود</Link>
        <span>/</span>
        <Link href={"/register"}>ثبت نام</Link>
      </div>
    );
  }

  return (
    <div>
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
  );
};

export default UserMenu;
