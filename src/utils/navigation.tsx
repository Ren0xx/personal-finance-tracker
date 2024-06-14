import {
  ArrowRightLeft,
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
    href: "/transaction",
    icon: <ArrowRightLeft />,
  },
  {
    name: "Budget",
    href: "/budget",
    icon: <HandCoins />,
  },
  { name: "Categories", href: "/categories", icon: <PieChart /> },
  {
    name: "Savings Goals",
    href: "/savings-goals",
    icon: <WalletMinimal />,
  },
];
