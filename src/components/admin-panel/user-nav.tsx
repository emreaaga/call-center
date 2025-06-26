'use client';

import Link from 'next/link';
import { LayoutGrid, LogOut, User as UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { logout } from '@/hooks/auth';

export function UserNav() {
  return (
    <DropdownMenu>
      <div className="px-2 pt-2 pb-1">
        <p className="text-sm font-semibold">Karina Matsenko</p>
        <p className="text-xs text-right text-muted-foreground">Ваш профиль</p>
      </div>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative w-10 h-10 bg-[#ECECEC] p rounded-xl">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="text-lg bg-transparent text-[#2563EB]">KM</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-[#10B981] border-2 border-white" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Меню пользователя</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Karina Matsenko</p>
            <p className="text-xs leading-none text-muted-foreground">
              karina.matsenko@example.com
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center">
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Главная
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center">
              <UserIcon className="w-4 h-4 mr-3 text-muted-foreground" />
              Профиль
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout} className="cursor-pointer flex items-center">
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
