"use client";

import { Button } from "@v1/ui/button"
import { Plus, Briefcase } from "lucide-react"
import { CVSectionProps } from "../types"

export function ExperienceSection({ cvData, setCvData }: CVSectionProps) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 rounded-xl">
            <Briefcase className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Work Experience</h2>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>
      
      <div className="text-center py-12 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-xl">
        <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No experience added yet</h3>
        <p className="text-slate-600 mb-4">Add your work experience to showcase your professional journey.</p>
      </div>
    </div>
  )
} 