import {
  ArrowRightLeft,
  CircleUserRound,
  HandCoins,
  LayoutDashboard,
  PieChart,
  WalletMinimal,
} from "lucide-react";

export const hrefs: {
  name: string;
  href: string;
  icon: JSX.Element;
}[] = [
  { name: "Dashboard", href: "/", icon: <LayoutDashboard /> },
  {
    name: "Transactions",
    href: "/transactions",
    icon: <ArrowRightLeft />,
  },
  {
    name: "Budgets",
    href: "/budgets",
    icon: <HandCoins />,
  },
  { name: "Categories", href: "/categories", icon: <PieChart /> },
  {
    name: "Savings Goals",
    href: "/savings-goals",
    icon: <WalletMinimal />,
  },
  {
    name: " Profile",
    href: "/profile",
    icon: <CircleUserRound />,
  },
];
