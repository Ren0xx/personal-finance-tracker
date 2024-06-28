"use client";
import { type RouterOutputs } from "@/trpc/react";
export type Transaction = RouterOutputs["transaction"]["getAll"][0];
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { format } from "date-fns";
import { ActionsMenuDropdown } from "./reusable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "amount",
    sortingFn: "alphanumeric",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Description</div>,
    cell: ({ row }) => (
      <div className="text-left capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = format(date, "PPP");
      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "category.name",
    id: "category",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => {
      const categoryName = row.original.category.name;
      return (
        <div className="text-left">
          <Link href={`/categories/${row.original.category.id}`}>
            {categoryName}
          </Link>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      return <ActionsMenuDropdown transactionId={transaction.id} />;
    },
  },
];
