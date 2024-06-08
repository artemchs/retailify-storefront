import BrandIcon from "./BrandIcon";
import BrandName from "./BrandName";

type Props = {
  iconSize?: "sm" | "md" | "lg";
};

export default function BrandLogotype({ iconSize }: Props) {
  return (
    <div className="flex items-center gap-2">
      <BrandIcon size={iconSize ?? "sm"} />
      <div className="hidden lg:flex">
        <BrandName />
      </div>
    </div>
  );
}
