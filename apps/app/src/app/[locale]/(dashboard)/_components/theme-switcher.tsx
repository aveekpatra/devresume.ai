import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@v1/ui/select";
import { cn } from "@v1/ui/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher({ triggerClass }: { triggerClass?: string }) {
  const { theme: currentTheme, setTheme, themes } = useTheme();
  return (
    <Select
      value={currentTheme}
      onValueChange={(theme) => setTheme(theme as (typeof themes)[number])}
    >
      <SelectTrigger
        className={cn(
          "h-6 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 !px-2 hover:border-gray-400 dark:hover:border-gray-500",
          triggerClass,
        )}
      >
        <div className="flex items-start gap-2">
          {currentTheme === "light" ? (
            <Sun className="h-[14px] w-[14px]" />
          ) : currentTheme === "dark" ? (
            <Moon className="h-[14px] w-[14px]" />
          ) : (
            <Monitor className="h-[14px] w-[14px]" />
          )}
          {currentTheme && (
            <span className="text-xs font-medium">
              {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
            </span>
          )}
        </div>
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem
            key={theme}
            value={theme}
            className={`text-sm font-medium text-gray-600 dark:text-gray-400 ${theme === currentTheme && "text-blue-600 dark:text-blue-400"}`}
          >
            {theme && theme.charAt(0).toUpperCase() + theme.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function ThemeSwitcherHome() {
  const { setTheme, themes } = useTheme();
  return (
    <div className="flex gap-3">
      {themes.map((theme) => (
        <button
          key={theme}
          name="theme"
          onClick={() => setTheme(theme)}
          type="button"
        >
          {theme === "light" ? (
            <Sun className="h-4 w-4 text-blue-600 hover:text-blue-700" />
          ) : theme === "dark" ? (
            <Moon className="h-4 w-4 text-blue-600 hover:text-blue-700" />
          ) : (
            <Monitor className="h-4 w-4 text-blue-600 hover:text-blue-700" />
          )}
        </button>
      ))}
    </div>
  );
}
