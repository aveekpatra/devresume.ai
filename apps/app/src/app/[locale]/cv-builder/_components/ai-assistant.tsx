"use client";

import { useState } from "react";
import { Button } from "@v1/ui/button";
import { Badge } from "@v1/ui/badge";
import { Progress } from "@v1/ui/progress";
import { 
  Sparkles, 
  X, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Target,
  Lightbulb,
  Zap
} from "lucide-react";

interface AIAssistantProps {
  cvData: any;
  activeSection: string;
  onSuggestionApply: (suggestion: any) => void;
  onClose: () => void;
}

interface Suggestion {
  id: string;
  type: 'content' | 'improvement' | 'optimization';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  section: string;
  action: string;
}

export function AIAssistant({ cvData, activeSection, onSuggestionApply, onClose }: AIAssistantProps) {
  const [atsScore] = useState(82);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  // Mock suggestions based on active section
  const getSuggestions = (): Suggestion[] => {
    const suggestions: Suggestion[] = [];
    
    if (activeSection === 'personal') {
      if (!cvData.personalInfo.summary || cvData.personalInfo.summary.length < 100) {
        suggestions.push({
          id: '1',
          type: 'content',
          title: 'Enhance Professional Summary',
          description: 'Your summary could be more compelling. Add specific achievements and skills.',
          impact: 'high',
          section: 'personal',
          action: 'Generate improved summary'
        });
      }
    }
    
    if (activeSection === 'experience') {
      suggestions.push({
        id: '2',
        type: 'optimization',
        title: 'Add Quantifiable Achievements',
        description: 'Include specific numbers and metrics to demonstrate your impact.',
        impact: 'high',
        section: 'experience',
        action: 'Add metrics to descriptions'
      });
      
      suggestions.push({
        id: '3',
        type: 'improvement',
        title: 'Strengthen Action Verbs',
        description: 'Use more powerful action verbs to start your bullet points.',
        impact: 'medium',
        section: 'experience',
        action: 'Improve language'
      });
    }
    
    // General suggestions
    suggestions.push({
      id: '4',
      type: 'optimization',
      title: 'Optimize for ATS',
      description: 'Add more industry-relevant keywords to improve ATS compatibility.',
      impact: 'high',
      section: 'general',
      action: 'Add keywords'
    });
    
    return suggestions;
  };

  const suggestions = getSuggestions();

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return <AlertCircle className="h-4 w-4" />;
      case 'medium': return <TrendingUp className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const handleOptimize = async () => {
    setIsOptimizing(true);
    // Simulate AI optimization
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsOptimizing(false);
  };

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">AI Assistant</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* ATS Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">ATS Optimization Score</h4>
            <Badge variant={atsScore >= 80 ? "default" : atsScore >= 60 ? "secondary" : "destructive"}>
              {atsScore}/100
            </Badge>
          </div>
          
          <Progress value={atsScore} className="h-2" />
          
          <div className="text-sm text-muted-foreground">
            {atsScore >= 80 ? (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                Excellent ATS compatibility
              </div>
            ) : atsScore >= 60 ? (
              <div className="flex items-center gap-1 text-yellow-600">
                <AlertCircle className="h-4 w-4" />
                Good, but room for improvement
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600">
                <AlertCircle className="h-4 w-4" />
                Needs optimization
              </div>
            )}
          </div>

          <Button 
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="w-full"
            size="sm"
          >
            {isOptimizing ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Target className="h-4 w-4 mr-2" />
                Optimize for ATS
              </>
            )}
          </Button>
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">
            Suggestions for {activeSection === 'personal' ? 'Personal Info' : 
                           activeSection === 'experience' ? 'Experience' :
                           activeSection === 'education' ? 'Education' :
                           activeSection === 'skills' ? 'Skills' : 'Your CV'}
          </h4>
          
          {suggestions.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm">This section looks great!</p>
              <p className="text-xs">No suggestions at the moment.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={`border rounded-lg p-3 ${getImpactColor(suggestion.impact)}`}
                >
                  <div className="flex items-start gap-2">
                    {getImpactIcon(suggestion.impact)}
                    <div className="flex-1 space-y-2">
                      <div>
                        <h5 className="font-medium text-sm">{suggestion.title}</h5>
                        <p className="text-xs opacity-80">{suggestion.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {suggestion.impact.toUpperCase()} IMPACT
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onSuggestionApply(suggestion)}
                          className="h-6 px-2 text-xs"
                        >
                          {suggestion.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Quick Actions</h4>
          
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Content
            </Button>
            
            <Button variant="outline" size="sm" className="justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Improve Language
            </Button>
            
            <Button variant="outline" size="sm" className="justify-start">
              <Target className="h-4 w-4 mr-2" />
              Add Keywords
            </Button>
            
            <Button variant="outline" size="sm" className="justify-start">
              <CheckCircle className="h-4 w-4 mr-2" />
              Check Grammar
            </Button>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Pro Tip
            </span>
          </div>
          <p className="text-xs text-blue-800 dark:text-blue-200">
            {activeSection === 'personal' && "A strong professional summary is your elevator pitch. Keep it concise but impactful."}
            {activeSection === 'experience' && "Use the STAR method (Situation, Task, Action, Result) to structure your achievements."}
            {activeSection === 'education' && "Include relevant coursework and projects if you're a recent graduate."}
            {activeSection === 'skills' && "Organize skills by category and list them in order of proficiency."}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">
            AI suggestions update in real-time as you edit
          </p>
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </div>
  );
} 