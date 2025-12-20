"use client";

import React, { useEffect, ReactNode } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

interface ProtectedRoutProps {
  children: ReactNode;
}

const ProtectedRout = ({ children }: ProtectedRoutProps) => {
  const { loading, user } = useAuth();
  const route = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      route.push("/login");
    }
  }, [user, loading, route]);

  if (loading) return <div>Loading...</div>;
  if(!user) return null

  return <>{children}</>;
};

export default ProtectedRout;
