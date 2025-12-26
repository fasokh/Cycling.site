import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

const AppHeader = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between h-16 px-8">
        <div className="flex items-center gap-4">
          <Logo />
          <NavLinks />
        </div>
        <UserMenu />
    </header>
  );
};

export default AppHeader;
