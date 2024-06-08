import Link from "next/link";
import BrandLogotype from "../branding/BrandLogotype";
import MobileSidebar from "./MobileSidebar";
import ShoppingBagNavLink from "./ShoppingBagNavLink";
import ProfileNavLink from "./ProfileNavLink";
import NavSearch from "./search/NavSearch";

export default function NavigationBar() {
  return (
    <nav className="bg-background/75 lg:px-2 backdrop-blur-md border-b-2 border-muted flex w-full items-center justify-between">
      <div className="p-4 flex items-center gap-4 lg:hidden">
        <div className="flex lg:hidden">
          <MobileSidebar />
        </div>
        <ProfileNavLink />
      </div>
      <Link href="/">
        <div className="p-4">
          <BrandLogotype />
        </div>
      </Link>
      <div className="p-4 flex items-center gap-4">
        <NavSearch />
        <div className="hidden lg:flex">
          <ProfileNavLink />
        </div>
        <ShoppingBagNavLink />
      </div>
    </nav>
  );
}
