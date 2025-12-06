"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";

const Signuppage = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signupHandler = async () => {
    await signup(email, password);
  };

  return (
    <div>
      <input value={email} onChange={emailHandler} />
      <input type="password" value={password} onChange={passwordHandler} />
      <button type="button" onClick={signupHandler}>
        Sign Up
      </button>
    </div>
  );
};

export default Signuppage;
