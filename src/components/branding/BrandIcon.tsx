import { cn } from "@/lib/utils";

type Props = {
  size: "sm" | "md" | "lg";
};

export default function BrandIcon({ size }: Props) {
  // It's just a placeholder
  return (
    <div
      className={cn(
        "rounded-full bg-accent-foreground",
        size === "sm" ? "h-8 w-8" : size === "md" ? "h-16 w-16" : "h-20 w-20"
      )}
    ></div>
  );
}
