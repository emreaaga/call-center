'use client';
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

import BrandLogo from "@/icons/navbar/logo.svg";
import BrandLogoMini from "@/icons/navbar/logo_mini.svg";
import Link from "next/link";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;

  const open = getOpenState();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !open ? "w-[90px]" : "w-72",
        "bg-[#212121] dark:bg-[#1A1A1A]",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-2 py-2 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        <Button
          variant="link"
          asChild
          className={cn(
            "transition-transform ease-in-out duration-300 mb-4",
            !open ? "translate-x-1" : "translate-x-0"
          )}
        >
          <Link href="/" className="flex items-center justify-center">
            {open ? (
              <BrandLogo
                className="text-white"
                style={{ width: 120, height: 'auto' }}
              />
            ) : (
              <BrandLogoMini
                className="text-white"
                style={{ width: 40, height: 40 }}
              />
            )}
          </Link>
        </Button>

        <Menu isOpen={open} />
      </div>
    </aside>
  );
}
