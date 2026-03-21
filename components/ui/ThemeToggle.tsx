"use client";

import * as React from "react";
import { RxMoon, RxSun } from "react-icons/rx";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function Themetoggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={cn(
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-transparent text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900",
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <RxMoon className="hidden h-4.5 w-4.5 dark:block" />
      <RxSun className="block h-4.5 w-4.5 dark:hidden" />
    </button>
  );
}
