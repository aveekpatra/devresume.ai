"use client";

import { useState } from "react";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import { Label } from "@v1/ui/label";
import { Textarea } from "@v1/ui/textarea";
import { Switch } from "@v1/ui/switch";
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  GripVertical,
  Building
} from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

interface ExperienceSectionProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export function ExperienceSection({ data, onChange }: ExperienceSectionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onChange([...data, newExperience]);
    setExpandedItems(new Set([...expandedItems, newExperience.id]));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(
      data.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
    const newExpanded = new Set(expandedItems);
    newExpanded.delete(id);
    setExpandedItems(newExpanded);
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const generateDescription = (experience: Experience) => {
    // TODO: Implement AI description generation
    const sampleDescriptions = [
      "• Led development of scalable web applications serving 100K+ users\n• Collaborated with cross-functional teams to deliver features on schedule\n• Implemented automated testing reducing bugs by 40%\n• Mentored junior developers and conducted code reviews",
      "• Managed customer relationships and increased client satisfaction by 25%\n• Developed and executed marketing campaigns resulting in 30% revenue growth\n• Analyzed market trends and provided strategic recommendations\n• Coordinated with sales team to exceed quarterly targets",
      "• Designed user-centered interfaces improving user engagement by 35%\n• Conducted user research and usability testing for product optimization\n• Created design systems and style guides for consistent branding\n• Collaborated with developers to ensure design implementation accuracy"
    ];
    
    const randomDescription = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
    updateExperience(experience.id, 'description', randomDescription);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Work Experience</h3>
          <p className="text-sm text-muted-foreground">
            Add your professional work history in reverse chronological order
          </p>
        </div>
        <Button onClick={addExperience} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {/* Experience Items */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
            <Building className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground mb-4">No work experience added yet</p>
            <Button onClick={addExperience} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Experience
            </Button>
          </div>
        ) : (
          data.map((experience) => {
            const isExpanded = expandedItems.has(experience.id);
            
            return (
              <div
                key={experience.id}
                className="border border-border rounded-lg bg-card"
              >
                {/* Experience Header */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <div className="flex-1">
                        {experience.position || experience.company ? (
                          <div>
                            <h4 className="font-medium">
                              {experience.position || "Position Title"}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {experience.company || "Company Name"}
                              {experience.location && ` • ${experience.location}`}
                            </p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">New Experience</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(experience.id)}
                      >
                        {isExpanded ? "Collapse" : "Expand"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(experience.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Experience Details */}
                {isExpanded && (
                  <div className="border-t border-border p-4 space-y-4">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`position-${experience.id}`}>Job Title *</Label>
                        <Input
                          id={`position-${experience.id}`}
                          placeholder="Software Engineer"
                          value={experience.position}
                          onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`company-${experience.id}`}>Company *</Label>
                        <Input
                          id={`company-${experience.id}`}
                          placeholder="Tech Company Inc."
                          value={experience.company}
                          onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`location-${experience.id}`}>Location</Label>
                        <Input
                          id={`location-${experience.id}`}
                          placeholder="San Francisco, CA"
                          value={experience.location}
                          onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Employment Period</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="month"
                            placeholder="Start Date"
                            value={experience.startDate}
                            onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                            className="flex-1"
                          />
                          <span className="text-muted-foreground">to</span>
                          <Input
                            type="month"
                            placeholder="End Date"
                            value={experience.endDate || ''}
                            onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                            disabled={experience.current}
                            className="flex-1"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`current-${experience.id}`}
                            checked={experience.current}
                            onCheckedChange={(checked) => {
                              updateExperience(experience.id, 'current', checked);
                              if (checked) {
                                updateExperience(experience.id, 'endDate', '');
                              }
                            }}
                          />
                          <Label htmlFor={`current-${experience.id}`} className="text-sm">
                            I currently work here
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`description-${experience.id}`}>
                          Description & Achievements
                        </Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generateDescription(experience)}
                          className="flex items-center gap-2"
                        >
                          <Sparkles className="h-4 w-4" />
                          AI Generate
                        </Button>
                      </div>
                      <Textarea
                        id={`description-${experience.id}`}
                        placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for better readability&#10;• Include quantifiable results when possible&#10;• Focus on impact and outcomes"
                        value={experience.description}
                        onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Use bullet points (•) for better formatting</span>
                        <span>{experience.description.length} characters</span>
                      </div>
                    </div>

                    {/* AI Suggestions */}
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-900 dark:text-amber-100">
                          AI Suggestions
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="text-xs justify-start">
                          📈 Add Metrics
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs justify-start">
                          🎯 Optimize for ATS
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs justify-start">
                          🏷️ Add Skills
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs justify-start">
                          ✨ Improve Language
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Tips */}
      {data.length > 0 && (
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
            💡 Tips for Work Experience
          </h4>
          <ul className="text-xs text-green-800 dark:text-green-200 space-y-1">
            <li>• Start each bullet point with a strong action verb</li>
            <li>• Include specific numbers and percentages when possible</li>
            <li>• Focus on achievements rather than just responsibilities</li>
            <li>• Tailor your experience to match the job you're applying for</li>
          </ul>
        </div>
      )}
    </div>
  );
} 