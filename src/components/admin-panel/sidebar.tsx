"use client";
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import BrandLogo from "@/icons/navbar/LogoIcon.svg";
import BrandLogoText from "@/icons/navbar/LogoText.svg";
import BrandLogoLine from "@/icons/navbar/LogoLine.svg";
import Link from "next/link";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[90px]" : "w-72",
        "bg-[#212121] dark:bg-[#1A1A1A]",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1 ",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center justify-center transition-all duration-300",
                !getOpenState() ? "w-8 h-8 mx-auto" : "w-auto h-auto"
              )}
            >
              <BrandLogo
                className="text-white"
                style={{
                  width: getOpenState() ? 77 : 40, 
                  height: getOpenState() ? 25 : 13,
                  display: "block",
                  margin: !getOpenState() ? "0 auto" : "unset", 
                }}
              />

            </div>
            {getOpenState() && (
              <>
                <BrandLogoLine className="text-white mx-1" />
                <BrandLogoText className="text-white" />
              </>
            )}
          </Link>


        </Button>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
