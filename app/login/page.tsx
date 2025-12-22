"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const { signinWithEmail, loading, user, signinWithGoogle } = useAuth();
  const route = useRouter();

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
      route.push("/dashboard"); // بعد از ورود موقق به داشبورد میره
    } catch (err: any) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("کاربری با این ایمیل یافت نشد.");
          break;
        case "auth/wrong-password":
          setError("رمز عبور اشتباه است.");
          break;
        default:
          setError("خطا در ورود. لطفا دوباره تلاش کنید.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogleHandler = async () => {
    try {
      await signinWithGoogle();
      route.push("/dashboard");
    } catch (err: any) {
      setError("خطا در ورود با گوگل. لطفا دوباره تلاش کنید.");
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/dashboard");
    }
  }, [user, route]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-20 flex justify-center items-center">
      <div className="flex flex-col">
        <h2>ورود به سایت دوچرخه سواری</h2>
        <form onSubmit={loginHandler} className="flex flex-col gap-4 w-50 mt-4">
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={emailHandler}
            className="outline-none border border-gray-500 rounded-l"
          />
          <input
            type="password"
            value={password}
            placeholder="رمز عبور"
            onChange={passwordHandler}
            className="outline-none border border-gray-500 rounded-l"
          />
          <button
            type="submit"
            className="border border-gray-800 rounded-l outline-none"
          >
            ورود
          </button>
          <button
            type="button"
            className="border border-gray-800 rounded-l outline-none"
            onClick={loginWithGoogleHandler}
          >
            ورود با گوگل
          </button>
          <button
            type="button"
            onClick={() => route.push("/register")}
            className="border border-gray-800 rounded-l outline-none"
          >
            ثبت نام
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
