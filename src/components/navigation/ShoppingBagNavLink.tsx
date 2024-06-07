import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingBagIcon } from "lucide-react";

export default function ShoppingBagNavLink() {
  return (
    <Button asChild size="icon" variant="ghost">
      <Link href="/">
        <ShoppingBagIcon className="h-6 w-6 shrink-0" />
      </Link>
    </Button>
  );
}
