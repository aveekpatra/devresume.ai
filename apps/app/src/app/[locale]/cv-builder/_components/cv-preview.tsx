"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@v1/backend/convex/_generated/api";
import { Id } from "@v1/backend/convex/_generated/dataModel";
import { Button } from "@v1/ui/button";
import { Badge } from "@v1/ui/badge";
import { 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Settings,
  Eye,
  Maximize2,
  Minimize2
} from "lucide-react";

interface CVPreviewProps {
  data: {
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      website?: string;
      linkedin?: string;
      summary: string;
    };
    experience: Array<{
      id: string;
      company: string;
      position: string;
      location: string;
      startDate: string;
      endDate?: string;
      current: boolean;
      description: string;
    }>;
    education: Array<{
      id: string;
      institution: string;
      degree: string;
      field?: string;
      startDate: string;
      endDate?: string;
      gpa?: string;
      description?: string;
    }>;
    skills: Array<{
      id: string;
      category: string;
      items: string[];
    }>;
  };
  templateId?: string;
}

export function CVPreview({ data, templateId }: CVPreviewProps) {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fetch template data
  const template = useQuery(
    api.templates.get, 
    templateId ? { templateId: templateId as Id<"templates"> } : "skip"
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatDateRange = (startDate: string, endDate?: string, current?: boolean) => {
    const start = formatDate(startDate);
    if (current) return `${start} - Present`;
    if (!endDate) return start;
    return `${start} - ${formatDate(endDate)}`;
  };

  // Default template config
  const defaultTemplate = {
    colors: {
      primary: "#2563eb",
      secondary: "#64748b",
      text: "#1e293b",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
    layout: "single-column",
  };

  const templateConfig = template?.config || defaultTemplate;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));
  const handleResetZoom = () => setZoom(100);

  return (
    <div className={`h-full flex flex-col bg-muted/30 ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      {/* Preview Header */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Live Preview</span>
            <Badge variant="secondary" className="text-xs">
              Auto-updating
            </Badge>
            {template && (
              <Badge variant="outline" className="text-xs">
                {template.name}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground px-2 min-w-[3rem] text-center">
              {zoom}%
            </span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleResetZoom}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <div 
            className="transition-transform duration-200 origin-top"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {/* CV Document - A4 proportions */}
            <div 
              className="bg-white shadow-xl rounded-lg overflow-hidden"
              style={{ 
                width: '595px', // A4 width in pixels at 72 DPI
                minHeight: '842px', // A4 height in pixels at 72 DPI
                fontFamily: templateConfig.fonts.body,
                color: templateConfig.colors.text,
              }}
            >
              {templateConfig.layout === "single-column" ? (
                <SingleColumnLayout data={data} config={templateConfig} />
              ) : (
                <TwoColumnLayout data={data} config={templateConfig} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Single Column Layout Component
function SingleColumnLayout({ data, config }: { data: any; config: any }) {
  return (
    <div className="p-12 space-y-8">
      {/* Header Section */}
      <div className="text-center pb-8 border-b-2" style={{ borderColor: config.colors.primary }}>
        <h1 
          className="text-4xl font-bold mb-3"
          style={{ 
            color: config.colors.primary,
            fontFamily: config.fonts.heading 
          }}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-4" style={{ color: config.colors.secondary }}>
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
        
        {(data.personalInfo.website || data.personalInfo.linkedin) && (
          <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: config.colors.primary }}>
            {data.personalInfo.website && (
              <span className="hover:underline">{data.personalInfo.website}</span>
            )}
            {data.personalInfo.linkedin && (
              <span className="hover:underline">LinkedIn Profile</span>
            )}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div>
          <h2 
            className="text-xl font-bold mb-4 pb-2 border-b"
            style={{ 
              color: config.colors.primary,
              fontFamily: config.fonts.heading,
              borderColor: config.colors.secondary + '50'
            }}
          >
            Professional Summary
          </h2>
          <p className="leading-relaxed" style={{ color: config.colors.text }}>
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <div>
          <h2 
            className="text-xl font-bold mb-6 pb-2 border-b"
            style={{ 
              color: config.colors.primary,
              fontFamily: config.fonts.heading,
              borderColor: config.colors.secondary + '50'
            }}
          >
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 
                      className="text-lg font-semibold"
                      style={{ color: config.colors.text, fontFamily: config.fonts.heading }}
                    >
                      {exp.position || "Position Title"}
                    </h3>
                    <p 
                      className="font-medium"
                      style={{ color: config.colors.primary }}
                    >
                      {exp.company || "Company Name"}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <div 
                    className="text-sm font-medium"
                    style={{ color: config.colors.secondary }}
                  >
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </div>
                </div>
                {exp.description && (
                  <div 
                    className="text-sm leading-relaxed whitespace-pre-line ml-4 pl-4 border-l-2"
                    style={{ 
                      color: config.colors.text,
                      borderColor: config.colors.secondary + '30'
                    }}
                  >
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <div>
          <h2 
            className="text-xl font-bold mb-6 pb-2 border-b"
            style={{ 
              color: config.colors.primary,
              fontFamily: config.fonts.heading,
              borderColor: config.colors.secondary + '50'
            }}
          >
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 
                    className="text-lg font-semibold"
                    style={{ color: config.colors.text, fontFamily: config.fonts.heading }}
                  >
                    {edu.degree || "Degree"}
                    {edu.field && ` in ${edu.field}`}
                  </h3>
                  <p style={{ color: config.colors.primary }}>
                    {edu.institution || "Institution"}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm" style={{ color: config.colors.secondary }}>
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: config.colors.secondary }}
                >
                  {formatDateRange(edu.startDate, edu.endDate)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <div>
          <h2 
            className="text-xl font-bold mb-6 pb-2 border-b"
            style={{ 
              color: config.colors.primary,
              fontFamily: config.fonts.heading,
              borderColor: config.colors.secondary + '50'
            }}
          >
            Skills
          </h2>
          <div className="space-y-4">
            {data.skills.map((skillGroup) => (
              <div key={skillGroup.id}>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: config.colors.text }}
                >
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: config.colors.primary + '20',
                        color: config.colors.primary,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Two Column Layout Component
function TwoColumnLayout({ data, config }: { data: any; config: any }) {
  return (
    <div className="flex min-h-full">
      {/* Left Sidebar */}
      <div 
        className="w-1/3 p-8 text-white"
        style={{ backgroundColor: config.colors.primary }}
      >
        <div className="space-y-8">
          {/* Personal Info */}
          <div className="text-center">
            <h1 
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: config.fonts.heading }}
            >
              {data.personalInfo.fullName || "Your Name"}
            </h1>
            <div className="space-y-1 text-sm opacity-90">
              {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
              {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
              {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
              {data.personalInfo.linkedin && <div>LinkedIn Profile</div>}
            </div>
          </div>

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 
                className="text-lg font-bold mb-4 pb-2 border-b border-white/30"
                style={{ fontFamily: config.fonts.heading }}
              >
                Skills
              </h2>
              <div className="space-y-4">
                {data.skills.map((skillGroup) => (
                  <div key={skillGroup.id}>
                    <h3 className="font-semibold mb-2 text-sm">{skillGroup.category}</h3>
                    <div className="space-y-1">
                      {skillGroup.items.map((skill, index) => (
                        <div key={index} className="text-sm opacity-90">
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8">
        <div className="space-y-8">
          {/* Professional Summary */}
          {data.personalInfo.summary && (
            <div>
              <h2 
                className="text-xl font-bold mb-4 pb-2 border-b"
                style={{ 
                  color: config.colors.primary,
                  fontFamily: config.fonts.heading,
                  borderColor: config.colors.secondary + '50'
                }}
              >
                Professional Summary
              </h2>
              <p className="leading-relaxed" style={{ color: config.colors.text }}>
                {data.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 
                className="text-xl font-bold mb-6 pb-2 border-b"
                style={{ 
                  color: config.colors.primary,
                  fontFamily: config.fonts.heading,
                  borderColor: config.colors.secondary + '50'
                }}
              >
                Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="mb-2">
                      <h3 
                        className="text-lg font-semibold"
                        style={{ color: config.colors.text, fontFamily: config.fonts.heading }}
                      >
                        {exp.position || "Position Title"}
                      </h3>
                      <p 
                        className="font-medium"
                        style={{ color: config.colors.primary }}
                      >
                        {exp.company || "Company Name"}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: config.colors.secondary }}
                      >
                        {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    {exp.description && (
                      <div 
                        className="text-sm leading-relaxed whitespace-pre-line"
                        style={{ color: config.colors.text }}
                      >
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 
                className="text-xl font-bold mb-6 pb-2 border-b"
                style={{ 
                  color: config.colors.primary,
                  fontFamily: config.fonts.heading,
                  borderColor: config.colors.secondary + '50'
                }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 
                      className="text-lg font-semibold"
                      style={{ color: config.colors.text, fontFamily: config.fonts.heading }}
                    >
                      {edu.degree || "Degree"}
                      {edu.field && ` in ${edu.field}`}
                    </h3>
                    <p style={{ color: config.colors.primary }}>
                      {edu.institution || "Institution"}
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: config.colors.secondary }}
                    >
                      {formatDateRange(edu.startDate, edu.endDate)}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to format date ranges
function formatDateRange(startDate: string, endDate?: string, current?: boolean) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const start = formatDate(startDate);
  if (current) return `${start} - Present`;
  if (!endDate) return start;
  return `${start} - ${formatDate(endDate)}`;
} 