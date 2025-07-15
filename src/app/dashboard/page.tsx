'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertTriangle, BarChart2, ListChecks, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

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
  const { user, isLoaded: userLoaded } = useUser();
  const [tasksDueToday, setTasksDueToday] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [upcomingTasks, setUpcomingTasks] = useState<any[]>([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [errorUpcoming, setErrorUpcoming] = useState<string | null>(null);

  const [weeklyProgress, setWeeklyProgress] = useState<number | null>(null);
  const [loadingWeekly, setLoadingWeekly] = useState(true);
  const [errorWeekly, setErrorWeekly] = useState<string | null>(null);

  // Overdue Tasks
  const [overdueTasks, setOverdueTasks] = useState<any[]>([]);
  const [loadingOverdue, setLoadingOverdue] = useState(true);
  const [errorOverdue, setErrorOverdue] = useState<string | null>(null);
  // Completion Rate
  const [completionRate, setCompletionRate] = useState<{completed: number, total: number, rate: number} | null>(null);
  const [loadingCompletion, setLoadingCompletion] = useState(true);
  const [errorCompletion, setErrorCompletion] = useState<string | null>(null);
  // Tasks by Priority
  const [priorityCounts, setPriorityCounts] = useState<{High: number, Medium: number, Low: number} | null>(null);
  const [loadingPriority, setLoadingPriority] = useState(true);
  const [errorPriority, setErrorPriority] = useState<string | null>(null);
  // Recent Tasks
  const [recentTasks, setRecentTasks] = useState<any[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [errorRecent, setErrorRecent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasksDueToday() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/dashboard/tasks-due-today");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasksDueToday(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchTasksDueToday();
  }, []);

  useEffect(() => {
    async function fetchUpcomingTasks() {
      setLoadingUpcoming(true);
      setErrorUpcoming(null);
      try {
        const res = await fetch("/api/dashboard/upcoming-tasks");
        if (!res.ok) throw new Error("Failed to fetch upcoming tasks");
        const data = await res.json();
        setUpcomingTasks(data);
      } catch (err: any) {
        setErrorUpcoming(err.message || "Unknown error");
      } finally {
        setLoadingUpcoming(false);
      }
    }
    fetchUpcomingTasks();
  }, []);

  useEffect(() => {
    async function fetchWeeklyProgress() {
      setLoadingWeekly(true);
      setErrorWeekly(null);
      try {
        const res = await fetch("/api/dashboard/weekly-progress");
        if (!res.ok) throw new Error("Failed to fetch weekly progress");
        const data = await res.json();
        setWeeklyProgress(data.count);
      } catch (err: any) {
        setErrorWeekly(err.message || "Unknown error");
      } finally {
        setLoadingWeekly(false);
      }
    }
    fetchWeeklyProgress();
  }, []);

  // Fetch Overdue Tasks
  useEffect(() => {
    async function fetchOverdue() {
      setLoadingOverdue(true); setErrorOverdue(null);
      try {
        const res = await fetch("/api/dashboard/overdue-tasks");
        if (!res.ok) throw new Error("Failed to fetch overdue tasks");
        setOverdueTasks(await res.json());
      } catch (err: any) { setErrorOverdue(err.message || "Unknown error"); }
      finally { setLoadingOverdue(false); }
    }
    fetchOverdue();
  }, []);
  // Fetch Completion Rate
  useEffect(() => {
    async function fetchCompletion() {
      setLoadingCompletion(true); setErrorCompletion(null);
      try {
        const res = await fetch("/api/dashboard/completion-rate");
        if (!res.ok) throw new Error("Failed to fetch completion rate");
        setCompletionRate(await res.json());
      } catch (err: any) { setErrorCompletion(err.message || "Unknown error"); }
      finally { setLoadingCompletion(false); }
    }
    fetchCompletion();
  }, []);
  // Fetch Tasks by Priority
  useEffect(() => {
    async function fetchPriority() {
      setLoadingPriority(true); setErrorPriority(null);
      try {
        const res = await fetch("/api/dashboard/tasks-by-priority");
        if (!res.ok) throw new Error("Failed to fetch priority counts");
        setPriorityCounts(await res.json());
      } catch (err: any) { setErrorPriority(err.message || "Unknown error"); }
      finally { setLoadingPriority(false); }
    }
    fetchPriority();
  }, []);
  // Fetch Recent Tasks
  useEffect(() => {
    async function fetchRecent() {
      setLoadingRecent(true); setErrorRecent(null);
      try {
        const res = await fetch("/api/dashboard/recent-tasks");
        if (!res.ok) throw new Error("Failed to fetch recent tasks");
        setRecentTasks(await res.json());
      } catch (err: any) { setErrorRecent(err.message || "Unknown error"); }
      finally { setLoadingRecent(false); }
    }
    fetchRecent();
  }, []);

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <Navbar />
      <motion.div
        className="container mx-auto px-4 pt-16 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold">
            {userLoaded
              ? `Welcome back, ${user?.firstName || user?.fullName || user?.username || "User"}!`
              : "Welcome back..."}
          </h1>
          <p className="text-zinc-400 mt-1">Here's your productivity snapshot for today.</p>
        </motion.div>
        
        <motion.div 
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 mt-12 [column-fill:_balance]"
          variants={containerVariants}
        >
          {/* Widget: Tasks Due Today */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.03 }} className="mb-12 break-inside-avoid rounded-2xl shadow-xl bg-gradient-to-br from-blue-800 via-blue-900 to-cyan-900 border border-blue-700 p-6 flex flex-col min-h-[300px]" style={{ minHeight: 300 + Math.random() * 60 }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-violet-400" />
                <span className="text-lg font-semibold">Tasks Due Today</span>
              </div>
            </div>
            <div className="flex-1">
              {loading ? (
                <div className="text-zinc-200 pt-2">Loading...</div>
              ) : error ? (
                <div className="text-red-300 pt-2">{error}</div>
              ) : tasksDueToday.length > 0 ? (
                  <ul className="space-y-2 pt-2">
                  {tasksDueToday.map(task => (
                    <li key={task.id} className="flex items-center gap-2 bg-blue-900/60 rounded px-3 py-2">
                      <CheckCircle2 className="w-4 h-4 text-violet-300 flex-shrink-0" />
                      <span className="truncate">{task.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                <p className="text-zinc-200 pt-2">No tasks due today. Enjoy!</p>
                )}
            </div>
          </motion.div>
          {/* Widget: Upcoming Tasks */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.03 }} className="mb-12 break-inside-avoid rounded-2xl shadow-xl bg-gradient-to-br from-cyan-800 via-blue-900 to-indigo-900 border border-cyan-700 p-6 flex flex-col min-h-[300px]" style={{ minHeight: 300 + Math.random() * 80 }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span className="text-lg font-semibold">Upcoming Tasks</span>
              </div>
            </div>
            <div className="flex-1">
              {loadingUpcoming ? (
                <div className="text-zinc-200 pt-2">Loading...</div>
              ) : errorUpcoming ? (
                <div className="text-red-300 pt-2">{errorUpcoming}</div>
              ) : upcomingTasks.length > 0 ? (
                <ul className="space-y-2 pt-2">
                  {upcomingTasks.map(task => (
                    <li key={task.id} className="flex justify-between items-center gap-2 bg-cyan-900/60 rounded px-3 py-2">
                      <span className="truncate">{task.title}</span>
                      <span className="text-xs text-zinc-200">{task.dueDate ? format(new Date(task.dueDate), "PPP") : "No due date"}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-200 pt-2">No upcoming tasks.</p>
              )}
            </div>
          </motion.div>
          {/* Widget: Stats */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.03 }} className="mb-12 break-inside-avoid rounded-2xl shadow-xl bg-gradient-to-br from-indigo-800 via-blue-900 to-blue-800 border border-indigo-700 p-6 flex flex-col min-h-[300px]" style={{ minHeight: 300 + Math.random() * 60 }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-300" />
                <span className="text-lg font-semibold">This Week's Progress</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              {loadingWeekly ? (
                <div className="text-zinc-200 pt-2">Loading...</div>
              ) : errorWeekly ? (
                <div className="text-red-300 pt-2">{errorWeekly}</div>
              ) : (
                <>
                  <div className="text-5xl font-bold pt-2 text-green-300">{weeklyProgress ?? 0}</div>
                  <p className="text-xs text-zinc-200 mt-2">Tasks completed this week</p>
                </>
              )}
            </div>
          </motion.div>
          {/* Widget: Overdue Tasks */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.03 }} className="mb-12 break-inside-avoid rounded-2xl shadow-xl bg-gradient-to-br from-red-900 via-zinc-950 to-zinc-900 border border-red-800 p-6 flex flex-col min-h-[300px]">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-lg font-semibold">Overdue Tasks</span>
            </div>
            <div className="flex-1">
              {loadingOverdue ? <div className="text-zinc-400 pt-2">Loading...</div>
                : errorOverdue ? <div className="text-red-400 pt-2">{errorOverdue}</div>
                : overdueTasks.length > 0 ? (
                  <ul className="space-y-2 pt-2">
                    {overdueTasks.map((task: any) => (
                      <li key={task.id} className="flex justify-between items-center gap-2 bg-zinc-800/60 rounded px-3 py-2">
                        <span className="truncate">{task.title}</span>
                        <span className="text-xs text-red-300">{task.dueDate ? format(new Date(task.dueDate), "PPP") : "No due date"}</span>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-zinc-400 pt-2">No overdue tasks!</p>}
            </div>
          </motion.div>
          {/* Widget: Task Completion Rate */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.03 }} className="mb-12 break-inside-avoid rounded-2xl shadow-xl bg-gradient-to-br from-blue-900 via-zinc-950 to-zinc-900 border border-blue-800 p-6 flex flex-col min-h-[300px]">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-semibold">Completion Rate</span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              {loadingCompletion ? <div className="text-zinc-400 pt-2">Loading...</div>
                : errorCompletion ? <div className="text-red-400 pt-2">{errorCompletion}</div>
                : completionRate ? (
                  <>
                    <div className="w-full bg-zinc-800 rounded-full h-4 mt-4">
                      <div className="bg-blue-500 h-4 rounded-full transition-all duration-500" style={{ width: `${completionRate.rate}%` }} />
                    </div>
                    <div className="text-3xl font-bold pt-4 text-blue-400">{completionRate.rate}%</div>
                    <p className="text-xs text-zinc-400 mt-2">{completionRate.completed} of {completionRate.total} tasks completed</p>
                  </>
                ) : <p className="text-zinc-400 pt-2">No tasks yet.</p>}
            </div>
          </motion.div>
          {/* Widget: Tasks by Priority */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.03 }} className="mb-12 break-inside-avoid rounded-2xl shadow-xl bg-gradient-to-br from-yellow-900 via-zinc-950 to-zinc-900 border border-yellow-800 p-6 flex flex-col min-h-[300px]">
            <div className="flex items-center gap-2 mb-2">
              <BarChart2 className="w-5 h-5 text-yellow-400" />
              <span className="text-lg font-semibold">Tasks by Priority</span>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              {loadingPriority ? <div className="text-zinc-400 pt-2">Loading...</div>
                : errorPriority ? <div className="text-red-400 pt-2">{errorPriority}</div>
                : priorityCounts ? (
                  <div className="flex flex-col gap-2 w-full mt-4">
                    <div className="flex justify-between"><span className="text-red-300">High</span><span>{priorityCounts.High}</span></div>
                    <div className="flex justify-between"><span className="text-yellow-300">Medium</span><span>{priorityCounts.Medium}</span></div>
                    <div className="flex justify-between"><span className="text-green-300">Low</span><span>{priorityCounts.Low}</span></div>
                  </div>
                ) : <p className="text-zinc-400 pt-2">No tasks yet.</p>}
            </div>
          </motion.div>
          {/* Widget: Recently Added Tasks */}
          <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.03 }} className="mb-12 break-inside-avoid rounded-2xl shadow-xl bg-gradient-to-br from-violet-900 via-zinc-950 to-zinc-900 border border-violet-800 p-6 flex flex-col min-h-[300px]">
            <div className="flex items-center gap-2 mb-2">
              <ListChecks className="w-5 h-5 text-violet-400" />
              <span className="text-lg font-semibold">Recently Added</span>
            </div>
            <div className="flex-1">
              {loadingRecent ? <div className="text-zinc-400 pt-2">Loading...</div>
                : errorRecent ? <div className="text-red-400 pt-2">{errorRecent}</div>
                : recentTasks.length > 0 ? (
                  <ul className="space-y-2 pt-2">
                    {recentTasks.map((task: any) => (
                      <li key={task.id} className="flex flex-col bg-zinc-800/60 rounded px-3 py-2">
                        <div className="flex justify-between items-center">
                          <span className="truncate font-medium">{task.title}</span>
                          <span className="text-xs text-zinc-400">{format(new Date(task.createdAt), "PPP")}</span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${task.status === "Done" ? "bg-green-900 text-green-300" : task.status === "InProgress" ? "bg-yellow-900 text-yellow-300" : "bg-zinc-700 text-zinc-300"}`}>{task.status}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${task.priority === "High" ? "bg-red-900 text-red-300" : task.priority === "Medium" ? "bg-yellow-900 text-yellow-300" : "bg-green-900 text-green-300"}`}>{task.priority}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-zinc-400 pt-2">No recent tasks.</p>}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}