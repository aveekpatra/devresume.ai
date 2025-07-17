import { CVData, SectionConfig } from "./types"
import { PersonalInfoSection } from "./sections/personal-info-section"
import { SummarySection } from "./sections/summary-section"
import { ExperienceSection } from "./sections/experience-section"
import { EducationSection } from "./sections/education-section"
import { SkillsSection } from "./sections/skills-section"
import { ProjectsSection } from "./sections/projects-section"
import { CertificationsSection } from "./sections/certifications-section"
import { LanguagesSection } from "./sections/languages-section"
import { AwardsSection } from "./sections/awards-section"
import { VolunteerSection } from "./sections/volunteer-section"
import { CustomizeSection } from "./sections/customize-section"
import { PreviewSection } from "./sections/preview-section"

interface CVSectionRendererProps {
  activeTab: string
  cvData: CVData
  setCvData: (data: CVData) => void
  sectionConfig: SectionConfig
  setSectionConfig: (config: SectionConfig) => void
}

export function CVSectionRenderer({ 
  activeTab, 
  cvData, 
  setCvData, 
  sectionConfig, 
  setSectionConfig 
}: CVSectionRendererProps) {
  switch (activeTab) {
    case "personal":
      return <PersonalInfoSection cvData={cvData} setCvData={setCvData} />
    case "summary":
      return <SummarySection cvData={cvData} setCvData={setCvData} />
    case "experience":
      return <ExperienceSection cvData={cvData} setCvData={setCvData} />
    case "education":
      return <EducationSection cvData={cvData} setCvData={setCvData} />
    case "skills":
      return <SkillsSection cvData={cvData} setCvData={setCvData} />
    case "projects":
      return <ProjectsSection cvData={cvData} setCvData={setCvData} />
    case "certifications":
      return <CertificationsSection cvData={cvData} setCvData={setCvData} />
    case "languages":
      return <LanguagesSection cvData={cvData} setCvData={setCvData} />
    case "awards":
      return <AwardsSection cvData={cvData} setCvData={setCvData} />
    case "volunteer":
      return <VolunteerSection cvData={cvData} setCvData={setCvData} />
    case "customize":
      return <CustomizeSection sectionConfig={sectionConfig} setSectionConfig={setSectionConfig} />
    case "preview":
      return <PreviewSection />
    default:
      return <PersonalInfoSection cvData={cvData} setCvData={setCvData} />
  }
} 