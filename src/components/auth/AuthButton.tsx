import { useAuth } from "@/src/context/AuthContext";
import Link from "next/link";

const AuthButon = () => {
  const { user, signoutUser } = useAuth();

  return (
    <nav>
      {user ? (
        <div>
          <img src={user.photoUrl} alt="User Photo" width={30} height={30} />
          <span>{user.displayName}</span>
          <button onClick={signoutUser}>Sign Out</button>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
};

export default AuthButon;
