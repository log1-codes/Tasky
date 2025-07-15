'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { AddTaskDialog } from './AddTaskDialog';
import { Button } from './ui/button';
import { dark } from "@clerk/themes";

export default function Navbar({ onTaskAdded }: { onTaskAdded?: () => void }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/50 backdrop-blur-lg">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex justify-between items-center p-4 max-w-5xl mx-auto text-white"
      >
        <div className="flex items-center space-x-8">
          <Link href="/" passHref>
            <motion.div className="text-2xl font-bold" whileHover={{ scale: 1.05 }}>Tasky</motion.div>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/tasks" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">All Tasks</Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <AnimatePresence>
            <SignedOut>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                key="signed-out"
              >
                <div className="flex items-center space-x-4">
                  <SignInButton>
                    <button className="text-sm font-medium text-zinc-300 hover:text-white">Sign In</button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="bg-violet-600 hover:bg-violet-700">Sign Up</Button>
                  </SignUpButton>
                </div>
              </motion.div>
            </SignedOut>

            <SignedIn>
              <motion.div
                key="signed-in"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center space-x-4"
              >
                <AddTaskDialog onTaskAdded={onTaskAdded}>
                  <Button className="flex items-center bg-violet-600 hover:bg-violet-700 rounded-full font-medium text-sm h-10 px-4 cursor-pointer">
                    <FiPlus className="mr-2" />
                    Add Task
                  </Button>
                </AddTaskDialog>
                
                <div className="ml-2">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      baseTheme: dark,
                      elements: {
                        card: 'bg-zinc-900 border-zinc-800 text-white',
                        formButtonPrimary: 'bg-violet-600 hover:bg-violet-700',
                        headerTitle: 'text-white',
                        headerSubtitle: 'text-zinc-400',
                        socialButtonsBlockButton: 'bg-zinc-800 text-white',
                        dividerText: 'text-zinc-400',
                        footerActionText: 'text-zinc-400',
                        footerActionLink: 'text-violet-400 hover:text-violet-300',
                      },
                    }}
                  />
                </div>
              </motion.div>
            </SignedIn>
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}