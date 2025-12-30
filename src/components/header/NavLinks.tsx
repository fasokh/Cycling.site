import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col md:flex-row gap-4">
      {pathname !== "/dashboard" && <Link href="/dashboard">داشبورد</Link>}
      {pathname !== "/routes" && <Link href="/routes">مسیرها</Link>}
    </nav>
  );
};

export default NavLinks;
