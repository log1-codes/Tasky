'use client';

import { useCallback, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { format } from 'date-fns';
import Navbar from "@/components/Navbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

type Task = {
  id: number;
  title: string;
  description: string | null;
  status: "ToDo" | "InProgress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: string | null;
};

const statusStyles: Record<Task['status'], string> = {
  "ToDo": "bg-blue-900/50 text-blue-300 border-blue-500/60 hover:bg-blue-900/80",
  "InProgress": "bg-yellow-900/50 text-yellow-300 border-yellow-500/60 hover:bg-yellow-900/80",
  "Done": "bg-green-900/50 text-green-300 border-green-500/60 hover:bg-green-900/80"
};

const priorityStyles: Record<Task['priority'], string> = {
  "Low": "text-zinc-300",
  "Medium": "text-yellow-300",
  "High": "text-red-400"
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState<Date | undefined>();
  const [editPriority, setEditPriority] = useState<string | undefined>();
  const [editStatus, setEditStatus] = useState<string | undefined>();
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const filteredTasks = tasks.filter(task => {
    const matchesName = task.title.toLowerCase().includes(filterName.toLowerCase());
    const matchesStatus = filterStatus === "all" ? true : task.status === filterStatus;
    const matchesPriority = filterPriority === "all" ? true : task.priority === filterPriority;
    return matchesName && matchesStatus && matchesPriority;
  });

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (editingTask) {
      setEditTitle(editingTask.title);
      setEditDescription(editingTask.description || "");
      setEditDueDate(editingTask.dueDate ? new Date(editingTask.dueDate) : undefined);
      setEditPriority(editingTask.priority);
      setEditStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleDelete = async (taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    try {
      const response = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      if (!response.ok) {
        console.error('Failed to delete task');
        fetchTasks();
      }
    } catch (error) {
      console.error('An error occurred while deleting the task', error);
      fetchTasks();
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleSave = async (task: Task) => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        setTasks(prevTasks => prevTasks.map(t => (t.id === task.id ? task : t)));
        setEditingTask(null);
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('An error occurred while updating the task', error);
    }
  };
  
  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;
    await handleSave({
      ...editingTask,
      title: editTitle,
      description: editDescription,
      dueDate: editDueDate ? editDueDate.toISOString() : null,
      priority: editPriority as Task["priority"],
      status: editStatus as Task["status"],
    });
    fetchTasks();
  };
  
  return (
    <div className="bg-zinc-950 min-h-screen">
      <Navbar onTaskAdded={fetchTasks} />
      <motion.div 
        className="container mx-auto px-4 pt-24 pb-8 text-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold">All Tasks</h1>
          <p className="text-zinc-400 mt-1">Here's a list of all your tasks. Stay organized!</p>
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center gap-4 py-6">
          <Input
            placeholder="Filter tasks by name..."
            className="max-w-sm bg-zinc-900 border-zinc-700 focus:ring-violet-500"
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 bg-zinc-900 border-zinc-700">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="ToDo">To Do</SelectItem>
              <SelectItem value="InProgress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-40 bg-zinc-900 border-zinc-700">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
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
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-zinc-400">Loading...</TableCell>
                  </TableRow>
                ) : filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id} className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableCell className="font-medium text-zinc-200">{task.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("capitalize", statusStyles[task.status])}>
                          {task.status.replace(/([A-Z])/g, ' $1').trim()}
                        </Badge>
                      </TableCell>
                      <TableCell className={cn("capitalize font-semibold", priorityStyles[task.priority])}>{task.priority}</TableCell>
                      <TableCell className="text-zinc-400">
                        {task.dueDate ? format(new Date(task.dueDate), "PPP") : 'No due date'}
                      </TableCell>
                      <TableCell className="text-right">
                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700">
                                      <span className="sr-only">Open menu</span>
                                      <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-700 text-white">
                                  <DropdownMenuItem onClick={() => handleEdit(task)} className="hover:bg-zinc-800 cursor-pointer">Edit</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDelete(task.id)} className="text-red-400 hover:bg-red-500/10 hover:!text-red-400 cursor-pointer">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                          </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-zinc-400">
                            No tasks found. Create one to get started!
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </motion.div>
      </motion.div>
      {editingTask && (
  <Dialog open={!!editingTask} onOpenChange={open => { if (!open) setEditingTask(null); }}>
    <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
      <form onSubmit={handleEditSave}>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="edit-title"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            placeholder="Task Title"
            className="bg-zinc-800 border-zinc-700"
            required
          />
          <Textarea
            id="edit-description"
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            placeholder="Description (optional)"
            className="bg-zinc-800 border-zinc-700"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:text-white",
                  !editDueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {editDueDate ? format(editDueDate, "PPP") : <span>Due Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-700 text-white">
              <Calendar mode="single" selected={editDueDate} onSelect={setEditDueDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Select onValueChange={setEditPriority} value={editPriority ?? ""}>
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setEditStatus} value={editStatus ?? ""}>
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectItem value="ToDo">To Do</SelectItem>
              <SelectItem value="InProgress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={() => setEditingTask(null)}>Cancel</Button>
          </DialogClose>
          <Button type="submit" className="bg-violet-600 hover:bg-violet-700" disabled={false}>{false ? 'Saving...' : 'Save'}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
)}
    </div>
  );
}