"use client";

import { useSignOut } from "@/api/services/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignOutCard() {
  const router = useRouter();

  const { isPending, mutate } = useSignOut({
    onSuccess: () => {
      router.push("/");
      router.refresh();
      toast.warning("Ви вийшли зі свого акаунта.");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Вийти</CardTitle>
        <CardDescription>
          Ви вийдете з цього акаунта на всіх пристроях.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => mutate()}
          variant="destructive"
          disabled={isPending}
        >
          {isPending ? (
            <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <LogOutIcon className="h-4 w-4 mr-2" />
          )}
          Вийти з акаунта
        </Button>
      </CardFooter>
    </Card>
  );
}
