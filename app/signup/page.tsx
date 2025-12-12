"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

const Signuppage = () => {
  const { signup } = useAuth();
  const route = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signupHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password);
      route.push("/dashboardPage"); //
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="p-20">
      <form onSubmit={signupHandler}>
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={emailHandler}
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={passwordHandler}
        />
        <button type="submit">ثبت نام</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signuppage;
