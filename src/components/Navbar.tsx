"use client"
import React, { ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const NavItem: React.FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div
    whileHover={{ y: -2, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.div>
);
const Navbar: React.FC = () => {
  return (
    
    <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/50 backdrop-blur-lg">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex justify-between items-center p-4 max-w-5xl mx-auto text-white"
      >
        <div className="flex items-center space-x-8">
          <Link href="/" passHref>
            <motion.div
              className="text-2xl font-bold text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              Tasky
            </motion.div>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <NavItem>
              <Link href="/dashboard">
                <span className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                  Dashboard
                </span>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/tasks">
                <span className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                  All Tasks
                </span>
              </Link>
            </NavItem>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <AnimatePresence>
            <SignedOut>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }} 
              >
                <div className="flex items-center space-x-4">
                  <NavItem>
                    <SignInButton>
                      <button className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
                        Sign In
                      </button>
                    </SignInButton>
                  </NavItem>
                  <NavItem>
                    <SignUpButton>
                      <button className="bg-[#6c47ff] hover:bg-[#583ac8] text-white rounded-full font-medium text-sm h-10 px-5 cursor-pointer transition-colors">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </NavItem>
                </div>
              </motion.div>
            </SignedOut>

            <SignedIn>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center space-x-4"
              >
                <NavItem>
                 
                  <button className="flex items-center bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-full font-medium text-sm h-10 px-4 cursor-pointer transition-colors">
                    <FiPlus className="mr-2" />
                    Add Task
                  </button>
                </NavItem>
                <div className="ml-2">
                    <UserButton afterSignOutUrl="/" />
                </div>
              </motion.div>
            </SignedIn>
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;