"use client";
import { type RouterOutputs } from "@/trpc/react";
export type Transaction = RouterOutputs["transaction"]["getAll"][0];
import { type ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import Dropdown from "./actionsMenuDropdown";
export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "amount",
    header: () => <div className="text-left">Amount</div>,
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
    header: () => <div className="text-left">Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = format(date, "PPP");
      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "category.name",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => {
      const categoryName = row.original.category.name;
      return <div className="text-left">{categoryName}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      return <Dropdown transactionId={transaction.id} />;
    },
  },
];
