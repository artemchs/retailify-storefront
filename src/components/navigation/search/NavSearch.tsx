"use client";

import useMediaQuery from "@/hooks/use-media-query";
import { useState } from "react";
import NavSearchTrigger from "./NavSearchTrigger";
import MobileNavSearchDrawer from "./MobileNavSearchDrawer";
import DesktopNavSearchCommand from "./DesktopNavSearchCommand";

export default function NavSearch() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  return (
    <>
      <NavSearchTrigger isDesktop={isDesktop} open={open} setOpen={setOpen} />
      {isDesktop ? (
        <DesktopNavSearchCommand open={open} setOpen={setOpen} />
      ) : (
        <MobileNavSearchDrawer open={open} setOpen={setOpen} />
      )}
    </>
  );
}
