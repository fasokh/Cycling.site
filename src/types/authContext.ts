import { User } from "./user";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  signinWithEmail: (email: string, password: string) => Promise<void>;
  signinWithGoogle: () => Promise<void>;
  signoutUser: () => Promise<void>;
}
