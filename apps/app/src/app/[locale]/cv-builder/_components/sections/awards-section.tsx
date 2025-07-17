import { Button } from "@v1/ui/button"
import { Plus, Award } from "lucide-react"
import { CVSectionProps } from "../types"

export function AwardsSection({ cvData, setCvData }: CVSectionProps) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-100 rounded-xl">
            <Award className="w-5 h-5 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Awards & Honors</h2>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Award
        </Button>
      </div>
      
      <div className="text-center py-12 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-xl">
        <Award className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No awards added yet</h3>
        <p className="text-slate-600 mb-4">Add awards, honors, and recognitions you've received.</p>
      </div>
    </div>
  )
} 