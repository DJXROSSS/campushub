"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import { HiMenuAlt2, HiX } from "react-icons/hi"
import { useSession } from "next-auth/react"
import UserAccountNav from "../user/UserAccountNav"
import SignInButton from "../user/SignInButton"
import { Logo } from "../ui/logo"

const navigationItems = [{ id: 1, title: "Dashboard", href: "/dashboard" }]

const Navbar = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className={cn(
        "sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/70 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/70",
        isOpen && "border-b-0"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-[13.5px] font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
            >
              {item.title}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm font-medium">
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton text={"Sign Up"} />
          )}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center rounded-md p-2 text-neutral-600 transition-all duration-100 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <HiX size={22} className="text-black dark:text-white" />
              ) : (
                <HiMenuAlt2 size={22} className="text-black dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-y border-neutral-200 bg-white md:hidden dark:border-neutral-800 dark:bg-black"
          >
            <div className="flex flex-col p-4">
              <nav className="flex w-full flex-col gap-1">
                {navigationItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-md p-3 text-sm font-medium text-neutral-600 transition-all duration-100 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-50"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Navbar
