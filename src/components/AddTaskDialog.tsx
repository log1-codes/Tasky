'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs"; 

export function AddTaskDialog({ children, onTaskAdded }: { children: React.ReactNode, onTaskAdded?: () => void }) {
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [priority, setPriority] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!userId) {
      console.error("User is not authenticated.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          priority,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      setOpen(false);
      if (onTaskAdded) onTaskAdded();

    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a New Task</DialogTitle>
            <DialogDescription>
              Fill in the details below. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              className="bg-zinc-800 border-zinc-700"
              required
            />
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="bg-zinc-800 border-zinc-700"
            />
            <div className="grid grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:text-white",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Due Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-700 text-white">
                  <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Select onValueChange={setPriority} value={priority ?? ""}>
                <SelectTrigger className="w-full bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select onValueChange={setStatus} value={status ?? ""}>
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
                <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-violet-600 hover:bg-violet-700" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create Task'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}