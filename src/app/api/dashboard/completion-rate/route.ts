import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const total = await prisma.task.count({ where: { userId } });
  const completed = await prisma.task.count({ where: { userId, status: "Done" } });
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);
  return NextResponse.json({ completed, total, rate });
} 