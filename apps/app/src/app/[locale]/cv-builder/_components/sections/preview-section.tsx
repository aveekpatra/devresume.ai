import { Eye } from "lucide-react"

export function PreviewSection() {
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Preview</h2>
      <div className="text-center py-12 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-xl">
        <Eye className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Preview Available in Sidebar</h3>
        <p className="text-slate-600 mb-2">Preview is available in the sidebar on larger screens.</p>
        <p className="text-sm text-slate-500">Export to PDF to see the complete layout.</p>
      </div>
    </div>
  )
} 