"use client";

import { Button } from "@v1/ui/button"
import { Plus, GraduationCap } from "lucide-react"
import { CVSectionProps } from "../types"

export function EducationSection({ cvData, setCvData }: CVSectionProps) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl">
            <GraduationCap className="w-5 h-5 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Education</h2>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>
      
      <div className="text-center py-12 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-xl">
        <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No education added yet</h3>
        <p className="text-slate-600 mb-4">Add your educational background and qualifications.</p>
      </div>
    </div>
  )
} 