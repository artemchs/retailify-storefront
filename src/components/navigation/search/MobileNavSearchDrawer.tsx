import { Button } from "@/components/ui/button";
import {
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  Command,
  CommandSeparator,
} from "@/components/ui/command";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import NavSearchCommand from "./NavSearchCommand";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function MobileNavSearchDrawer({ open, setOpen }: Props) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <Command className="p-4">
          <NavSearchCommand />
        </Command>
      </DrawerContent>
    </Drawer>
  );
}
