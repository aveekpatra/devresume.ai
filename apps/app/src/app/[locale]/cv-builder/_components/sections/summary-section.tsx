import { Label } from "@v1/ui/label"
import { Textarea } from "@v1/ui/textarea"
import { FileText } from "lucide-react"
import { CVSectionProps } from "../types"

export function SummarySection({ cvData, setCvData }: CVSectionProps) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl">
          <FileText className="w-5 h-5 text-emerald-600" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">Professional Summary</h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className="text-sm font-medium text-slate-700">
          Summary
        </Label>
        <Textarea
          id="summary"
          value={cvData.summary || ""}
          onChange={(e) => setCvData({ ...cvData, summary: e.target.value })}
          placeholder="Write a compelling summary that highlights your key achievements, skills, and career objectives..."
          className="min-h-[120px] bg-white/80 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 resize-none"
        />
        <p className="text-xs text-slate-500">
          Keep it concise (2-3 sentences) and focus on your unique value proposition.
        </p>
      </div>
    </div>
  )
} 