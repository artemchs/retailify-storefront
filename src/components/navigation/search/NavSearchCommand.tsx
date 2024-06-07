import {
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export default function NavSearchCommand() {
  return (
    <>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Products">
          <CommandItem>Product 1</CommandItem>
          <CommandItem>Product 2</CommandItem>
          <CommandItem>Product 3</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Categories">
          <CommandItem>Category 1</CommandItem>
          <CommandItem>Category 2</CommandItem>
          <CommandItem>Category 3</CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}
