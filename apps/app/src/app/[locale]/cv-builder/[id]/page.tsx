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
  Share2, 
  ArrowLeft, 
  Eye,
  Settings,
  Sparkles
} from "lucide-react";
import { CVEditor } from "../_components/cv-editor";
import { CVPreview } from "../_components/cv-preview";
import { AIAssistant } from "../_components/ai-assistant";
import { TemplateSelector } from "../_components/template-selector";
import { toast } from "sonner";

interface CVData {
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
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentTemplateId, setCurrentTemplateId] = useState<string>();

  // Fetch project data
  const project = useQuery(api.projects.getProject, { 
    projectId: params.id as Id<"projects"> 
  });

  // Fetch CV data if it exists
  const existingCV = useQuery(api.cvs.getByProject, { 
    projectId: params.id as Id<"projects"> 
  });

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
    }
  }, [existingCV]);

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      handleSave(false); // Silent save
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [cvData]);

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
    // Auto-save with new template
    setTimeout(() => handleSave(false), 100);
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
              <h1 className="text-lg font-semibold text-foreground">
                {project.title}
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{project.status}</Badge>
                {isSaving && (
                  <span className="text-xs text-muted-foreground">Saving...</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile view toggles */}
            <div className="flex lg:hidden">
              <Button
                variant={showPreview ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            </div>

            {/* Template Selector */}
            <TemplateSelector
              currentTemplateId={currentTemplateId}
              onTemplateSelect={handleTemplateChange}
            />

            {/* AI Assistant Toggle */}
            <Button
              variant={showAIAssistant ? "default" : "outline"}
              size="sm"
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              AI Assistant
            </Button>

            {/* Action Buttons */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>

            <Button
              size="sm"
              onClick={handleExport}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Content Editor */}
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} border-r border-border bg-background transition-all duration-300 lg:w-1/2`}>
          <CVEditor
            data={cvData}
            onChange={setCVData}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Preview Panel */}
        <div className={`${showPreview ? 'w-1/2' : 'hidden'} bg-muted/30 transition-all duration-300 lg:flex lg:w-1/2`}>
          <CVPreview data={cvData} templateId={currentTemplateId} />
        </div>

        {/* AI Assistant Sidebar */}
        {showAIAssistant && (
          <div className="w-80 border-l border-border bg-card">
            <AIAssistant
              cvData={cvData}
              activeSection={activeSection}
              onSuggestionApply={(suggestion) => {
                // TODO: Apply AI suggestions to CV data
                toast.info("AI suggestion applied!");
              }}
              onClose={() => setShowAIAssistant(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
} 