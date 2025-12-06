"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRout = () => {
  const { loading, user } = useAuth();
  const route = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      route.push("/login");
    }
  }, [user, loading]);

  return <div>ProtectedRout</div>;
};

export default ProtectedRout;
