"use client";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const AppHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full bg-white border-b border-gray-200 flex items-center justify-between h-16 px-8">
      <div className="flex items-center gap-4">
        <Logo />
        <div className="hidden md:block">
          <NavLinks />
        </div>
      </div>
      <div className="hidden md:block">
        <UserMenu />
      </div>
      <button
        type="button"
        className="md:hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      {open && (
        <div className="md:hidden max-w-30 border-t border-gray-200 w-full absolute top-16 left-0 bg-white flex flex-col items-center py-4 gap-4 z-10">
          <NavLinks />
          <UserMenu />
        </div>
      )}
    </header>
  );
};

export default AppHeader;
