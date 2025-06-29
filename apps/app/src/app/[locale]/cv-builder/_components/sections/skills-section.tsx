"use client";

import { useState } from "react";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import { Label } from "@v1/ui/label";
import { Badge } from "@v1/ui/badge";
import { 
  Plus, 
  Trash2, 
  X,
  Award,
  Sparkles
} from "lucide-react";

interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

interface SkillsSectionProps {
  data: SkillCategory[];
  onChange: (data: SkillCategory[]) => void;
}

const SUGGESTED_CATEGORIES = [
  "Programming Languages",
  "Frameworks & Libraries",
  "Databases",
  "Tools & Technologies",
  "Soft Skills",
  "Languages",
  "Certifications"
];

const SUGGESTED_SKILLS = {
  "Programming Languages": ["JavaScript", "Python", "Java", "TypeScript", "C++", "Go", "Rust"],
  "Frameworks & Libraries": ["React", "Node.js", "Express", "Next.js", "Vue.js", "Angular", "Django"],
  "Databases": ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite", "Firebase"],
  "Tools & Technologies": ["Git", "Docker", "AWS", "Kubernetes", "Jenkins", "Webpack"],
  "Soft Skills": ["Leadership", "Communication", "Problem Solving", "Team Collaboration", "Project Management"],
  "Languages": ["English (Native)", "Spanish (Fluent)", "French (Conversational)", "German (Basic)"],
  "Certifications": ["AWS Certified", "Google Cloud Professional", "Scrum Master", "PMP"]
};

export function SkillsSection({ data, onChange }: SkillsSectionProps) {
  const [newSkillInputs, setNewSkillInputs] = useState<Record<string, string>>({});

  const addSkillCategory = (categoryName?: string) => {
    const newCategory: SkillCategory = {
      id: Date.now().toString(),
      category: categoryName || "",
      items: [],
    };
    onChange([...data, newCategory]);
  };

  const updateCategory = (id: string, field: keyof SkillCategory, value: any) => {
    onChange(
      data.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    );
  };

  const removeCategory = (id: string) => {
    onChange(data.filter((cat) => cat.id !== id));
  };

  const addSkill = (categoryId: string, skill: string) => {
    if (!skill.trim()) return;
    
    const category = data.find(cat => cat.id === categoryId);
    if (!category || category.items.includes(skill.trim())) return;

    updateCategory(categoryId, 'items', [...category.items, skill.trim()]);
    setNewSkillInputs({ ...newSkillInputs, [categoryId]: '' });
  };

  const removeSkill = (categoryId: string, skillIndex: number) => {
    const category = data.find(cat => cat.id === categoryId);
    if (!category) return;

    const newItems = category.items.filter((_, index) => index !== skillIndex);
    updateCategory(categoryId, 'items', newItems);
  };

  const addSuggestedSkill = (categoryId: string, skill: string) => {
    addSkill(categoryId, skill);
  };

  const generateSkills = () => {
    // TODO: Implement AI skill generation
    const techSkills: SkillCategory = {
      id: Date.now().toString(),
      category: "Technical Skills",
      items: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "AWS"]
    };
    
    const softSkills: SkillCategory = {
      id: (Date.now() + 1).toString(),
      category: "Soft Skills", 
      items: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"]
    };
    
    onChange([...data, techSkills, softSkills]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Skills</h3>
          <p className="text-sm text-muted-foreground">
            Organize your skills into categories to highlight your expertise
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={generateSkills}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            AI Generate
          </Button>
          <Button onClick={() => addSkillCategory()} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Quick Add Categories */}
      {data.length === 0 && (
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-3">Quick Start - Add Common Categories:</h4>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => addSkillCategory(category)}
                className="text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Skill Categories */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
            <Award className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground mb-4">No skills added yet</p>
            <Button onClick={() => addSkillCategory()} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Skill Category
            </Button>
          </div>
        ) : (
          data.map((category) => (
            <div
              key={category.id}
              className="border border-border rounded-lg bg-card p-4"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1 mr-4">
                  <Input
                    placeholder="Category name (e.g., Programming Languages)"
                    value={category.category}
                    onChange={(e) => updateCategory(category.id, 'category', e.target.value)}
                    className="font-medium"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCategory(category.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                {/* Current Skills */}
                {category.items.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 pr-1"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(category.id, index)}
                          className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Add New Skill */}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkillInputs[category.id] || ''}
                    onChange={(e) => setNewSkillInputs({ 
                      ...newSkillInputs, 
                      [category.id]: e.target.value 
                    })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill(category.id, newSkillInputs[category.id] || '');
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => addSkill(category.id, newSkillInputs[category.id] || '')}
                    disabled={!newSkillInputs[category.id]?.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Suggested Skills */}
                {SUGGESTED_SKILLS[category.category as keyof typeof SUGGESTED_SKILLS] && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Suggested skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {SUGGESTED_SKILLS[category.category as keyof typeof SUGGESTED_SKILLS]
                        .filter(skill => !category.items.includes(skill))
                        .slice(0, 8)
                        .map((skill) => (
                          <Button
                            key={skill}
                            variant="outline"
                            size="sm"
                            onClick={() => addSuggestedSkill(category.id, skill)}
                            className="text-xs h-6 px-2"
                          >
                            <Plus className="h-2 w-2 mr-1" />
                            {skill}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tips */}
      {data.length > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-indigo-900 dark:text-indigo-100 mb-2">
            💡 Tips for Skills
          </h4>
          <ul className="text-xs text-indigo-800 dark:text-indigo-200 space-y-1">
            <li>• Group related skills into logical categories</li>
            <li>• List skills in order of proficiency (strongest first)</li>
            <li>• Include both technical and soft skills</li>
            <li>• Be honest about your skill level</li>
            <li>• Tailor skills to match job requirements</li>
          </ul>
        </div>
      )}
    </div>
  );
} 