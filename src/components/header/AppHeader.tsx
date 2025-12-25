import Logo from "./Logo";
import UserMenu from "./UserMenu";

const AppHeader = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between">
      <Logo />
      <UserMenu />
    </header>
  );
};

export default AppHeader;
