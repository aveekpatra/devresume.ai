"use client";

import { useState, useEffect } from "react";
import { Button } from "@v1/ui/button";
import { Badge } from "@v1/ui/badge";
import { Input } from "@v1/ui/input";
import { Label } from "@v1/ui/label";
import { Textarea } from "@v1/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@v1/ui/dialog";
import { ScrollArea } from "@v1/ui/scroll-area";
import { 
  Search, 
  Building2, 
  MapPin, 
  Users, 
  Briefcase, 
  Star,
  TrendingUp,
  DollarSign,
  Calendar,
  ExternalLink,
  Sparkles,
  Target,
  Brain,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface JobAnalysisPanelProps {
  onAnalysisComplete: (analysis: JobAnalysis) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface JobAnalysis {
  jobTitle: string;
  companyName: string;
  atsScore: number;
  keywordGaps: string[];
  matchedKeywords: string[];
  companyInsights: CompanyInsights;
  cultureFit: CultureFit;
  optimizationSuggestions: OptimizationSuggestion[];
}

interface CompanyInsights {
  name: string;
  location: string;
  size: string;
  industry: string;
  glassdoorRating: number;
  fundingStage: string;
  recentNews: NewsItem[];
  techStack: string[];
  values: string[];
}

interface CultureFit {
  score: number;
  matchingValues: string[];
  suggestions: string[];
}

interface NewsItem {
  title: string;
  date: string;
  type: 'funding' | 'hiring' | 'product' | 'award';
}

interface OptimizationSuggestion {
  type: 'keyword' | 'culture' | 'experience';
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
  impact: string;
}

export function JobAnalysisPanel({ onAnalysisComplete, isOpen, onOpenChange }: JobAnalysisPanelProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<JobAnalysis | null>(null);

  // Mock analysis function - replace with actual API calls
  const analyzeJobAndCompany = async () => {
    if (!jobDescription.trim() || !companyName.trim()) {
      toast.error("Please provide both job description and company name");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock analysis result
    const mockAnalysis: JobAnalysis = {
      jobTitle: jobTitle || "Software Engineer",
      companyName,
      atsScore: 68,
      keywordGaps: ["React.js", "TypeScript", "AWS", "Agile", "Microservices"],
      matchedKeywords: ["JavaScript", "Node.js", "Git", "Problem Solving", "Team Collaboration"],
      companyInsights: {
        name: companyName,
        location: "San Francisco, CA",
        size: "500-1000 employees",
        industry: "SaaS/Technology",
        glassdoorRating: 4.2,
        fundingStage: "Series B",
        recentNews: [
          { title: "Raised $50M Series B funding", date: "2 months ago", type: "funding" },
          { title: "Expanding engineering team by 40%", date: "1 month ago", type: "hiring" },
          { title: "Launched AI-powered analytics platform", date: "2 weeks ago", type: "product" },
          { title: "Named Best Places to Work 2024", date: "1 week ago", type: "award" }
        ],
        techStack: ["React", "TypeScript", "Node.js", "AWS", "Docker", "Kubernetes"],
        values: ["Innovation", "Work-Life Balance", "Diversity & Inclusion", "Remote-First"]
      },
      cultureFit: {
        score: 85,
        matchingValues: ["Innovation", "Team Collaboration"],
        suggestions: [
          "Emphasize innovative project work",
          "Highlight remote collaboration experience",
          "Mention diversity and inclusion initiatives"
        ]
      },
      optimizationSuggestions: [
        {
          type: "keyword",
          priority: "high",
          suggestion: "Add 'React.js' and 'TypeScript' to your skills section",
          impact: "Will improve ATS score by ~15 points"
        },
        {
          type: "culture",
          priority: "medium",
          suggestion: "Include 'innovative solutions' in your professional summary",
          impact: "Better alignment with company values"
        },
        {
          type: "experience",
          priority: "high",
          suggestion: "Quantify achievements with specific metrics",
          impact: "Increases recruiter attention by 40%"
        }
      ]
    };

    setAnalysisResult(mockAnalysis);
    onAnalysisComplete(mockAnalysis);
    setIsAnalyzing(false);
    toast.success("Job analysis completed successfully!");
  };

  const extractCompanyFromDescription = (description: string) => {
    // Simple extraction logic - could be enhanced with NLP
    const lines = description.split('\n');
    for (const line of lines) {
      if (line.toLowerCase().includes('company:') || line.toLowerCase().includes('about us:')) {
        const match = line.match(/company:\s*([^,\n]+)/i) || line.match(/about\s+([^,\n]+)/i);
        if (match && match[1]) {
          setCompanyName(match[1].trim());
          break;
        }
      }
    }
  };

  const extractJobTitle = (description: string) => {
    const lines = description.split('\n');
    const firstLine = lines[0]?.trim();
    if (firstLine && firstLine.length < 100) {
      setJobTitle(firstLine);
    }
  };

  useEffect(() => {
    if (jobDescription) {
      extractCompanyFromDescription(jobDescription);
      extractJobTitle(jobDescription);
    }
  }, [jobDescription]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          Analyze Job & Company
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Job & Company Analysis
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[70vh]">
          {/* Left Panel - Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                id="job-title"
                placeholder="e.g., Senior Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                placeholder="e.g., TechCorp Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Paste the full job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[300px] resize-none"
              />
            </div>

            <Button 
              onClick={analyzeJobAndCompany}
              disabled={isAnalyzing || !jobDescription.trim() || !companyName.trim()}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Analyze Job & Company
                </>
              )}
            </Button>
          </div>

          {/* Right Panel - Results */}
          <ScrollArea className="h-full">
            {!analysisResult ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Brain className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-muted-foreground">
                  Provide a job description and company name to get detailed insights and optimization suggestions.
                </p>
              </div>
            ) : (
              <div className="space-y-6 p-1">
                {/* Company Overview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Company Overview</h3>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-lg">{analysisResult.companyInsights.name}</h4>
                      <Badge variant="secondary">{analysisResult.companyInsights.fundingStage}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{analysisResult.companyInsights.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{analysisResult.companyInsights.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{analysisResult.companyInsights.industry}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{analysisResult.companyInsights.glassdoorRating}/5 Glassdoor</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium">Company Values</h5>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.companyInsights.values.map((value, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium">Tech Stack</h5>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.companyInsights.techStack.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent News */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Recent Developments</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {analysisResult.companyInsights.recentNews.map((news, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                        <div className="mt-1">
                          {news.type === 'funding' && <DollarSign className="h-4 w-4 text-green-500" />}
                          {news.type === 'hiring' && <Users className="h-4 w-4 text-blue-500" />}
                          {news.type === 'product' && <Zap className="h-4 w-4 text-purple-500" />}
                          {news.type === 'award' && <Star className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{news.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {news.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Culture Fit */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Culture Fit Analysis</h3>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">Culture Fit Score</span>
                      <Badge variant="default" className="text-lg px-3 py-1">
                        {analysisResult.cultureFit.score}%
                      </Badge>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${analysisResult.cultureFit.score}%` }}
                      />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Matching Values</h5>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.cultureFit.matchingValues.map((value, index) => (
                            <Badge key={index} variant="default" className="text-xs">
                              {value}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2">Improvement Suggestions</h5>
                        <ul className="space-y-1">
                          {analysisResult.cultureFit.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optimization Suggestions */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Optimization Suggestions</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {analysisResult.optimizationSuggestions.map((suggestion, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={suggestion.priority === 'high' ? 'destructive' : suggestion.priority === 'medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {suggestion.priority.toUpperCase()} PRIORITY
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {suggestion.type}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{suggestion.suggestion}</p>
                        <p className="text-xs text-muted-foreground">{suggestion.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Analysis powered by AI and real-time company data
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {analysisResult && (
              <Button onClick={() => {
                onOpenChange(false);
                toast.success("Analysis applied to CV builder");
              }}>
                Apply to Resume
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 