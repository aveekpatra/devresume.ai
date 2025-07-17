"use client"

import { useState } from "react"
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FileText, 
  Eye,
  Award,
  Globe,
  Heart,
  Star,
  Settings
} from "lucide-react"

import { CVData, SectionConfig, Tab } from "./types"
import { CVTabs } from "./cv-tabs"
import { CVSectionRenderer } from "./cv-section-renderer"
import { AISidebar } from "./ai-sidebar"

interface CVEditorProps {
  cvName?: string;
}

export function CVEditor({ cvName = "My Resume" }: CVEditorProps) {
  const [activeTab, setActiveTab] = useState("personal")
  const [sectionConfig, setSectionConfig] = useState<SectionConfig>({
    personalInfo: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: false,
    certifications: false,
    languages: false,
    awards: false,
    volunteer: false
  })

  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      website: ""
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    volunteer: []
  })

  const updateCVData = (newData: CVData) => {
    setCvData(newData)
  }

  const tabs: Tab[] = [
    { id: "personal", label: "Personal", icon: User, enabled: sectionConfig.personalInfo },
    { id: "summary", label: "Summary", icon: FileText, enabled: sectionConfig.summary },
    { id: "experience", label: "Experience", icon: Briefcase, enabled: sectionConfig.experience },
    { id: "education", label: "Education", icon: GraduationCap, enabled: sectionConfig.education },
    { id: "skills", label: "Skills", icon: Code, enabled: sectionConfig.skills },
    { id: "projects", label: "Projects", icon: Star, enabled: sectionConfig.projects },
    { id: "certifications", label: "Certifications", icon: Award, enabled: sectionConfig.certifications },
    { id: "languages", label: "Languages", icon: Globe, enabled: sectionConfig.languages },
    { id: "awards", label: "Awards", icon: Award, enabled: sectionConfig.awards },
    { id: "volunteer", label: "Volunteer", icon: Heart, enabled: sectionConfig.volunteer },
    { id: "customize", label: "Customize", icon: Settings, enabled: true },
    { id: "preview", label: "Preview", icon: Eye, enabled: true }
  ]

  const enabledTabs = tabs.filter(tab => tab.enabled)

  return (
    <div className="h-screen bg-white flex flex-col">
      <CVTabs 
        tabs={enabledTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cvName={cvName}
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 md:px-6 pb-4 min-h-0">
        {/* Editor Panel */}
        <div className="lg:col-span-2 min-h-0">
          <div className="h-full bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-lg shadow-slate-200/20 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <CVSectionRenderer
                activeTab={activeTab}
                cvData={cvData}
                setCvData={setCvData}
                sectionConfig={sectionConfig}
                setSectionConfig={setSectionConfig}
              />
            </div>
          </div>
        </div>

        {/* AI Sidebar */}
        <div className="hidden lg:block min-h-0">
          <AISidebar cvData={cvData} onUpdateCV={updateCVData} />
        </div>
      </div>
    </div>
  )
} 