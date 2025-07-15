import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, title: true, createdAt: true, status: true, priority: true },
  });
  return NextResponse.json(tasks);
} 