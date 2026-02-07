import { Timestamp } from "firebase/firestore";

export interface Route {
  id: string;
  userId: string;
  title: string;
  distance: number;
  description: string;
  createdAt?: Timestamp | Date | string;
  gpxFile: string;
}


