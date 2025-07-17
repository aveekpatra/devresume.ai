import { Switch } from "@v1/ui/switch"
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Star, 
  Award, 
  Globe, 
  Heart, 
  Settings 
} from "lucide-react"
import { SectionConfig } from "../types"

interface CustomizeSectionProps {
  sectionConfig: SectionConfig
  setSectionConfig: (config: SectionConfig) => void
}

export function CustomizeSection({ sectionConfig, setSectionConfig }: CustomizeSectionProps) {
  const sections = [
    { key: "personalInfo" as keyof SectionConfig, label: "Personal Information", icon: User, description: "Basic contact and personal details" },
    { key: "summary" as keyof SectionConfig, label: "Professional Summary", icon: FileText, description: "Brief overview of your professional background" },
    { key: "experience" as keyof SectionConfig, label: "Work Experience", icon: Briefcase, description: "Professional work history and achievements" },
    { key: "education" as keyof SectionConfig, label: "Education", icon: GraduationCap, description: "Academic background and qualifications" },
    { key: "skills" as keyof SectionConfig, label: "Skills", icon: Code, description: "Technical and professional skills" },
    { key: "projects" as keyof SectionConfig, label: "Projects", icon: Star, description: "Personal and professional projects" },
    { key: "certifications" as keyof SectionConfig, label: "Certifications", icon: Award, description: "Professional certifications and licenses" },
    { key: "languages" as keyof SectionConfig, label: "Languages", icon: Globe, description: "Language proficiencies" },
    { key: "awards" as keyof SectionConfig, label: "Awards & Honors", icon: Award, description: "Recognition and achievements" },
    { key: "volunteer" as keyof SectionConfig, label: "Volunteer Experience", icon: Heart, description: "Community involvement and volunteer work" }
  ]

  const toggleSection = (key: keyof SectionConfig) => {
    setSectionConfig({
      ...sectionConfig,
      [key]: !sectionConfig[key]
    })
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-xl">
          <Settings className="w-5 h-5 text-slate-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Customize Sections</h2>
          <p className="text-sm text-slate-600">Choose which sections to include in your CV</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => {
          const Icon = section.icon
          const isEnabled = sectionConfig[section.key]
          
          return (
            <div 
              key={section.key}
              className={`p-4 border rounded-xl transition-all duration-200 ${
                isEnabled 
                  ? 'bg-blue-50/50 border-blue-200 shadow-sm' 
                  : 'bg-slate-50/50 border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg transition-colors duration-200 ${
                    isEnabled 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900 mb-1">{section.label}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{section.description}</p>
                  </div>
                </div>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={() => toggleSection(section.key)}
                  className="mt-1"
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
        <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
          Tips for Section Selection
        </h3>
        <ul className="text-sm text-blue-800 space-y-1 leading-relaxed">
          <li>• <strong>Personal Info</strong> and <strong>Experience</strong> are essential for most CVs</li>
          <li>• Include <strong>Projects</strong> if you're in tech or creative fields</li>
          <li>• Add <strong>Certifications</strong> for professional roles requiring credentials</li>
          <li>• Use <strong>Volunteer</strong> section to show community engagement</li>
        </ul>
      </div>
    </div>
  )
} 