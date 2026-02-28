"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className=" h-8 w-8 rotate-0 scale-130 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className=" absolute h-8 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-130" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
