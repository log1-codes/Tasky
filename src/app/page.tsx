
'use client'; 

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, Filter, Users } from 'lucide-react';
import { SignUpButton } from '@clerk/nextjs';

const AppPreview = () => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    className="bg-zinc-900/50 border border-zinc-700 rounded-xl shadow-2xl shadow-violet-500/10"
  >
    <div className="p-4 border-b border-zinc-700 flex items-center space-x-2">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
    <div className="p-6">
      <motion.div
        className="flex items-center space-x-4 p-3 bg-zinc-800/50 rounded-lg mb-4"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <CheckCircle2 className="text-violet-400" />
        <p className="text-zinc-300">Design the new landing page</p>
      </motion.div>
      <motion.div
        className="flex items-center space-x-4 p-3 bg-zinc-800/50 rounded-lg mb-4"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <CheckCircle2 className="text-violet-400" />
        <p className="text-zinc-300">Write backend for Tasky </p>
      </motion.div>
      <motion.div
        className="flex items-center space-x-4 p-3 bg-zinc-800/50 rounded-lg mb-4"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <CheckCircle2 className="text-violet-400" />
        <p className="text-zinc-300">Prepare for Interview </p>
      </motion.div>
      <motion.div
        className="flex items-center space-x-4 p-3 bg-zinc-800/50 rounded-lg mb-4"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <CheckCircle2 className="text-violet-400" />
        <p className="text-zinc-300">Solve DSA Questions</p>
      </motion.div>
      <motion.div
        className="flex items-center space-x-4 p-3 bg-zinc-800/50 rounded-lg"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <CheckCircle2 className="text-zinc-500" />
        <p className="text-zinc-500 line-through">Deploy to production</p>
      </motion.div>
    </div>
  </motion.div>
);

const CollaborationVisual = () => (
    <Card className="bg-zinc-800/50 border-zinc-700 p-6 w-full h-full">
      <p className="font-semibold text-zinc-300 mb-4">Project: Website Redesign</p>
      <div className="space-y-4">
        <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex items-start space-x-3">
          <img src="https://i.pravatar.cc/40?u=a" alt="User" className="w-10 h-10 rounded-full border-2 border-violet-500" />
          <div className="bg-zinc-700 p-3 rounded-lg">
            <p className="text-zinc-300 text-sm">Can someone check the new mockups?</p>
          </div>
        </motion.div>
        <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="flex items-start space-x-3 flex-row-reverse">
          <img src="https://i.pravatar.cc/40?u=b" alt="User" className="w-10 h-10 rounded-full border-2 border-pink-500" />
          <div className="bg-violet-600 p-3 rounded-lg">
            <p className="text-white text-sm">Just pushed them to Figma. They look great! 🔥</p>
          </div>
        </motion.div>
      </div>
    </Card>
  );

const SmartViewVisual = () => {
    const variants = {
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.5 } },
        hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } }
    };
    return (
        <Card className="bg-zinc-800/50 border-zinc-700 p-6 w-full h-full">
            <div className="flex space-x-2 mb-4">
                <Button variant="ghost" className="bg-zinc-700 text-white">All</Button>
                <Button variant="ghost" className="text-zinc-400">Today</Button>
                <Button variant="ghost" className="text-zinc-400">Upcoming</Button>
            </div>
            <div className="space-y-3">
                <motion.div variants={variants} initial="visible" whileInView="hidden" viewport={{ once: true }} className="flex items-center justify-between p-2 bg-zinc-700/50 rounded-lg">
                    <p className="text-zinc-300">Plan company offsite</p>
                    <span className="text-xs text-zinc-500">Tomorrow</span>
                </motion.div>
                <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center justify-between p-2 bg-violet-600/20 border border-violet-600 rounded-lg">
                    <p className="text-violet-100 font-semibold">Finish quarterly report</p>
                    <span className="text-xs text-violet-300">Today</span>
                </motion.div>
                <motion.div variants={variants} initial="visible" whileInView="hidden" viewport={{ once: true }} className="flex items-center justify-between p-2 bg-zinc-700/50 rounded-lg">
                    <p className="text-zinc-300">Review new candidates</p>
                    <span className="text-xs text-zinc-500">Friday</span>
                </motion.div>
            </div>
        </Card>
    );
};

