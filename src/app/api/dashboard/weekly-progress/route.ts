import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { startOfWeek, endOfWeek } from "date-fns";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 }); // Sunday

  const count = await prisma.task.count({
    where: {
      userId,
      status: "Done",
      createdAt: {
        gte: weekStart,
        lte: weekEnd,
      },
    },
  });

  return NextResponse.json({ count });
} 