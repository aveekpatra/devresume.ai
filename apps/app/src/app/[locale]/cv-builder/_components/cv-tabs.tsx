import { Button } from "@v1/ui/button"
import { Save, Download } from "lucide-react"
import { Tab } from "./types"

interface CVTabsProps {
  tabs: Tab[]
  activeTab: string
  setActiveTab: (tab: string) => void
  cvName?: string
}

export function CVTabs({ tabs, activeTab, setActiveTab, cvName }: CVTabsProps) {
  return (
    <div className="px-4 md:px-6 pt-4 pb-3">
      <div className="bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-xl p-2 shadow-md shadow-slate-200/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {cvName && (
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200/50">
                <h1 className="text-sm font-semibold text-blue-800 truncate max-w-48">
                  {cvName}
                </h1>
              </div>
            )}
            <div className="flex overflow-x-auto gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap min-w-0 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
            </div>
          </div>
          
          <div className="flex gap-2 ml-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 text-slate-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 