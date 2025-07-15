import * as React from "react"
import { cn } from "../utils"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right"
  width?: "sm" | "md" | "lg" | "xl"
  sticky?: boolean
  children: React.ReactNode
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  scrollable?: boolean
}

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const sidebarWidths = {
  sm: "w-64",
  md: "w-80", 
  lg: "w-96",
  xl: "w-[28rem]"
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, side = "right", width = "lg", sticky = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg",
          sidebarWidths[width],
          sticky && "sticky top-6",
          side === "left" && "order-first",
          side === "right" && "order-last",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-t-lg",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, scrollable = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-4",
          scrollable && "max-h-[calc(100vh-8rem)] overflow-y-auto",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SidebarFooter.displayName = "SidebarFooter"

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } 