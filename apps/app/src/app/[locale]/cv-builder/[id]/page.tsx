"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@v1/backend/convex/_generated/api";
import { Id } from "@v1/backend/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { Button } from "@v1/ui/button";
import { Badge } from "@v1/ui/badge";
import { 
  Save, 
  Download, 
  ArrowLeft, 
  Eye,
  Sparkles
} from "lucide-react";
import { CVEditor } from "../_components/cv-editor";
import { CVPreview } from "../_components/cv-preview";
import { TemplateSelector } from "../_components/template-selector";
import { JobAnalysisPanel } from "../_components/job-analysis-panel";
import { ATSOptimizationPanel } from "../_components/ats-optimization-panel";
import { SmartContentEnhancer } from "../_components/smart-content-enhancer";
import { toast } from "sonner";

interface CVData {
  personalInfo: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    summary?: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
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
}

export default function CVBuilderPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
  });
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [currentTemplateId, setCurrentTemplateId] = useState<string>();
  const [jobAnalysisOpen, setJobAnalysisOpen] = useState(false);
  const [jobAnalysis, setJobAnalysis] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [showAITools, setShowAITools] = useState(false);

  // Fetch project data
  const project = useQuery(api.projects.getProject, { 
    projectId: params.id as Id<"projects"> 
  });

  // Fetch CV data if it exists
  const existingCV = useQuery(api.cvs.getByProject, { 
    projectId: params.id as Id<"projects"> 
  });

  // Fetch templates
  const templates = useQuery(api.templates.list, {});

  // Mutations
  const createCV = useMutation(api.cvs.create);
  const updateCV = useMutation(api.cvs.update);

  // Load existing CV data
  useEffect(() => {
    if (existingCV) {
      setCVData({
        personalInfo: existingCV.personalInfo,
        experience: existingCV.experience,
        education: existingCV.education,
        skills: existingCV.skills,
      });
      setCurrentTemplateId(existingCV.templateId);
      setHasUnsavedChanges(false); // Reset unsaved changes when loading existing data
    }
  }, [existingCV]);

  // Track unsaved changes
  useEffect(() => {
    if (existingCV) {
      setHasUnsavedChanges(true);
    }
  }, [cvData, currentTemplateId]);

  // Keyboard shortcut for saving (Ctrl+S / Cmd+S)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        if (hasUnsavedChanges && !isSaving) {
          handleSave(true);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hasUnsavedChanges, isSaving]);

  const handleSave = async (showToast = true) => {
    if (!project) return;
    
    setIsSaving(true);
    try {
      if (existingCV) {
        await updateCV({
          cvId: existingCV._id,
          templateId: currentTemplateId,
          personalInfo: cvData.personalInfo,
          experience: cvData.experience,
          education: cvData.education,
          skills: cvData.skills,
        });
      } else {
        await createCV({
          projectId: project._id,
          title: `${project.title} - CV`,
          templateId: currentTemplateId,
          personalInfo: cvData.personalInfo,
          experience: cvData.experience,
          education: cvData.education,
          skills: cvData.skills,
        });
      }
      
      if (showToast) {
        toast.success("CV saved successfully");
      }
      setHasUnsavedChanges(false); // Reset unsaved changes after successful save
    } catch (error) {
      if (showToast) {
        toast.error("Failed to save CV");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const formatDateRange = (startDate: string, endDate?: string, current?: boolean) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return '';
      const date = new Date(dateString + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const start = formatDate(startDate);
    if (current) return `${start} - Present`;
    if (!endDate) return start;
    return `${start} - ${formatDate(endDate)}`;
  };

  const handleExport = () => {
    // Simple export functionality - opens print dialog for now
    // TODO: Implement proper PDF generation with Puppeteer
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${project?.title || 'CV'}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
              .cv-container { max-width: 800px; margin: 0 auto; }
              h1 { color: #2563eb; }
              h2 { color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; }
              .section { margin-bottom: 20px; }
              .experience-item { margin-bottom: 15px; }
              .date-range { color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="cv-container">
              <h1>${cvData.personalInfo.fullName || 'Your Name'}</h1>
              <div class="contact-info">
                ${cvData.personalInfo.email ? `<p>Email: ${cvData.personalInfo.email}</p>` : ''}
                ${cvData.personalInfo.phone ? `<p>Phone: ${cvData.personalInfo.phone}</p>` : ''}
                ${cvData.personalInfo.location ? `<p>Location: ${cvData.personalInfo.location}</p>` : ''}
              </div>
              
              ${cvData.personalInfo.summary ? `
                <div class="section">
                  <h2>Professional Summary</h2>
                  <p>${cvData.personalInfo.summary}</p>
                </div>
              ` : ''}
              
              ${cvData.experience.length > 0 ? `
                <div class="section">
                  <h2>Professional Experience</h2>
                  ${cvData.experience.map(exp => `
                    <div class="experience-item">
                      <h3>${exp.position} at ${exp.company}</h3>
                      <p class="date-range">${formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                      ${exp.description ? `<p>${exp.description.replace(/\n/g, '<br>')}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              
              ${cvData.education.length > 0 ? `
                <div class="section">
                  <h2>Education</h2>
                  ${cvData.education.map(edu => `
                    <div class="experience-item">
                      <h3>${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</h3>
                      <p>${edu.institution}</p>
                      <p class="date-range">${formatDateRange(edu.startDate, edu.endDate)}</p>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              
              ${cvData.skills.length > 0 ? `
                <div class="section">
                  <h2>Skills</h2>
                  ${cvData.skills.map(skillGroup => `
                    <div>
                      <h4>${skillGroup.category}</h4>
                      <p>${skillGroup.items.join(', ')}</p>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    } else {
      toast.error("Unable to open export window. Please check your popup blocker.");
    }
  };

  const handleShare = () => {
    // TODO: Implement sharing
    toast.info("Share functionality coming soon!");
  };

  const handleTemplateChange = (templateId: string) => {
    setCurrentTemplateId(templateId);
    setHasUnsavedChanges(true);
    // Note: Template changes are not auto-saved - user must save manually
  };

  const handleCVUpdate = (newData: Partial<CVData>) => {
    setCVData(prev => ({ ...prev, ...newData }));
    setHasUnsavedChanges(true);
  };

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h1>
                {hasUnsavedChanges && !isSaving && (
                  <span className="text-xs text-orange-600 font-medium">• Unsaved changes</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{project.status}</Badge>
                {isSaving && (
                  <span className="text-xs text-muted-foreground">Saving...</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Template Selector */}
            <TemplateSelector
              currentTemplateId={currentTemplateId}
              onTemplateSelect={handleTemplateChange}
            />

            {/* Job Analysis */}
            <JobAnalysisPanel
              isOpen={jobAnalysisOpen}
              onOpenChange={setJobAnalysisOpen}
              onAnalysisComplete={setJobAnalysis}
            />

            {/* Toggle Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant={showPreview ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              
              <Button
                variant={showAITools ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAITools(!showAITools)}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                AI Tools
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 border-l pl-3">
              <Button
                size="sm"
                onClick={() => handleSave(true)}
                disabled={isSaving}
                className={`flex items-center gap-2 ${
                  hasUnsavedChanges 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                }`}
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Unified View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - CV Editor */}
        <div className={`${showPreview ? 'w-1/2' : 'flex-1'} overflow-hidden border-r`}>
          <CVEditor
            data={cvData}
            onChange={setCVData}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Right Panel - Preview */}
        {showPreview && (
          <div className="w-1/2 overflow-hidden">
            <CVPreview
              data={cvData}
              templateId={currentTemplateId}
            />
          </div>
        )}

        {/* AI Tools Sidebar */}
        {showAITools && (
          <div className="w-80 border-l bg-muted/30 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* ATS Optimization Section */}
              <div className="border-b">
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2">ATS Optimization</h3>
                  <ATSOptimizationPanel
                    cvData={cvData}
                    jobAnalysis={jobAnalysis}
                    onCVUpdate={handleCVUpdate}
                    className="h-64"
                  />
                </div>
              </div>

              {/* Smart Content Enhancement Section */}
              <div className="flex-1 overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-sm">AI Content Enhancement</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get smart suggestions for your content
                  </p>
                </div>
                <div className="flex-1 overflow-hidden">
                  <SmartContentEnhancer
                    cvData={cvData}
                    jobAnalysis={jobAnalysis}
                    onCVUpdate={handleCVUpdate}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 