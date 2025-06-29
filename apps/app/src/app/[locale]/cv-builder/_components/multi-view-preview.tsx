"use client";

import { useState } from "react";
import { Button } from "@v1/ui/button";
import { Badge } from "@v1/ui/badge";
import { ScrollArea } from "@v1/ui/scroll-area";
import { 
  Eye, 
  Smartphone, 
  Bot, 
  User, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Minimize2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart3,
  Clock,
  FileText
} from "lucide-react";
import { cn } from "@v1/ui/utils";

interface MultiViewPreviewProps {
  cvData: any;
  templates?: any;
  currentTemplateId?: string;
  className?: string;
}

type ViewMode = 'human' | 'ats' | 'mobile';

export function MultiViewPreview({ cvData, templates, currentTemplateId, className }: MultiViewPreviewProps) {
  const [currentView, setCurrentView] = useState<ViewMode>('human');
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const views = [
    {
      key: 'human' as ViewMode,
      label: 'Human View',
      icon: User,
      description: 'Professional format for recruiters'
    },
    {
      key: 'ats' as ViewMode,
      label: 'ATS View',
      icon: Bot,
      description: 'How ATS systems read your CV'
    },
    {
      key: 'mobile' as ViewMode,
      label: 'Mobile View',
      icon: Smartphone,
      description: 'Optimized for mobile devices'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const renderHumanView = () => (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">{cvData?.personalInfo?.fullName || "Your Name"}</h1>
          <div className="text-gray-600 mt-2 space-y-1">
            <p>{cvData?.personalInfo?.email || "your.email@example.com"}</p>
            <p>{cvData?.personalInfo?.phone || "Your Phone"} • {cvData?.personalInfo?.location || "Your Location"}</p>
          </div>
        </div>

        {/* Professional Summary */}
        {cvData?.personalInfo?.summary && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{cvData.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {cvData?.experience?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Professional Experience</h2>
            <div className="space-y-4">
              {cvData.experience.map((exp: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company} • {exp.location}</p>
                    </div>
                    <p className="text-gray-600 text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData?.education?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Education</h2>
            <div className="space-y-3">
              {cvData.education.map((edu: any, index: number) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-gray-600 text-sm">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {cvData?.skills?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Skills</h2>
            <div className="space-y-3">
              {cvData.skills.map((skillGroup: any, index: number) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900 mb-2">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill: string, skillIndex: number) => (
                      <span key={skillIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
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
    </div>
  );

  const renderATSView = () => (
    <div className="bg-gray-50 p-8 font-mono text-sm max-w-4xl mx-auto" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
      <div className="space-y-4 text-gray-800">
        <div className="bg-blue-100 p-4 rounded border-l-4 border-blue-400">
          <p className="font-semibold text-blue-800 mb-1">ATS PARSING SIMULATION</p>
          <p className="text-blue-700 text-xs">This shows how Applicant Tracking Systems typically parse your CV</p>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-blue-600 font-semibold">[CONTACT_INFO]</span>
            <div className="ml-4 space-y-1 mt-1">
              <div>NAME: {cvData?.personalInfo?.fullName || "Not provided"}</div>
              <div>EMAIL: {cvData?.personalInfo?.email || "Not provided"}</div>
              <div>PHONE: {cvData?.personalInfo?.phone || "Not provided"}</div>
              <div>LOCATION: {cvData?.personalInfo?.location || "Not provided"}</div>
            </div>
          </div>

          {cvData?.personalInfo?.summary && (
            <div>
              <span className="text-blue-600 font-semibold">[SUMMARY]</span>
              <div className="ml-4 mt-1">{cvData.personalInfo.summary}</div>
            </div>
          )}

          {cvData?.experience?.length > 0 && (
            <div>
              <span className="text-blue-600 font-semibold">[EXPERIENCE]</span>
              <div className="ml-4 space-y-3 mt-1">
                {cvData.experience.map((exp: any, index: number) => (
                  <div key={index}>
                    <div>POSITION: {exp.position}</div>
                    <div>COMPANY: {exp.company}</div>
                    <div>DATES: {exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}</div>
                    <div>DESCRIPTION: {exp.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cvData?.education?.length > 0 && (
            <div>
              <span className="text-blue-600 font-semibold">[EDUCATION]</span>
              <div className="ml-4 space-y-2 mt-1">
                {cvData.education.map((edu: any, index: number) => (
                  <div key={index}>
                    <div>DEGREE: {edu.degree}</div>
                    <div>FIELD: {edu.field || 'Not specified'}</div>
                    <div>INSTITUTION: {edu.institution}</div>
                    <div>DATES: {edu.startDate} - {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cvData?.skills?.length > 0 && (
            <div>
              <span className="text-blue-600 font-semibold">[SKILLS]</span>
              <div className="ml-4 mt-1">
                {cvData.skills.map((skillGroup: any, index: number) => (
                  <div key={index}>
                    <div>{skillGroup.category.toUpperCase()}: {skillGroup.items.join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMobileView = () => (
    <div className="bg-white border rounded-lg max-w-sm mx-auto shadow-lg" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
      <div className="p-4 space-y-4">
        {/* Mobile Header */}
        <div className="text-center">
          <h1 className="text-lg font-bold text-gray-900">{cvData?.personalInfo?.fullName || "Your Name"}</h1>
          <div className="text-xs text-gray-600 mt-1 space-y-1">
            <p>{cvData?.personalInfo?.email || "your.email@example.com"}</p>
            <p>{cvData?.personalInfo?.phone || "Your Phone"}</p>
            <p>{cvData?.personalInfo?.location || "Your Location"}</p>
          </div>
        </div>

        {/* Mobile Summary */}
        {cvData?.personalInfo?.summary && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{cvData.personalInfo.summary}</p>
          </div>
        )}

        {/* Mobile Experience */}
        {cvData?.experience?.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Experience</h2>
            <div className="space-y-3">
              {cvData.experience.slice(0, 2).map((exp: any, index: number) => (
                <div key={index} className="border-l-2 border-blue-200 pl-2">
                  <h3 className="text-xs font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-xs text-gray-700">{exp.company}</p>
                  <p className="text-xs text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  <p className="text-xs text-gray-700 mt-1 line-clamp-2">{exp.description}</p>
                </div>
              ))}
              {cvData.experience.length > 2 && (
                <p className="text-xs text-gray-500 italic">+{cvData.experience.length - 2} more positions</p>
              )}
            </div>
          </div>
        )}

        {/* Mobile Skills */}
        {cvData?.skills?.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Skills</h2>
            <div className="space-y-2">
              {cvData.skills.slice(0, 2).map((skillGroup: any, index: number) => (
                <div key={index}>
                  <h3 className="text-xs font-medium text-gray-900">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skillGroup.items.slice(0, 4).map((skill: string, skillIndex: number) => (
                      <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {skillGroup.items.length > 4 && (
                      <span className="text-xs text-gray-500">+{skillGroup.items.length - 4}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'human': return renderHumanView();
      case 'ats': return renderATSView();
      case 'mobile': return renderMobileView();
      default: return renderHumanView();
    }
  };

  return (
    <div className={cn("h-full flex flex-col bg-background", className)}>
      {/* Simplified Header */}
      <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Preview Your CV</h2>
            <p className="text-muted-foreground mt-1">
              See how it looks across different platforms
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-background rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                disabled={zoom <= 50}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-3">{zoom}%</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                disabled={zoom >= 200}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* View Selection */}
      <div className="px-6 py-4 border-b">
        <div className="flex gap-2">
          {views.map(({ key, label, icon: Icon, description }) => (
            <button
              key={key}
              onClick={() => setCurrentView(key)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all flex-1",
                currentView === key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <div>
                <div className="font-medium">{label}</div>
                <div className="text-xs opacity-80">{description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview Content */}
      <ScrollArea className="flex-1">
        <div className="p-8">
          {renderCurrentView()}
        </div>
      </ScrollArea>

      {/* Simple Metrics Footer */}
      <div className="p-4 border-t bg-muted/30">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-500" />
            <span>Current View: <span className="font-medium">{views.find(v => v.key === currentView)?.label}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-green-500" />
            <span>Zoom: <span className="font-medium">{zoom}%</span></span>
          </div>
        </div>
      </div>
    </div>
  );
} 