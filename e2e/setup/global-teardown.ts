import { db } from "@/server/db";

export default async function globalTeardown() {
  await db.transaction.deleteMany({
    where: {
      user: {
        email: "octocat@github.com",
      },
    },
  });
  await db.budget.deleteMany({
    where: {
      user: {
        email: "octocat@github.com",
      },
    },
  });
  await db.category.deleteMany({
    where: {
      user: {
        email: "octocat@github.com",
      },
    },
  });
}
