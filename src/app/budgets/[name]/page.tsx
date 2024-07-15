import { H1 } from "@/components/ui/typography";
import { notFound } from "next/navigation";
import { api } from "@/trpc/server";
export default async function Budget({ params }: { params: { name: string } }) {
  const budget = await api.budget.getOne({ name: params.name });
  if (budget === null) {
    notFound();
  }
  return (
    <>
      <H1>{budget.name}</H1>
    </>
  );
}
