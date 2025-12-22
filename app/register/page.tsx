"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";

const register = () => {
  const { loading, user, signup } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await signup("email", "password");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={registerHandler}>
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <input
          type="password"
          name="confirmPassword"
          id=""
          placeholder="confirm password"
        />
        <button type="button">ثبت نام</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default register;
