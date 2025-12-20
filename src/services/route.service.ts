import { collection, query, where, getDocs } from "firebase/firestore";
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
  const q = query(collection(db, "routes"), where("userId", "==", userId));

  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Route, "id">),
  }));
};
