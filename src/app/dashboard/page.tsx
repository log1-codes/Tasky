// app/dashboard/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

// Mock data - replace with your actual data fetching
const dashboardData = {
  welcomeMessage: "Welcome back, Alex!",
  tasksDueToday: [
    { id: 1, title: "Finish quarterly report" },
    { id: 2, title: "Call the design agency" },
  ],
  upcomingTasks: [
    { id: 3, title: "Plan company offsite", dueDate: "Tomorrow" },
    { id: 4, title: "Review new candidates", dueDate: "Friday" },
  ],
  stats: {
    completedThisWeek: 12,
  },
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
} as const;

export default function DashboardPage() {
  return (
    <div className="bg-zinc-950 min-h-screen text-white" >
      <motion.div
        className="container mx-auto px-4  pt-24 pb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold">{dashboardData.welcomeMessage}</h1>
          <p className="text-zinc-400 mt-1">Here's your productivity snapshot for today.</p>
        </motion.div>
        
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8"
          variants={containerVariants} // We can reuse containerVariants for staggering cards
        >
          {/* Widget: Tasks Due Today */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.03 }}>
            <Card className="bg-zinc-900 border-zinc-800 text-white h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tasks Due Today</CardTitle>
                <Clock className="w-4 h-4 text-zinc-400" />
              </CardHeader>
              <CardContent>
                {dashboardData.tasksDueToday.length > 0 ? (
                  <ul className="space-y-2 pt-2">
                    {dashboardData.tasksDueToday.map(task => (
                      <li key={task.id} className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-violet-400 flex-shrink-0" />
                        <span>{task.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-zinc-400 pt-2">No tasks due today. Enjoy!</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Widget: Upcoming Tasks */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.03 }}>
            <Card className="bg-zinc-900 border-zinc-800 text-white h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                <Clock className="w-4 h-4 text-zinc-400" />
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 pt-2">
                  {dashboardData.upcomingTasks.map(task => (
                    <li key={task.id} className="flex justify-between items-center">
                      <span>{task.title}</span>
                      <span className="text-xs text-zinc-400">{task.dueDate}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Widget: Stats */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.03 }}>
            <Card className="bg-zinc-900 border-zinc-800 text-white h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">This Week's Progress</CardTitle>
                <CheckCircle2 className="w-4 h-4 text-zinc-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold pt-2">{dashboardData.stats.completedThisWeek}</div>
                <p className="text-xs text-zinc-400">Tasks completed</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}