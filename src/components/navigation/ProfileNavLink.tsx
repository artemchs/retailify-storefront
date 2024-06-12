import Link from "next/link";
import { Button } from "../ui/button";
import { User2 } from "lucide-react";
import { cookies } from "next/headers";

export default async function ProfileNavLink() {
  const at = cookies().get("storefront-jwt-access-token");

  return (
    <Button asChild size="icon" variant="ghost">
      <Link href={at ? "/account" : "/auth"}>
        <User2 className="h-6 w-6 shrink-0" />
      </Link>
    </Button>
  );
}
