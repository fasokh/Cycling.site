import { Timestamp } from "firebase/firestore";

export interface Route {
  id: string;
  userId: string;
  name: string;
  distance: number;
  description: string;
  createdAt?: Timestamp | Date | string;
  gpxUrl: string;
}


