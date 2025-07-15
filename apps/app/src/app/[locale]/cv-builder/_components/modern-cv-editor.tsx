"use client"

import { useState } from "react"
import { Button } from "@v1/ui/button"
import { Input } from "@v1/ui/input"
import { Label } from "@v1/ui/label"
import { Textarea } from "@v1/ui/textarea"
import { Badge } from "@v1/ui/badge"
import { Separator } from "@v1/ui/separator"
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FileText, 
  Target,
  Plus,
  X,
  Edit2,
  ChevronDown,
  ChevronRight,
  Save,
  Download,
  Wand2
} from "lucide-react"
import { CVPreviewSidebar } from "./cv-preview-sidebar"

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
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
    link?: string
  }>
}

const initialCVData: CVData = {
  personalInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: ""
  },
  summary: "",
  experience: [],
  education: [],
  skills: {
    programming: [],
    frameworks: [],
    tools: [],
    languages: []
  },
  projects: []
}

export function ModernCVEditor() {
  const [cvData, setCVData] = useState<CVData>(initialCVData)
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    summary: false,
    experience: false,
    education: false,
    skills: false,
    projects: false
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const updateCVData = (section: keyof CVData, data: any) => {
    setCVData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }
    setCVData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }))
    setExpandedSections(prev => ({ ...prev, experience: true }))
  }

  const removeExperience = (id: string) => {
    setCVData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const updateExperience = (id: string, field: string, value: any) => {
    setCVData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
      gpa: ""
    }
    setCVData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }))
    setExpandedSections(prev => ({ ...prev, education: true }))
  }

  const removeEducation = (id: string) => {
    setCVData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const updateEducation = (id: string, field: string, value: any) => {
    setCVData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const addSkill = (category: keyof CVData['skills'], skill: string) => {
    if (!skill.trim()) return
    setCVData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...prev.skills[category], skill.trim()]
      }
    }))
  }

  const removeSkill = (category: keyof CVData['skills'], index: number) => {
    setCVData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index)
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {cvData.personalInfo.name || "Resume Builder"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {cvData.personalInfo.title || "Professional Title"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Information Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div 
                className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleSection('personal')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    {expandedSections.personal ? 
                      <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    }
                  </div>
                </div>
              </div>
              
              {expandedSections.personal && (
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</Label>
                      <Input
                        id="name"
                        value={cvData.personalInfo.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCVData('personalInfo', {
                          ...cvData.personalInfo,
                          name: e.target.value
                        })}
                        placeholder="John Doe"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">Professional Title *</Label>
                      <Input
                        id="title"
                        value={cvData.personalInfo.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCVData('personalInfo', {
                          ...cvData.personalInfo,
                          title: e.target.value
                        })}
                        placeholder="Senior Software Engineer"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={cvData.personalInfo.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCVData('personalInfo', {
                          ...cvData.personalInfo,
                          email: e.target.value
                        })}
                        placeholder="john@example.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</Label>
                      <Input
                        id="phone"
                        value={cvData.personalInfo.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCVData('personalInfo', {
                          ...cvData.personalInfo,
                          phone: e.target.value
                        })}
                        placeholder="+1 (555) 123-4567"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</Label>
                      <Input
                        id="location"
                        value={cvData.personalInfo.location}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCVData('personalInfo', {
                          ...cvData.personalInfo,
                          location: e.target.value
                        })}
                        placeholder="San Francisco, CA"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin" className="text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        value={cvData.personalInfo.linkedin}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCVData('personalInfo', {
                          ...cvData.personalInfo,
                          linkedin: e.target.value
                        })}
                        placeholder="linkedin.com/in/johndoe"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github" className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub Profile</Label>
                      <Input
                        id="github"
                        value={cvData.personalInfo.github}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCVData('personalInfo', {
                          ...cvData.personalInfo,
                          github: e.target.value
                        })}
                        placeholder="github.com/johndoe"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="portfolio" className="text-sm font-medium text-gray-700 dark:text-gray-300">Portfolio Website</Label>
                      <Input
                        id="portfolio"
                        value={cvData.personalInfo.portfolio}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateCVData('personalInfo', {
                          ...cvData.personalInfo,
                          portfolio: e.target.value
                        })}
                        placeholder="johndoe.dev"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Professional Summary Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div 
                className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleSection('summary')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Professional Summary</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Wand2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    {expandedSections.summary ? 
                      <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    }
                  </div>
                </div>
              </div>
              
              {expandedSections.summary && (
                <div className="p-6">
                  <Textarea
                    value={cvData.summary}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateCVData('summary', e.target.value)}
                    placeholder="Write a compelling professional summary that highlights your key achievements and skills..."
                    className="min-h-32 resize-none"
                    rows={4}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Tip: Keep it concise (2-3 sentences) and focus on your unique value proposition.
                  </p>
                </div>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div 
                className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleSection('experience')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Experience
                      {cvData.experience.length > 0 && (
                        <span className="ml-2 text-sm text-gray-500">({cvData.experience.length})</span>
                      )}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation()
                        addExperience()
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    {expandedSections.experience ? 
                      <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    }
                  </div>
                </div>
              </div>
              
              {expandedSections.experience && (
                <div className="p-6 space-y-6">
                  {cvData.experience.map((exp, index) => (
                    <div key={exp.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">Experience #{index + 1}</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Title *</Label>
                          <Input
                            value={exp.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(exp.id, 'title', e.target.value)}
                            placeholder="Software Engineer"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company *</Label>
                          <Input
                            value={exp.company}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(exp.id, 'company', e.target.value)}
                            placeholder="Tech Corp"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</Label>
                          <Input
                            value={exp.location}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(exp.id, 'location', e.target.value)}
                            placeholder="San Francisco, CA"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date *</Label>
                          <Input
                            type="month"
                            value={exp.startDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(exp.id, 'startDate', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">End Date</Label>
                          <Input
                            type="month"
                            value={exp.endDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(exp.id, 'endDate', e.target.value)}
                            disabled={exp.current}
                            className="mt-1"
                          />
                        </div>
                        <div className="flex items-center space-x-2 mt-6">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateExperience(exp.id, 'current', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700 dark:text-gray-300">Currently working here</Label>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Description</Label>
                          <Button size="sm" variant="outline" className="flex items-center gap-2 h-8">
                            <Wand2 className="h-3 w-3" />
                            AI Improve
                          </Button>
                        </div>
                        <Textarea
                          value={exp.description}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateExperience(exp.id, 'description', e.target.value)}
                          placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software&#10;• Improved application performance by 40% through optimization techniques"
                          className="min-h-24 resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                  
                  {cvData.experience.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No work experience added yet</p>
                      <p className="text-sm mb-4">Add your professional experience to strengthen your resume</p>
                      <Button onClick={addExperience} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Experience
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div 
                className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleSection('education')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      Education
                      {cvData.education.length > 0 && (
                        <span className="ml-2 text-sm text-gray-500">({cvData.education.length})</span>
                      )}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation()
                        addEducation()
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    {expandedSections.education ? 
                      <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    }
                  </div>
                </div>
              </div>
              
              {expandedSections.education && (
                <div className="p-6 space-y-6">
                  {cvData.education.map((edu, index) => (
                    <div key={edu.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">Education #{index + 1}</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Degree *</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Bachelor of Science in Computer Science"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">School *</Label>
                          <Input
                            value={edu.school}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(edu.id, 'school', e.target.value)}
                            placeholder="University of California, Berkeley"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</Label>
                          <Input
                            value={edu.location}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(edu.id, 'location', e.target.value)}
                            placeholder="Berkeley, CA"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Graduation Date</Label>
                          <Input
                            type="month"
                            value={edu.graduationDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">GPA (Optional)</Label>
                          <Input
                            value={edu.gpa || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateEducation(edu.id, 'gpa', e.target.value)}
                            placeholder="3.8"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {cvData.education.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No education added yet</p>
                      <p className="text-sm mb-4">Add your educational background</p>
                      <Button onClick={addEducation} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Education
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div 
                className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleSection('skills')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Technical Skills</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    {expandedSections.skills ? 
                      <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    }
                  </div>
                </div>
              </div>
              
              {expandedSections.skills && (
                <div className="p-6 space-y-6">
                  {(['programming', 'frameworks', 'tools', 'languages'] as const).map((category) => (
                    <div key={category} className="space-y-3">
                      <Label className="text-base font-medium text-gray-900 dark:text-white capitalize">
                        {category === 'programming' ? 'Programming Languages' : category}
                      </Label>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {cvData.skills[category].map((skill, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                            {skill}
                            <button
                              onClick={() => removeSkill(category, index)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Input
                          placeholder={`Add ${category}...`}
                          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                              addSkill(category, e.currentTarget.value)
                              e.currentTarget.value = ''
                            }
                          }}
                          className="flex-1"
                        />
                        <Button
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            const input = e.currentTarget.parentNode?.querySelector('input') as HTMLInputElement
                            if (input) {
                              addSkill(category, input.value)
                              input.value = ''
                            }
                          }}
                          className="flex items-center gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Live Preview */}
          <div className="lg:col-span-1">
            <CVPreviewSidebar cvData={cvData} />
          </div>
        </div>
      </div>
    </div>
  )
} 