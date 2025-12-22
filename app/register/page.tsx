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
            className="outline-none border border-gray-500 rounded-l"
          />
          <input
            type="password"
            placeholder="رمز عبور"
            className="outline-none border border-gray-500 rounded-l"
          />
          <input
            type="password"
            name="confirmPassword"
            id=""
            placeholder="تکرار رمز عبور"
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
