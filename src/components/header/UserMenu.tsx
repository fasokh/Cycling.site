import { useAuth } from "@/src/context/AuthContext";

const UserMenu = () => {
  const { user, signoutUser } = useAuth();

  return (
    <div>
      <h2>سلام {user?.displayName}</h2>
      <div>نماش مسیرهای دوچرخه</div>
      <button type="button" onClick={signoutUser}>
        خروج
      </button>
    </div>
  );
};

export default UserMenu;
