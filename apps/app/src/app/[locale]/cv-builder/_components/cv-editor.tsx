"use client";

import { useState } from "react";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import { Label } from "@v1/ui/label";
import { Textarea } from "@v1/ui/textarea";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { PersonalInfoSection } from "./sections/personal-info-section";
import { ExperienceSection } from "./sections/experience-section";
import { EducationSection } from "./sections/education-section";
import { SkillsSection } from "./sections/skills-section";

interface CVEditorProps {
  data: any;
  onChange: (data: any) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  {
    id: "personal",
    name: "Personal Information",
    icon: User,
    description: "Your basic contact information and professional summary"
  },
  {
    id: "experience",
    name: "Work Experience",
    icon: Briefcase,
    description: "Your professional work history and achievements"
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    description: "Your educational background and qualifications"
  },
  {
    id: "skills",
    name: "Skills",
    icon: Award,
    description: "Your technical and professional skills"
  }
];

export function CVEditor({ data, onChange, activeSection, onSectionChange }: CVEditorProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set([activeSection])
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
    onSectionChange(sectionId);
  };

  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case "personal":
        return (
          <PersonalInfoSection
            data={data.personalInfo}
            onChange={(personalInfo) => onChange({ ...data, personalInfo })}
          />
        );
      case "experience":
        return (
          <ExperienceSection
            data={data.experience}
            onChange={(experience) => onChange({ ...data, experience })}
          />
        );
      case "education":
        return (
          <EducationSection
            data={data.education}
            onChange={(education) => onChange({ ...data, education })}
          />
        );
      case "skills":
        return (
          <SkillsSection
            data={data.skills}
            onChange={(skills) => onChange({ ...data, skills })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Section Navigation */}
      <div className="border-b border-border bg-card/50 p-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const isExpanded = expandedSections.has(section.id);
            
            return (
              <Button
                key={section.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  onSectionChange(section.id);
                  if (!expandedSections.has(section.id)) {
                    toggleSection(section.id);
                  }
                }}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Icon className="h-4 w-4" />
                {section.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.has(section.id);
            const isActive = activeSection === section.id;

            return (
              <div
                key={section.id}
                className={`rounded-lg border transition-all ${
                  isActive 
                    ? "border-primary bg-primary/5" 
                    : "border-border bg-card"
                }`}
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    <div>
                      <h3 className={`font-medium ${isActive ? "text-primary" : "text-foreground"}`}>
                        {section.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="border-t border-border p-4">
                    {renderSectionContent(section.id)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="border-t border-border bg-card/50 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {expandedSections.size} of {sections.length} sections expanded
          </span>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ 
                  width: `${(expandedSections.size / sections.length) * 100}%` 
                }}
              />
            </div>
            <span className="text-muted-foreground">
              {Math.round((expandedSections.size / sections.length) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 