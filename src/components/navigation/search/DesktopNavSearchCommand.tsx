import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import NavSearchCommand from "./NavSearchCommand";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function DesktopNavSearchCommand({ open, setOpen }: Props) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <NavSearchCommand />
    </CommandDialog>
  );
}
