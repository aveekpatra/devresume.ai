"use client";

import { useState } from "react";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import { Label } from "@v1/ui/label";
import { Textarea } from "@v1/ui/textarea";
import { 
  Plus, 
  Trash2, 
  GripVertical,
  GraduationCap
} from "lucide-react";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  description?: string;
}

interface EducationSectionProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export function EducationSection({ data, onChange }: EducationSectionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    };
    onChange([...data, newEducation]);
    setExpandedItems(new Set([...expandedItems, newEducation.id]));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Education</h3>
          <p className="text-sm text-muted-foreground">
            Add your educational background and qualifications
          </p>
        </div>
        <Button onClick={addEducation} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {/* Education Items */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
            <GraduationCap className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground mb-4">No education added yet</p>
            <Button onClick={addEducation} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Your Education
            </Button>
          </div>
        ) : (
          data.map((education) => {
            const isExpanded = expandedItems.has(education.id);
            
            return (
              <div
                key={education.id}
                className="border border-border rounded-lg bg-card"
              >
                {/* Education Header */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      <div className="flex-1">
                        {education.degree || education.institution ? (
                          <div>
                            <h4 className="font-medium">
                              {education.degree || "Degree"}
                              {education.field && ` in ${education.field}`}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {education.institution || "Institution"}
                            </p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">New Education</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(education.id)}
                      >
                        {isExpanded ? "Collapse" : "Expand"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(education.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Education Details */}
                {isExpanded && (
                  <div className="border-t border-border p-4 space-y-4">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`institution-${education.id}`}>Institution *</Label>
                        <Input
                          id={`institution-${education.id}`}
                          placeholder="University of California"
                          value={education.institution}
                          onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
                        <Input
                          id={`degree-${education.id}`}
                          placeholder="Bachelor of Science"
                          value={education.degree}
                          onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
                        <Input
                          id={`field-${education.id}`}
                          placeholder="Computer Science"
                          value={education.field || ''}
                          onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
                        <Input
                          id={`gpa-${education.id}`}
                          placeholder="3.8/4.0"
                          value={education.gpa || ''}
                          onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={education.startDate}
                          onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          value={education.endDate || ''}
                          onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                      <Label htmlFor={`description-${education.id}`}>
                        Additional Details (Optional)
                      </Label>
                      <Textarea
                        id={`description-${education.id}`}
                        placeholder="Relevant coursework, honors, activities, or achievements..."
                        value={education.description || ''}
                        onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
                        rows={3}
                        className="resize-none"
                      />
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
        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-2">
            💡 Tips for Education
          </h4>
          <ul className="text-xs text-purple-800 dark:text-purple-200 space-y-1">
            <li>• List your most recent or highest degree first</li>
            <li>• Include GPA only if it's 3.5 or higher</li>
            <li>• Mention relevant coursework for entry-level positions</li>
            <li>• Include honors, awards, and relevant activities</li>
          </ul>
        </div>
      )}
    </div>
  );
} 