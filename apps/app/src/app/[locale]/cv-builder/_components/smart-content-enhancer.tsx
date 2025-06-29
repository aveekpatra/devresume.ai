"use client";

import { useState, useEffect } from "react";
import { Button } from "@v1/ui/button";
import { Badge } from "@v1/ui/badge";
import { Input } from "@v1/ui/input";
import { Textarea } from "@v1/ui/textarea";
import { ScrollArea } from "@v1/ui/scroll-area";
import { 
  Sparkles, 
  Wand2, 
  Target, 
  TrendingUp,
  CheckCircle,
  XCircle,
  RefreshCw,
  Copy,
  Edit3,
  Lightbulb,
  Zap,
  Brain,
  MessageSquare,
  ArrowRight,
  Plus,
  Minus
} from "lucide-react";
import { cn } from "@v1/ui/utils";

interface SmartContentEnhancerProps {
  cvData: any;
  jobAnalysis?: any;
  onCVUpdate: (cvData: any) => void;
  className?: string;
}

interface ContentSuggestion {
  id: string;
  type: 'enhancement' | 'alternative' | 'addition';
  content: string;
  reason: string;
  impact: 'high' | 'medium' | 'low';
  keywords: string[];
  isApplied?: boolean;
}

interface AIInsight {
  type: 'strength' | 'weakness' | 'opportunity';
  message: string;
  suggestion?: string;
}

