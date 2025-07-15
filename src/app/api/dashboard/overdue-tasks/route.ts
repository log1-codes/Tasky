import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tasks = await prisma.task.findMany({
    where: {
      userId,
      status: { not: "Done" },
      dueDate: { lt: today },
    },
    orderBy: { dueDate: "asc" },
    select: { id: true, title: true, dueDate: true },
  });
  return NextResponse.json(tasks);
} 