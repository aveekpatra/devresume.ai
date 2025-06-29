"use client";

import { useState, useEffect } from "react";
import { Button } from "@v1/ui/button";
import { Badge } from "@v1/ui/badge";
import { Progress } from "@v1/ui/progress";
import { ScrollArea } from "@v1/ui/scroll-area";
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Lightbulb,
  Zap,
  BarChart3,
  Sparkles,
  Brain,
  Search
} from "lucide-react";
import { cn } from "@v1/ui/utils";

interface ATSOptimizationPanelProps {
  cvData: any;
  jobAnalysis?: any;
  className?: string;
  onCVUpdate: (cv: any) => void;
}

interface ATSMetrics {
  overallScore: number;
  keywordScore: number;
  formatScore: number;
  contentScore: number;
  structureScore: number;
}

interface KeywordAnalysis {
  matched: Array<{
    keyword: string;
    frequency: number;
    importance: 'high' | 'medium' | 'low';
    sections: string[];
  }>;
  missing: Array<{
    keyword: string;
    importance: 'high' | 'medium' | 'low';
    suggestions: string[];
  }>;
  overused: Array<{
    keyword: string;
    frequency: number;
    recommended: number;
  }>;
}

interface OptimizationSuggestion {
  id: string;
  type: 'keyword' | 'format' | 'content' | 'structure';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: number;
  action: string;
  section?: string;
  isApplied?: boolean;
}

