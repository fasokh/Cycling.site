"use client";

import { useAuth } from "@/src/context/AuthContext";
import { db } from "@/src/firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

const AddRouteForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [opened, setOpened] = useState(false);
  const { user } = useAuth();

  const descriptionHander = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("لطفا نام مسیر را وارد کنید.");
      return;
    }
    if (!user) {
      alert("لطفا ابتدا وارد شوید.");
      return;
    }

    await addDoc(collection(db, "users", user.id, "routes"), {
      title: title,
      description: description,
      createdAt: serverTimestamp(),
      gpxUrl: null,
    });

    setTitle("");
    setDescription("");

    console.log({ title, description });
  };

  return (
    <div className="flex flex-col gap-6 mt-10 mr-14">
      <button
        onClick={() => {
          setOpened((prev) => !prev);
        }}
        className="text-bold text-lg mb-4 flex-start w-40"
      >
        افزودن مسیر جدید
      </button>
      {opened && (
        <form onSubmit={submitFormHandler} className="flex flex-col gap-4 w-50">
          <label htmlFor="title">نام مسیر</label>
          <input
            id="title"
            type="text"
            placeholder="نام مسیر"
            onChange={titleHandler}
            value={title}
            className="outline-none border border-gray-400 rounded-lg p-2"
          />
          <label htmlFor="description">توضیحات</label>
          <textarea
            id="description"
            placeholder="توضیحات"
            value={description}
            onChange={descriptionHander}
            className="outline-none border border-gray-400 rounded-lg p-3 h-26 resize-none"
          />
          <button type="submit">افزودن مسیر</button>
        </form>
      )}
    </div>
  );
};

export default AddRouteForm;
