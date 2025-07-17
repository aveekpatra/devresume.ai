import { Button } from "@v1/ui/button"
import { Plus, Globe } from "lucide-react"
import { CVSectionProps } from "../types"

export function LanguagesSection({ cvData, setCvData }: CVSectionProps) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl">
            <Globe className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Languages</h2>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Language
        </Button>
      </div>
      
      <div className="text-center py-12 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-xl">
        <Globe className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No languages added yet</h3>
        <p className="text-slate-600 mb-4">Add languages you speak and your proficiency levels.</p>
      </div>
    </div>
  )
} 