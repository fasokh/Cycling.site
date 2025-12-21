"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const { signinWithEmail, loading, user } = useAuth();
  const rout = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      await signinWithEmail(email, password);
      rout.push("/dashboard"); // بعد از ورود موقق به داشبورد میره
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-20">
      <h2>ورود به سایت دوچرخه سواری</h2>
      <form onSubmit={loginHandler}>
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={emailHandler}
        />
        <input
          type="password"
          value={password}
          placeholder="رمز عبور"
          onChange={passwordHandler}
        />
        <button type="submit">ورود</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
