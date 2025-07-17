"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@v1/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import { Button } from "@v1/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@v1/ui/dropdown-menu";
import { Logo } from "@v1/ui/logo";
import { 
  Home, 
  FileText, 
  Settings, 
  User, 
  LogOut, 
  Moon, 
  Sun,
  Monitor,
  Plus,
  Briefcase,
  Layout
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@v1/ui/utils";

export function GlobalSidebar() {
  const { signOut } = useAuthActions();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  
  // Fetch user data on client side
  const user = useQuery(api.users.getUser);

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      name: "Create New Resume",
      href: "/create-resume",
      icon: Plus,
    },
    {
      name: "Job Application Tracker",
      href: "/job-tracker",
      icon: Briefcase,
    },
    {
      name: "Template Library",
      href: "/templates",
      icon: Layout,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  const themeOptions = [
    { name: "Light", value: "light", icon: Sun },
    { name: "Dark", value: "dark", icon: Moon },
    { name: "System", value: "system", icon: Monitor },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 shadow-sm z-50 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-slate-200 dark:border-gray-700">
        <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          <Logo className="w-6 h-6" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700"
              )}
              title={item.name}
            >
              <Icon className="w-5 h-5" />
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-12 h-12 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700 transition-all duration-200 group relative"
              title="Theme"
            >
              {theme === "light" ? (
                <Sun className="w-5 h-5" />
              ) : theme === "dark" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Monitor className="w-5 h-5" />
              )}
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                Theme
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-32">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    "flex items-center gap-2 cursor-pointer",
                    theme === option.value && "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {option.name}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Account Dropdown */}
      {user && (
        <div className="p-2 border-t border-slate-200 dark:border-gray-700">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700 transition-all duration-200 group relative"
                title="Account"
              >
                <User className="w-5 h-5" />
                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  Account
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end" className="w-48">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name || user.email}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Guest state when no user */}
      {!user && (
        <div className="p-2 border-t border-slate-200 dark:border-gray-700">
          <Link
            href="/login"
            className="flex items-center justify-center w-12 h-12 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700 transition-all duration-200 group relative"
            title="Sign In"
          >
            <User className="w-5 h-5" />
            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Sign In
            </div>
          </Link>
        </div>
      )}
    </div>
  );
} 