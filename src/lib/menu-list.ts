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
          label: "Главная",
          icon: main,
        },
        {
          href: "/create-request",
          label: "Создать заявку",
          icon: file,
        },
        {
          href: "/requests",
          label: "Список шаблонов",
          icon: file,
        },
        {
          href: "/settings",
          label: "Настройки",
          icon: settings,
        }
      ]
    },
  ];
}

