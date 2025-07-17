import { Button } from "@v1/ui/button"
import { Save, Download } from "lucide-react"

export function CVHeader() {
  return (
    <div className="flex justify-end gap-3 px-4 py-3 md:px-6">
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-white/70 backdrop-blur-sm border-slate-200/60 hover:bg-white/90 hover:border-slate-300 transition-all duration-200"
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
  )
} 