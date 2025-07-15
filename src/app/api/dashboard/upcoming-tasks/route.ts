import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { endOfDay } from "date-fns";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const todayEnd = endOfDay(now);

  const tasks = await prisma.task.findMany({
    where: {
      userId,
      status: { not: "Done" },
      dueDate: {
        gt: todayEnd,
      },
    },
    orderBy: { dueDate: "asc" },
  });

  return NextResponse.json(tasks);
} 