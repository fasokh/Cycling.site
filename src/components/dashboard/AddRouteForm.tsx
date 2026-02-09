"use client";

import { useAuth } from "@/src/context/AuthContext";
import { db } from "@/src/firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { storage } from "@/src/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddRouteForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [opened, setOpened] = useState(false);
  const [gpxFile, setGpxFile] = useState<File | null>(null);
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

    let gpxUrl: string | null = null;

    if (gpxFile) {
      const gpxRef = ref(
        // یک استوریح میسازه در فایربیس با مسیر مشخص
        storage, //  استوریج رو از firebaseConfig میگیره
        `users/${user.id}/routes/${crypto.randomUUID()}.gpx`, //مسیر ذخیره سازی
      );

      await uploadBytes(gpxRef, gpxFile); //آپلود فایل به اون مسیر ref(storage, path)
      gpxUrl = await getDownloadURL(gpxRef); // ذخیره کردن آدرس دانلود فایل آپلود شده که بعدا بخواهیم پارس کنیم و نمایش بدیم توسایت
    }

    await addDoc(collection(db, "users", user.id, "routes"), {
      title: title,
      description: description,
      createdAt: serverTimestamp(),
      gpxUrl,
    });

    setTitle("");
    setDescription("");

    console.log({ title, description });
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ذخیره برای آپلود
    setGpxFile(file);

    // فقط برای تست خواندن
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;

      const parse = new DOMParser();
      const xml = parse.parseFromString(text, "text/xml");

      const points = xml.getElementsByTagName("trkpt");

      console.log("POINT COUNT:", points.length);

      if (points.length > 0) {
        const first = points[0];
        console.log("FIRST POINTS:", {
          lat: first.getAttribute("lat"),
          lng: first.getAttribute("lon"),
        });
      }
    };

    reader.readAsText(file);
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
          <input
            type="file"
            accept=".gpx"
            onChange={inputHandler}
            className="outline-none border border-gray-400 rounded-lg p-2"
          />
          <button type="submit">افزودن مسیر</button>
        </form>
      )}
    </div>
  );
};

export default AddRouteForm;
