// src/firebase/firebaseConfig.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ پیکربندی اصلی پروژه‌ت
const firebaseConfig = {
  apiKey: "AIzaSyBl4P-fpTSlntYpVD2hIutYhABhiRs67gY",
  authDomain: "cycling-site-2f868.firebaseapp.com",
  projectId: "cycling-site-2f868",
  storageBucket: "cycling-site-2f868.firebasestorage.app",
  messagingSenderId: "858303447529",
  appId: "1:858303447529:web:d902a568027f590a6a4b78",
  measurementId: "G-LP5VED8N78",
};

// ✅ فقط یک بار initialize بشه
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Firestore export
export const db = getFirestore(app);



