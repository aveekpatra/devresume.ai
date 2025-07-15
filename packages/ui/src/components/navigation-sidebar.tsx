import * as React from "react"
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter 
} from "./sidebar"
import { Button } from "./button"
import { Badge } from "./badge"
import { Separator } from "./separator"
import { 
  Home, 
  FileText, 
  Settings, 
  User, 
  HelpCircle,
  ChevronRight
} from "lucide-react"

interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: string
  count?: number
  active?: boolean
}

interface NavigationSection {
  title: string
  items: NavigationItem[]
}

interface NavigationSidebarProps {
  sections: NavigationSection[]
  currentPath?: string
  onNavigate?: (href: string) => void
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

export function NavigationSidebar({ 
  sections, 
  currentPath, 
  onNavigate,
  user 
}: NavigationSidebarProps) {
  return (
    <Sidebar side="left" width="md" className="h-screen">
      {/* Header */}
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">DR</span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              DevResume.ai
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Resume Builder
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={section.title}>
            {sectionIndex > 0 && <Separator className="my-4" />}
            
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              
              {section.items.map((item) => {
                const isActive = item.active || currentPath === item.href
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate?.(item.href)}
                    className={`
                      w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors
                      ${isActive 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`
                        ${isActive 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-500 dark:text-gray-400'
                        }
                      `}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {item.count && (
                        <Badge className="text-xs bg-blue-600 hover:bg-blue-700">
                          {item.count}
                        </Badge>
                      )}
                      <ChevronRight className="h-3 w-3 text-gray-400" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </SidebarContent>

      {/* Footer with User Info */}
      {user && (
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.email}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}

// Example usage data structure
export const defaultNavigationSections: NavigationSection[] = [
  {
    title: "Main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home className="h-4 w-4" />,
        href: "/dashboard"
      },
      {
        id: "resumes",
        label: "My Resumes",
        icon: <FileText className="h-4 w-4" />,
        href: "/resumes",
        count: 3
      }
    ]
  },
  {
    title: "Account",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: <Settings className="h-4 w-4" />,
        href: "/settings"
      },
      {
        id: "help",
        label: "Help & Support",
        icon: <HelpCircle className="h-4 w-4" />,
        href: "/help",
        badge: "New"
      }
    ]
  }
] 