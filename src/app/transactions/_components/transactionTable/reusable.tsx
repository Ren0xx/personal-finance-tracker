import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontalIcon } from "lucide-react";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Table } from "@tanstack/react-table";
import { deleteTransaction } from "@/server/actions/delete";
import { useToast } from "@/components/ui/use-toast";
type DropdownProps = {
  transactionId: string;
};
export function ActionsMenuDropdown(props: DropdownProps) {
  const { toast } = useToast();
  const handleClick = async () => {
    await deleteTransaction(props.transactionId);
    toast({
      variant: "destructive",
      title: "Transaction deleted",
      description: "Your transaction has been deleted.",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleClick}>
          Delete transaction
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
type DataTableViewOptionsProps<TData> = {
  table: Table<TData>;
};
export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <SlidersHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
