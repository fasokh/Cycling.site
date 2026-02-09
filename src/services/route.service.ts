import {
  collection,
  query,
  where,
  getDocs,
  doc,
  orderBy,
} from "firebase/firestore";
import { Route } from "../types/route";
import { db } from "../firebase/firebaseConfig";

export const getAllRoutes = async (): Promise<Route[]> => {
  const snapshot = await getDocs(collection(db, "routes"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Route, "id">),
  }));
};

export const getUserRoutes = async (userId: string): Promise<Route[]> => {
  const q = query(//q دستور میگیره 
    collection(db, "users", userId, "routes"),//دستور
    // orderBy("createdAt", "desc"),//شرط
  );
  const snapshot = await getDocs(q); // مسیر دسترسی به کالکشن روت های یک یوزر خاص

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Route, "id">), // تبدیل داده های دریافتی به نوع Route و اضافه کردن id از doc.id
  }));
};
