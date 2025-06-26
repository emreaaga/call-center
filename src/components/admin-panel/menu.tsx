"use client";

import Link from "next/link";
import LogOut from '@/icons/navbar/logout.svg'
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ divider, menus }, index) => {
            if (divider) {
              return (
                <li key={index} className="w-full my-3">
                  <hr className="border-t border-gray-700" />
                </li>
              );
            }

            return (
              <li className="w-full pt-5" key={index}>
                {menus?.map(({ href, label, icon: Icon, active }, idx) => (
                  <div className="w-full" key={idx}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start h-10 mb-1 text-left transition-colors",
                              (active === undefined && (pathname === href || pathname.startsWith(href + "/"))) || active
                                ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8] hover:text-white"
                                : "text-white hover:bg-[#1D4ED8] hover:text-white"
                            )}
                            asChild
                          >
                            <Link href={href}>
                              <span className={cn(isOpen === false ? "" : "mr-4")}>
                                <Icon className="text-white" size={18} />
                              </span>
                              <p
                                className={cn(
                                  "max-w-[200px] truncate",
                                  isOpen === false
                                    ? "-translate-x-96 opacity-0"
                                    : "translate-x-0 opacity-100"
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && (
                          <TooltipContent side="right">{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </li>
            );
          })}

          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => { }}
                    variant="ghost"
                    className="w-full justify-center h-10 mt-5 text-white hover:bg-[#1D4ED8] hover:text-white"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Выйти
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && <TooltipContent side="right">Выйти</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
