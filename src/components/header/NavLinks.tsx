import Link from "next/link";

const NavLinks = () => {
  return (
    <nav className="flex gap-4">
      <Link href="/dashboard">داشبورد</Link>
      <Link href="/routes">مسیرها</Link>
    </nav>
  );
};

export default NavLinks;