export function SmartContentEnhancer({ 
  cvData, 
  jobAnalysis, 
  onCVUpdate, 
  className 
}: SmartContentEnhancerProps) {
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");

  useEffect(() => {
    if (cvData) {
      generateSuggestions();
    }
  }, [cvData, jobAnalysis]);

  const generateSuggestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock suggestions based on section and job analysis
    const mockSuggestions: ContentSuggestion[] = [];
    const mockInsights: AIInsight[] = [];

    // Generate suggestions based on CV content
    if (cvData?.personalInfo?.summary) {
      mockSuggestions.push({
        id: '1',
        type: 'enhancement',
        content: `Results-driven ${jobAnalysis?.jobTitle || 'professional'} with 5+ years of expertise in ${jobAnalysis?.keywordGaps?.slice(0, 3).join(', ') || 'key technologies'}. Proven track record of delivering scalable solutions that increased efficiency by 40% and reduced costs by $200K annually.`,
        reason: 'Added quantifiable achievements and industry-specific keywords',
        impact: 'high',
        keywords: jobAnalysis?.keywordGaps?.slice(0, 3) || ['leadership', 'innovation']
      });

      mockSuggestions.push({
        id: '2',
        type: 'alternative',
        content: `Innovative ${jobAnalysis?.jobTitle || 'professional'} passionate about leveraging ${jobAnalysis?.companyInsights?.techStack?.slice(0, 2).join(' and ') || 'cutting-edge technology'} to solve complex business challenges. Led cross-functional teams of 8+ members and delivered projects 25% ahead of schedule.`,
        reason: 'Emphasized leadership and company tech stack alignment',
        impact: 'medium',
        keywords: jobAnalysis?.companyInsights?.techStack?.slice(0, 2) || ['teamwork']
      });

      mockInsights.push({
        type: 'strength',
        message: 'Your summary mentions relevant experience length',
        suggestion: 'Consider adding specific metrics or achievements'
      });

      mockInsights.push({
        type: 'opportunity',
        message: `Missing key skills: ${jobAnalysis?.keywordGaps?.slice(0, 2).join(', ') || 'leadership, innovation'}`,
        suggestion: 'Incorporate these keywords naturally into your summary'
      });
    }
    
    if (cvData?.experience?.length > 0) {
      mockSuggestions.push({
        id: '3',
        type: 'enhancement',
        content: `• Architected and implemented microservices infrastructure using ${jobAnalysis?.companyInsights?.techStack?.join(', ') || 'modern technologies'}, resulting in 99.9% uptime and 50% faster deployment cycles\n• Led agile development team of 6 engineers, delivering 15+ features that increased user engagement by 35%\n• Optimized database queries and implemented caching strategies, reducing response times by 60% and supporting 2M+ daily active users`,
        reason: 'Added specific metrics, technologies, and quantifiable results',
        impact: 'high',
        keywords: jobAnalysis?.companyInsights?.techStack || ['leadership', 'optimization']
      });

      mockInsights.push({
        type: 'weakness',
        message: 'Experience descriptions lack quantifiable metrics',
        suggestion: 'Add numbers, percentages, and specific outcomes to each bullet point'
      });

      mockInsights.push({
        type: 'opportunity',
        message: 'Could emphasize leadership and mentoring experience',
        suggestion: 'Highlight team management and knowledge sharing activities'
      });
    }
    
    if (cvData?.skills?.length > 0) {
      const suggestedSkills = jobAnalysis?.keywordGaps || ['React.js', 'TypeScript', 'AWS', 'Docker'];
      mockSuggestions.push({
        id: '4',
        type: 'addition',
        content: suggestedSkills.join(', '),
        reason: 'These skills are mentioned in the target job description',
        impact: 'high',
        keywords: suggestedSkills
      });

      mockInsights.push({
        type: 'opportunity',
        message: `${suggestedSkills.length} high-priority skills missing from your profile`,
        suggestion: 'Add these skills if you have experience with them'
      });
    }

    setSuggestions(mockSuggestions);
    setInsights(mockInsights);
    setIsGenerating(false);
  };

  const applySuggestion = (suggestionId: string) => {
    const suggestion = suggestions.find(s => s.id === suggestionId);
    if (suggestion) {
      // Apply suggestion to appropriate CV section
      const updatedCVData = { ...cvData };
      
      if (suggestion.id === '1' || suggestion.id === '2') {
        // Summary suggestions
        updatedCVData.personalInfo = {
          ...updatedCVData.personalInfo,
          summary: suggestion.content
        };
      } else if (suggestion.id === '3') {
        // Experience suggestions - update first experience entry
        if (updatedCVData.experience?.length > 0) {
          updatedCVData.experience[0] = {
            ...updatedCVData.experience[0],
            description: suggestion.content
          };
        }
      } else if (suggestion.id === '4') {
        // Skills suggestions - add to first skills category or create new one
        if (!updatedCVData.skills) updatedCVData.skills = [];
        if (updatedCVData.skills.length === 0) {
          updatedCVData.skills.push({
            id: 'suggested',
            category: 'Technical Skills',
            items: suggestion.keywords
          });
        } else {
          updatedCVData.skills[0] = {
            ...updatedCVData.skills[0],
            items: [...new Set([...updatedCVData.skills[0].items, ...suggestion.keywords])]
          };
        }
      }
      
      onCVUpdate(updatedCVData);

      setSuggestions(prev => 
        prev.map(s => 
          s.id === suggestionId 
            ? { ...s, isApplied: true }
            : s
        )
      );
    }
  };

  const generateCustomContent = async () => {
    if (!customPrompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate custom AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const customSuggestion: ContentSuggestion = {
      id: `custom-${Date.now()}`,
      type: 'enhancement',
      content: `Enhanced content based on your request: "${customPrompt}". This would be generated by AI based on your specific requirements and the job context.`,
      reason: `Custom generation based on your prompt`,
      impact: 'medium',
      keywords: ['custom', 'tailored'],
    };

    setSuggestions(prev => [customSuggestion, ...prev]);
    setCustomPrompt("");
    setIsGenerating(false);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getImpactBadgeVariant = (impact: string) => {
    switch (impact) {
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'weakness': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'opportunity': return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn("h-full flex flex-col bg-background", className)}>
      {/* Simplified Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">AI Enhancement</h3>
            <p className="text-xs text-muted-foreground">
              Smart suggestions for better content
            </p>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={generateSuggestions}
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-3 w-3 border-2 border-primary border-t-transparent" />
            ) : (
              <RefreshCw className="h-3 w-3" />
            )}
            {isGenerating ? 'Analyzing...' : 'Refresh'}
          </Button>
        </div>

        {/* Simplified Custom Prompt */}
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="Ask AI to improve something specific..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="flex-1 text-sm"
          />
          <Button 
            onClick={generateCustomContent}
            disabled={isGenerating || !customPrompt.trim()}
            size="sm"
            variant="secondary"
          >
            <Wand2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {isGenerating && suggestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
              <div className="text-center">
                <h4 className="font-medium">Analyzing Content</h4>
                <p className="text-sm text-muted-foreground">
                  Generating personalized suggestions...
                </p>
              </div>
            </div>
          ) : suggestions.length === 0 ? (
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h4 className="font-medium mb-2">Ready to Enhance</h4>
              <p className="text-sm text-muted-foreground">
                Add content to get AI-powered suggestions
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">Suggestions</h4>
                <Badge variant="outline" className="text-xs">
                  {suggestions.filter(s => !s.isApplied).length} available
                </Badge>
              </div>

              {suggestions.map((suggestion) => (
                <div 
                  key={suggestion.id}
                  className={cn(
                    "p-3 border rounded-lg transition-all",
                    suggestion.isApplied 
                      ? "bg-green-50 border-green-200" 
                      : "bg-background hover:border-primary/50"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={suggestion.impact === 'high' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {suggestion.impact}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {suggestion.type}
                        </Badge>
                      </div>

                      {suggestion.isApplied ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          <span className="text-xs font-medium">Applied</span>
                        </div>
                      ) : (
                        <div className="flex gap-1">
                          <Button 
                            size="sm"
                            variant="ghost"
                            onClick={() => navigator.clipboard.writeText(suggestion.content)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => applySuggestion(suggestion.id)}
                            className="h-6 px-2 text-xs"
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            Apply
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        {suggestion.reason}
                      </p>
                      
                      <div className="p-2 bg-muted/50 rounded text-xs">
                        {suggestion.content}
                      </div>

                      {suggestion.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {suggestion.keywords.map((keyword, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AI Insights */}
          {insights.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-medium text-sm">AI Insights</h4>
              {insights.map((insight, index) => (
                <div key={index} className="flex gap-2 p-3 bg-muted/30 rounded-lg">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <p className="text-sm">{insight.message}</p>
                    {insight.suggestion && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {insight.suggestion}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
} 