import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";
import { ClassNameValue } from "tailwind-merge";
import { Loader } from "lucide-react";

type Props = {
  className?: ClassNameValue;
  Icon: any; // What type do I put here?
  text: string;
  isPending: boolean;
  marginTop?: boolean;
  variant?: "default" | "destructive";
  formId?: string;
};

export default function SubmitButton({
  Icon,
  className,
  isPending,
  text,
  variant = "default",
  marginTop = true,
  formId,
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
        "w-full lg:w-fit flex items-center justify-center gap-2",
        marginTop && "mt-4",
        className
      )}
      form={formId}
    >
      {icon}
      {text}
    </Button>
  );
}
