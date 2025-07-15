import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function PATCH(request: Request, { params }: Params) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const taskId = parseInt(id, 10);
  const taskData = await request.json();

  const updatedTask = await prisma.task.updateMany({
    where: { id: taskId, userId },
    data: taskData,
  });

  if (updatedTask.count === 0) {
    return NextResponse.json(
      { error: "Task not found or user not authorized" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Task updated successfully" });
}

export async function DELETE(request: Request, { params }: Params) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const taskId = parseInt(id, 10);

  const deletedTask = await prisma.task.deleteMany({
    where: { id: taskId, userId },
  });

  if (deletedTask.count === 0) {
    return NextResponse.json(
      { error: "Task not found or user not authorized" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Task deleted successfully" });
}
