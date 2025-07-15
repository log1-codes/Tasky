// app/tasks/page.tsx
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

// Mock data and types
type Task = {
  id: string;
  title: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
};

const tasks: Task[] = [
    { id: "1", title: "Design the new landing page", status: "In Progress", priority: "High", dueDate: "2025-07-20" },
    { id: "2", title: "Develop the dashboard API", status: "To Do", priority: "High", dueDate: "2025-07-25" },
    { id: "3", title: "Fix the login bug", status: "Done", priority: "Medium", dueDate: "2025-07-12" },
    { id: "4", title: "Write documentation for components", status: "To Do", priority: "Low", dueDate: "2025-08-01" },
    { id: "5", title: "Review Q3 marketing plan", status: "To Do", priority: "Medium", dueDate: "2025-07-22" },
];

const statusStyles: Record<Task['status'], string> = {
    "To Do": "bg-blue-900/50 text-blue-300 border-blue-500/60 hover:bg-blue-900/80",
    "In Progress": "bg-yellow-900/50 text-yellow-300 border-yellow-500/60 hover:bg-yellow-900/80",
    "Done": "bg-green-900/50 text-green-300 border-green-500/60 hover:bg-green-900/80"
};

const priorityStyles: Record<Task['priority'], string> = {
    "Low": "text-zinc-300",
    "Medium": "text-yellow-300",
    "High": "text-red-400"
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function TasksPage() {
  return (
    <div className="bg-zinc-950 min-h-screen ">
      <motion.div 
        className="container mx-auto px-4  pt-24 pb-8 text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold">All Tasks</h1>
          <p className="text-zinc-400 mt-1">Here's a list of all your tasks. Stay organized!</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex items-center py-6">
          <Input placeholder="Filter tasks by name..." className="max-w-sm bg-zinc-900 border-zinc-700 focus:ring-violet-500" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-zinc-900 border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-700 hover:bg-zinc-800/50">
                  <TableHead className="w-[40%] text-white font-semibold">Task</TableHead>
                  <TableHead className="text-white font-semibold">Status</TableHead>
                  <TableHead className="text-white font-semibold">Priority</TableHead>
                  <TableHead className="text-white font-semibold">Due Date</TableHead>
                  <TableHead className="text-right text-white font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="border-zinc-800 hover:bg-zinc-800/50">
                    <TableCell className="font-medium text-zinc-200">{task.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("capitalize", statusStyles[task.status])}>
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell className={cn("capitalize font-semibold", priorityStyles[task.priority])}>{task.priority}</TableCell>
                    <TableCell className="text-zinc-400">{task.dueDate}</TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-700 text-white">
                                <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer">Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:!text-red-400 cursor-pointer">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}