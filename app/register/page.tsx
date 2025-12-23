"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/router";

const register = () => {
  const { loading, user, signup } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHander = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value;
    if (confirmPassword !== password) {
      setError("رمزهای عبور مطابقت ندارند.");
    } else {
      setError("");
    }
  };

  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      await signup(email, password);
      route.push("/dashboard");
    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("این ایمیل قبلا ثبت شده است.");
          break;
        case "auth/invalid-email":
          setError("ایمیل وارد شده معتبر نیست.");
          break;
        case "auth/weak-password":
          setError("رمز عبور باید حداقل 6 کاراکتر باشد.");
          break;
        default:
          setError("خطا در ثبت نام. لطفا دوباره تلاش کنید.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  useEffect(() => {
    if (user) {
      route.push("/dashboard");
    }
  }, [user, route]);
  
  return (
    <div className="p-20 flex justify-center items-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4">ثبت نام</h1>
        <form
          onSubmit={registerHandler}
          className="flex flex-col gap-4 w-50 mt-4"
        >
          <input
            type="text"
            placeholder="ایمیل"
            onChange={emailHandler}
            className="outline-none border border-gray-500 rounded-l"
          />
          <input
            type="password"
            placeholder="رمز عبور"
            onChange={passwordHandler}
            className="outline-none border border-gray-500 rounded-l"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="تکرار رمز عبور"
            onChange={confirmPasswordHander}
            className="outline-none border border-gray-500 rounded-l"
          />
          <button
            type="button"
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

export default register;
