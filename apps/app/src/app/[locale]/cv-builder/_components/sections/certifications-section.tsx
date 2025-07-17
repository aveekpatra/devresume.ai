import { Button } from "@v1/ui/button"
import { Plus, Award } from "lucide-react"
import { CVSectionProps } from "../types"

export function CertificationsSection({ cvData, setCvData }: CVSectionProps) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl">
            <Award className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Certifications</h2>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>
      
      <div className="text-center py-12 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-xl">
        <Award className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No certifications added yet</h3>
        <p className="text-slate-600 mb-4">Add your professional certifications and licenses.</p>
      </div>
    </div>
  )
} 