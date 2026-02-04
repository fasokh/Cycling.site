import { User as FirebaseUser } from "firebase/auth";
import { User } from "../types/user";

export const mapUser = (user: FirebaseUser): User => ({
  id: user.uid,
  email: user?.email ?? "",
  displayName: user?.displayName ?? "",
  photoUrl: user?.photoURL ?? "",
});
