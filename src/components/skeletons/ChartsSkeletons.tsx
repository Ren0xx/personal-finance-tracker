import { Skeleton } from "@/components//ui/skeleton";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SkeletonBudgetsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budgets</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-96 w-full" />
      </CardContent>
    </Card>
  );
}

export function SkeletonTransactionsChart() {
  return (
    <div className="rounded-md border">
      <Skeleton className="h-80 w-full" />
    </div>
  );
}
export function SkeletonSavingsGoalsChart() {
  return (
    <div>
      <div className="flex items-center py-4">
        <Skeleton className="h-10 w-[300px]" />
      </div>
      <div className="rounded-md border">
        <Skeleton className="h-10 w-[300px]" />
      </div>
    </div>
  );
}