export function ATSOptimizationPanel({ cvData, jobAnalysis, className, onCVUpdate }: ATSOptimizationPanelProps) {
  const [atsMetrics, setATSMetrics] = useState<ATSMetrics>({
    overallScore: 0,
    keywordScore: 0,
    formatScore: 0,
    contentScore: 0,
    structureScore: 0
  });

  const [keywordAnalysis, setKeywordAnalysis] = useState<KeywordAnalysis>({
    matched: [],
    missing: [],
    overused: []
  });

  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedView, setSelectedView] = useState<'overview' | 'keywords' | 'suggestions'>('overview');

  // Mock ATS analysis - replace with actual analysis logic
  useEffect(() => {
    if (cvData) {
      analyzeATS();
    }
  }, [cvData, jobAnalysis]);

  const analyzeATS = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock analysis results
    const mockMetrics: ATSMetrics = {
      overallScore: jobAnalysis ? 74 : 58,
      keywordScore: jobAnalysis ? 68 : 45,
      formatScore: 85,
      contentScore: jobAnalysis ? 78 : 62,
      structureScore: 90
    };

    const mockKeywords: KeywordAnalysis = {
      matched: [
        {
          keyword: "JavaScript",
          frequency: 3,
          importance: "high",
          sections: ["Skills", "Experience"]
        },
        {
          keyword: "Problem Solving",
          frequency: 2,
          importance: "medium",
          sections: ["Summary", "Experience"]
        },
        {
          keyword: "Team Collaboration",
          frequency: 1,
          importance: "medium",
          sections: ["Experience"]
        }
      ],
      missing: jobAnalysis ? [
        {
          keyword: "React.js",
          importance: "high",
          suggestions: ["Add to skills section", "Mention in recent experience"]
        },
        {
          keyword: "TypeScript",
          importance: "high",
          suggestions: ["Include in technical skills", "Reference in project descriptions"]
        },
        {
          keyword: "AWS",
          importance: "medium",
          suggestions: ["Add to technical skills if you have experience"]
        },
        {
          keyword: "Agile",
          importance: "medium",
          suggestions: ["Mention agile methodologies in experience"]
        }
      ] : [
        {
          keyword: "Leadership",
          importance: "high",
          suggestions: ["Add leadership examples to experience section"]
        },
        {
          keyword: "Project Management",
          importance: "medium",
          suggestions: ["Include project management skills or experience"]
        }
      ],
      overused: [
        {
          keyword: "Responsible",
          frequency: 4,
          recommended: 2
        }
      ]
    };

    const mockSuggestions: OptimizationSuggestion[] = [
      {
        id: "1",
        type: "keyword",
        priority: "high",
        title: "Add Missing High-Priority Keywords",
        description: "Include React.js and TypeScript in your skills section",
        impact: 15,
        action: "Add keywords to skills",
        section: "Skills"
      },
      {
        id: "2",
        type: "content",
        priority: "high",
        title: "Quantify Your Achievements",
        description: "Add specific numbers and metrics to your accomplishments",
        impact: 12,
        action: "Add metrics to experience",
        section: "Experience"
      },
      {
        id: "3",
        type: "structure",
        priority: "medium",
        title: "Optimize Section Order",
        description: "Move Skills section higher for better ATS scanning",
        impact: 8,
        action: "Reorder sections"
      },
      {
        id: "4",
        type: "format",
        priority: "low",
        title: "Use Standard Section Headers",
        description: "Replace custom headers with ATS-friendly alternatives",
        impact: 5,
        action: "Update section headers"
      }
    ];

    setATSMetrics(mockMetrics);
    setKeywordAnalysis(mockKeywords);
    setSuggestions(mockSuggestions);
    setIsAnalyzing(false);
  };

  const applySuggestion = (suggestionId: string) => {
    setSuggestions(prev => 
      prev.map(s => 
        s.id === suggestionId 
          ? { ...s, isApplied: true }
          : s
      )
    );
    
    // Update ATS score based on applied suggestion
    const suggestion = suggestions.find(s => s.id === suggestionId);
    if (suggestion) {
      setATSMetrics(prev => ({
        ...prev,
        overallScore: Math.min(100, prev.overallScore + suggestion.impact)
      }));
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  if (isAnalyzing) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto" />
          <div>
            <h3 className="font-semibold text-lg">Analyzing Your CV</h3>
            <p className="text-muted-foreground">Checking ATS compatibility...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Simplified Header */}
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">ATS Optimization</h2>
            <p className="text-muted-foreground mt-1">
              {jobAnalysis ? "Optimized for your target job" : "Make your CV ATS-friendly"}
            </p>
          </div>
          
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(atsMetrics.overallScore)}`}>
              {atsMetrics.overallScore}%
            </div>
            <div className="text-sm text-muted-foreground">ATS Score</div>
          </div>
        </div>
      </div>

      {/* Simplified Navigation */}
      <div className="px-6 py-4 border-b">
        <div className="flex gap-2">
          {[
            { key: 'overview', label: 'Overview', icon: BarChart3 },
            { key: 'keywords', label: 'Keywords', icon: Search },
            { key: 'suggestions', label: 'Improve', icon: Lightbulb }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedView(key as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                selectedView === key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {selectedView === 'overview' && (
            <div className="space-y-8">
              {/* Score Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {keywordAnalysis.matched.length}
                  </div>
                  <div className="text-sm text-green-700">Keywords Matched</div>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {keywordAnalysis.missing.length}
                  </div>
                  <div className="text-sm text-red-700">Keywords Missing</div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Score Breakdown</h3>
                
                <div className="space-y-4">
                  {[
                    { label: 'Keywords', score: atsMetrics.keywordScore, description: 'Job-relevant terms' },
                    { label: 'Content', score: atsMetrics.contentScore, description: 'Quality and relevance' },
                    { label: 'Format', score: atsMetrics.formatScore, description: 'ATS-friendly structure' },
                    { label: 'Organization', score: atsMetrics.structureScore, description: 'Section layout' }
                  ].map(({ label, score, description }) => (
                    <div key={label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{label}</div>
                          <div className="text-sm text-muted-foreground">{description}</div>
                        </div>
                        <div className={cn("text-xl font-bold", getScoreColor(score))}>
                          {score}%
                        </div>
                      </div>
                      <Progress value={score} className="h-3" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvement Potential */}
              {suggestions.some(s => !s.isApplied) && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Improvement Potential</span>
                  </div>
                  <p className="text-blue-800">
                    Implement our suggestions to boost your score by up to{' '}
                    <span className="font-bold">
                      +{suggestions.reduce((acc, s) => acc + (s.isApplied ? 0 : s.impact), 0)} points
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {selectedView === 'keywords' && (
            <div className="space-y-6">
              {/* Matched Keywords */}
              {keywordAnalysis.matched.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-green-600 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Matched Keywords ({keywordAnalysis.matched.length})
                  </h3>
                  
                  <div className="grid gap-3">
                    {keywordAnalysis.matched.map((keyword, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {keyword.keyword}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {keyword.importance} priority
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Used {keyword.frequency}x in {keyword.sections.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {keywordAnalysis.missing.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    Missing Keywords ({keywordAnalysis.missing.length})
                  </h3>
                  
                  <div className="grid gap-3">
                    {keywordAnalysis.missing.map((keyword, index) => (
                      <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                              {keyword.keyword}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {keyword.importance} priority
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-red-900">How to add:</div>
                          {keyword.suggestions.map((suggestion, idx) => (
                            <div key={idx} className="text-sm text-red-700 flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Overused Keywords */}
              {keywordAnalysis.overused.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-yellow-600 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Overused Keywords ({keywordAnalysis.overused.length})
                  </h3>
                  
                  <div className="grid gap-3">
                    {keywordAnalysis.overused.map((keyword, index) => (
                      <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            {keyword.keyword}
                          </Badge>
                          <div className="text-sm text-yellow-700">
                            Used {keyword.frequency}x (recommended: {keyword.recommended}x)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedView === 'suggestions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Optimization Suggestions</h3>
              
              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={cn(
                      "p-4 border rounded-lg transition-all",
                      suggestion.isApplied 
                        ? "bg-green-50 border-green-200" 
                        : "bg-background border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge variant={getPriorityColor(suggestion.priority) as any}>
                            {suggestion.priority} priority
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            +{suggestion.impact} points
                          </span>
                        </div>
                        
                        <div>
                          <h4 className="font-medium">{suggestion.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        {suggestion.isApplied ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Applied</span>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => applySuggestion(suggestion.id)}
                            className="flex items-center gap-2"
                          >
                            <Zap className="h-4 w-4" />
                            Apply
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {suggestions.every(s => s.isApplied) && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">All Suggestions Applied!</h3>
                  <p className="text-muted-foreground">Your CV is now optimized for ATS systems.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
