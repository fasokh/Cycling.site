"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";

const Loginpage = () => {
  const { signinWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emialHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const loginHandler = async () => {
    await signinWithEmail(email, password);
  };

  return (
    <div>
      <input value={email} onChange={emialHandler} />
      <input type="password" value={password} onChange={passwordHandler} />
      <button type="button" onClick={loginHandler}></button>
    </div>
  );
};

export default Loginpage;
