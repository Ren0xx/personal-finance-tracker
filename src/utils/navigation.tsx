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
  id?: string,
}[] = [
  { name: "Dashboard", href: "/", icon: <LayoutDashboard /> },
  {
    name: "Transactions",
    href: "/transactions",
    icon: <ArrowRightLeft />,
    id: "step1",
  },
  {
    name: "Budgets",
    href: "/budgets",
    icon: <HandCoins />,
    id: "step2",
  },
  { name: "Categories", href: "/categories", icon: <PieChart />, id: "step3" },
  {
    name: "Savings Goals",
    href: "/savings-goals",
    icon: <WalletMinimal />,
    id: "step4",
  },
  {
    name: " Profile",
    href: "/profile",
    icon: <CircleUserRound />,
    id: "step5",
  },
];
