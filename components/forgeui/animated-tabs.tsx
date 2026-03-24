"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type TabItem<T extends string> = T | { label: string; value: T };

type AnimatedTabsProps<T extends string> = {
  tabs: Array<TabItem<T>>;
  activeTab?: T;
  onTabChange?: (tab: T) => void;
  variant?: "default" | "underline";
  className?: string;
};

const getTabValue = <T extends string>(tab: TabItem<T>): T => {
  return typeof tab === "string" ? tab : tab.value;
};

const getTabLabel = <T extends string>(tab: TabItem<T>): string => {
  return typeof tab === "string" ? tab : tab.label;
};

const AnimatedTabs = <T extends string>({
  tabs,
  activeTab,
  onTabChange,
  variant = "default",
  className,
}: AnimatedTabsProps<T>) => {
  const [internalActiveTab, setInternalActiveTab] = useState<T>(() =>
    getTabValue(tabs[0]),
  );
  const currentActiveTab = activeTab ?? internalActiveTab;

  const handleTabChange = (tab: T) => {
    if (activeTab === undefined) {
      setInternalActiveTab(tab);
    }
    onTabChange?.(tab);
  };

  if (variant === "underline") {
    return (
      <div className={cn("relative flex items-center border-b border-border", className)}>
        {tabs.map((tab, index) => {
          const tabValue = getTabValue(tab);
          const tabLabel = getTabLabel(tab);
          const isActive = currentActiveTab === tabValue;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleTabChange(tabValue)}
              className={cn(
                "relative flex h-10 items-center px-4 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{tabLabel}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative mx-auto flex w-fit items-center rounded-full bg-background p-1",
        className,
      )}
    >
      {tabs.map((tab, index) => {
        const tabValue = getTabValue(tab);
        const tabLabel = getTabLabel(tab);
        const isActive = currentActiveTab === tabValue;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleTabChange(tabValue)}
            className={cn(
              "relative flex h-8 items-center rounded-full px-3 text-sm font-medium transition-colors duration-200",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-background"
                className="absolute inset-0 rounded-full bg-primary"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{tabLabel}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AnimatedTabs;
