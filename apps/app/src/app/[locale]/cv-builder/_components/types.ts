export interface CVData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin?: string
    github?: string
    portfolio?: string
    website?: string
  }
  summary?: string
  experience: Array<{
    id: string
    title: string
    company: string
    location: string
    startDate: string
    endDate?: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate?: string
    current: boolean
    gpa?: string
  }>
  skills: Array<{
    id: string
    category: string
    items: string[]
  }>
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
    url?: string
    startDate: string
    endDate?: string
    current: boolean
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
    expiryDate?: string
    credentialId?: string
    url?: string
  }>
  languages: Array<{
    id: string
    language: string
    proficiency: string
  }>
  awards: Array<{
    id: string
    title: string
    issuer: string
    date: string
    description: string
  }>
  volunteer: Array<{
    id: string
    organization: string
    role: string
    startDate: string
    endDate?: string
    current: boolean
    description: string
  }>
}

export interface SectionConfig {
  personalInfo: boolean
  summary: boolean
  experience: boolean
  education: boolean
  skills: boolean
  projects: boolean
  certifications: boolean
  languages: boolean
  awards: boolean
  volunteer: boolean
}

export interface CVSectionProps {
  cvData: CVData
  setCvData: (data: CVData) => void
}

export interface Tab {
  id: string
  label: string
  icon: any
  enabled: boolean
} 