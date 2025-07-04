import settings from "@/icons/navbar/settings.svg";
import incoming from "@/icons/navbar/incoming-calls.svg"
import outcoming from "@/icons/navbar/outcoming-calls.svg"
import list from "@/icons/navbar/list.svg"

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: React.ComponentType<any>;
  submenus?: Submenu[];
};

type Group = {
  divider?: boolean;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      menus: [
        {
          href: "/",
          label: "Исходящие звонки",
          icon: outcoming,
        },
        {
          href: "/incoming",
          label: "Входящие звонки",
          icon: incoming,
        },
        {
          href: "/collections",
          label: "Список коллекций",
          icon: list,
        },
        {
          href: "/sip-settings",
          label: "SIP Настройки",
          icon: settings,
        }
      ]
    },
  ];
}

