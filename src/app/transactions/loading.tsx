import { H1 } from "@/components/ui/typography";
import { DataTableSkeleton } from "@/components/skeletons/DataTableTransactionsSkeleton";
import { SkeletonTransactionsChart } from "@/components/skeletons/ChartsSkeletons";
import { Button } from "@/components/ui/button";
export default function Loading() {
  return (
    <div className="flex flex-col gap-4 text-center">
      <H1>Your Transactions</H1>
      <Button
        size="lg"
        className="max-w-48 self-center px-8 py-6"
        disabled={true}
      >
        Add New Transaction
      </Button>
      <DataTableSkeleton />
      <Button
        size="lg"
        className="max-w-48 self-center px-8 py-6"
        disabled={true}
      >
        Export Data to CSV
      </Button>
      <SkeletonTransactionsChart />
    </div>
  );
}
