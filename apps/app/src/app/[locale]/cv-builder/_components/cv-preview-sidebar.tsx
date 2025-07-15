import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent 
} from "@v1/ui/sidebar"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe 
} from "lucide-react"

interface CVData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin: string
    github: string
    portfolio: string
  }
  summary: string
  experience: Array<{
    id: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    degree: string
    school: string
    location: string
    graduationDate: string
    gpa?: string
  }>
  skills: {
    programming: string[]
    frameworks: string[]
    tools: string[]
    languages: string[]
  }
}

interface CVPreviewSidebarProps {
  cvData: CVData
}

export function CVPreviewSidebar({ cvData }: CVPreviewSidebarProps) {
  return (
    <Sidebar width="xl" className="h-fit">
      <SidebarHeader>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Live Preview
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your resume updates in real-time
          </p>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="space-y-6">
        {/* Header */}
        <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-4">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            {cvData.personalInfo.name || "Your Name"}
          </h1>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
            {cvData.personalInfo.title || "Your Professional Title"}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-gray-600 dark:text-gray-400">
            {cvData.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>{cvData.personalInfo.email}</span>
              </div>
            )}
            {cvData.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{cvData.personalInfo.phone}</span>
              </div>
            )}
            {cvData.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{cvData.personalInfo.location}</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-1 text-xs text-blue-600 dark:text-blue-400">
            {cvData.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-3 w-3" />
                <span>{cvData.personalInfo.linkedin}</span>
              </div>
            )}
            {cvData.personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="h-3 w-3" />
                <span>{cvData.personalInfo.github}</span>
              </div>
            )}
            {cvData.personalInfo.portfolio && (
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span>{cvData.personalInfo.portfolio}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {cvData.summary && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              {cvData.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {cvData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-xs font-medium text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {exp.company} {exp.location && `• ${exp.location}`}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">
              Education
            </h2>
            <div className="space-y-2">
              {cvData.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-xs font-medium text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    {edu.school} {edu.location && `• ${edu.location}`}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {edu.graduationDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {(cvData.skills.programming.length > 0 || cvData.skills.frameworks.length > 0 || 
          cvData.skills.tools.length > 0 || cvData.skills.languages.length > 0) && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">
              Technical Skills
            </h2>
            <div className="space-y-1">
              {cvData.skills.programming.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">Programming Languages: </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    {cvData.skills.programming.join(', ')}
                  </span>
                </div>
              )}
              {cvData.skills.frameworks.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">Frameworks: </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    {cvData.skills.frameworks.join(', ')}
                  </span>
                </div>
              )}
              {cvData.skills.tools.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">Tools: </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    {cvData.skills.tools.join(', ')}
                  </span>
                </div>
              )}
              {cvData.skills.languages.length > 0 && (
                <div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">Languages: </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">
                    {cvData.skills.languages.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
} 