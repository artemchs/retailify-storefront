import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ClassNameValue } from "tailwind-merge";
import { Loader } from "lucide-react";

type Props = {
  className?: ClassNameValue;
  Icon: any; // What type do I put here?
  text: string;
  isPending: boolean;
  marginTop?: boolean;
  variant?: "default" | "destructive";
};

export default function SubmitButton({
  Icon,
  className,
  isPending,
  text,
  variant = "default",
  marginTop = true,
}: Props) {
  const icon = isPending ? (
    <Loader className="h-4 w-4 shrink-0 animate-spin" />
  ) : (
    <Icon className="h-4 w-4 shrink-0" />
  );

  return (
    <Button
      aria-label="Надіслати форму"
      disabled={isPending}
      type="submit"
      variant={variant}
      className={cn(
        "w-full flex items-center justify-center gap-2",
        marginTop && "mt-4",
        className
      )}
    >
      {icon}
      {text}
    </Button>
  );
}
