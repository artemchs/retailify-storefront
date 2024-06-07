import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/shop-config";
import { SearchIcon } from "lucide-react";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  isDesktop: boolean;
};

export default function NavSearchTrigger({ isDesktop, open, setOpen }: Props) {
  if (isDesktop) {
    return (
      <Button
        size="sm"
        variant="outline"
        role="searchbox"
        className="text-muted-foreground px-4"
        onClick={() => setOpen(!open)}
      >
        <SearchIcon className="h-4 w-4 mr-2 shrink-0" />
        <span className="typography-small">Пошук в {BRAND_NAME}...</span>
      </Button>
    );
  } else {
    return (
      <Button size="icon" variant="ghost" onClick={() => setOpen(!open)}>
        <SearchIcon className="h-6 w-6 shrink-0" />
      </Button>
    );
  }
}
