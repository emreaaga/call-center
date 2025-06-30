import settings from "@/icons/navbar/settings.svg";
import main from "@/icons/navbar/main.svg";
import file from "@/icons/navbar/file.svg";

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
          icon: main,
        },
        {
          href: "/incoming",
          label: "Входящие звонки",
          icon: file,
        },
        {
          href: "/collections",
          label: "Список коллекций",
          icon: file,
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

