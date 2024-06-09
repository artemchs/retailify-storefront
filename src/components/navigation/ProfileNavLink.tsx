import Link from "next/link";
import { Button } from "../ui/button";
import { User2 } from "lucide-react";

export default function ProfileNavLink() {
  return (
    <Button asChild size="icon" variant="ghost">
      <Link href="/auth">
        <User2 className="h-6 w-6 shrink-0" />
      </Link>
    </Button>
  );
}
