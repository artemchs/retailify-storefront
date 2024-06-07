import BrandIcon from "./BrandIcon";
import BrandName from "./BrandName";

export default function BrandLogotype() {
  return (
    <div className="flex items-center gap-2">
      <BrandIcon />
      <div className="hidden lg:flex">
        <BrandName />
      </div>
    </div>
  );
}
