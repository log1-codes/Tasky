import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Priority } from "@/generated/prisma";
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const priorities: Priority[] = [Priority.Low, Priority.Medium, Priority.High];
  const counts = await Promise.all(
    priorities.map(priority =>
      prisma.task.count({ where: { userId, priority } })
    )
  );
  return NextResponse.json({
    High: counts[0],
    Medium: counts[1],
    Low: counts[2],
  });
} 