import { User as FirebaseUser } from "firebase/auth";
import { User } from "../types/user";

export const mapUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  email: firebaseUser?.email ?? "",
  displayName: firebaseUser?.displayName ?? "",
  photoUrl: firebaseUser?.photoURL ?? "",
});