const AnalyticsVisual = () => (
    <Card className="bg-zinc-800/50 border-zinc-700 p-6 w-full h-full">
      <p className="font-semibold text-zinc-300 mb-4">Weekly Progress</p>
      <div className="flex justify-between items-end h-32 space-x-3">
        <div className="text-center w-full"><motion.div initial={{ height: 0 }} whileInView={{ height: '60%' }} transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }} className="bg-violet-500 rounded-t-lg w-full"></motion.div><p className="text-xs text-zinc-400 mt-1">Mon</p></div>
        <div className="text-center w-full"><motion.div initial={{ height: 0 }} whileInView={{ height: '80%' }} transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }} className="bg-violet-500 rounded-t-lg w-full"></motion.div><p className="text-xs text-zinc-400 mt-1">Tue</p></div>
        <div className="text-center w-full"><motion.div initial={{ height: 0 }} whileInView={{ height: '50%' }} transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }} className="bg-violet-500 rounded-t-lg w-full"></motion.div><p className="text-xs text-zinc-400 mt-1">Wed</p></div>
        <div className="text-center w-full"><motion.div initial={{ height: 0 }} whileInView={{ height: '90%' }} transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }} className="bg-pink-500 rounded-t-lg w-full"></motion.div><p className="text-xs text-zinc-400 mt-1">Thu</p></div>
        <div className="text-center w-full"><motion.div initial={{ height: 0 }} whileInView={{ height: '70%' }} transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }} className="bg-violet-500 rounded-t-lg w-full"></motion.div><p className="text-xs text-zinc-400 mt-1">Fri</p></div>
      </div>
    </Card>
  );


export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  } as const;

  const features = [
    {
      icon: <Users className="h-8 w-8 text-violet-400" />,
      title: 'Seamless Collaboration',
      description: 'Stop switching between apps. Discuss tasks, share files, and get feedback all in one place. Keep your team in sync and your projects on track.',
      visual: <CollaborationVisual />,
    },
  
    {
      icon: <Filter className="h-8 w-8 text-violet-400" />,
      title: 'Focus with Smart Views',
      description: 'Cut through the clutter with filters for due dates, priority, and projects. The "Today" view shows you exactly what you need to work on right now.',
      visual: <SmartViewVisual />,
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-violet-400" />,
      title: 'Visualize Your Progress',
      description: 'Don\'t just complete tasks—see your impact. Our analytics provide clear insights into your team\'s productivity and help you celebrate wins.',
      visual: <AnalyticsVisual />,
    },
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      <main className="overflow-hidden">
        
      
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="py-24 md:py-32 text-center container mx-auto px-4"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-50 to-zinc-400"
          >
            Organize Your Work. <br />
            Simplify Your Life.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl mx-auto text-lg text-zinc-400"
          >
            Tasky is the ultimate task management platform designed for modern
            teams and individuals. Get started for free and bring clarity to your work.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <SignUpButton>
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignUpButton>
          </motion.div>
        </motion.section>

        <section className="pb-24 md:pb-32 container mx-auto px-4">
          <AppPreview />
        </section>
        <section className="py-24 md:py-32 space-y-24 bg-black/20">
            {features.map((feature, i) => {
                const isReversed = i % 2 !== 0;

                return (
                <div key={feature.title} className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                 
                    <motion.div
                        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={isReversed ? 'md:order-last' : ''}
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-800 rounded-lg mb-6">
                        {feature.icon}
                        </div>
                        <h3 className="text-3xl font-bold tracking-tight">{feature.title}</h3>
                        <p className="mt-4 text-lg text-zinc-400">{feature.description}</p>
                    </motion.div>
                    
                
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-80"
                    >
                        {feature.visual}
                    </motion.div>
                    </div>
                </div>
                );
            })}
        </section>

      </main>
    </div>
  );
}