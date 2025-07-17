"use client";

import { Button } from "@v1/ui/button"
import { Plus, Code } from "lucide-react"
import { CVSectionProps } from "../types"

export function SkillsSection({ cvData, setCvData }: CVSectionProps) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl">
            <Code className="w-5 h-5 text-cyan-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900">Skills</h2>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Skills
        </Button>
      </div>
      
      <div className="text-center py-12 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-xl">
        <Code className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No skills added yet</h3>
        <p className="text-slate-600 mb-4">Add your technical and professional skills.</p>
      </div>
    </div>
  )
} 