"use client";

import { useState } from "react";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import { Label } from "@v1/ui/label";
import { Badge } from "@v1/ui/badge";
import { 
  Plus, 
  X,
  Award,
  Code,
  Settings,
  Globe
} from "lucide-react";

interface Skills {
  technical: string[];
  frameworks: string[];
  tools: string[];
  languages: string[];
}

interface SkillsSectionProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

export function SkillsSection({ data, onChange }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState({
    technical: "",
    frameworks: "",
    tools: "",
    languages: ""
  });

  const addSkill = (category: keyof Skills) => {
    const skill = newSkill[category].trim();
    if (skill && !data[category].includes(skill)) {
      onChange({
        ...data,
        [category]: [...data[category], skill]
      });
      setNewSkill({ ...newSkill, [category]: "" });
    }
  };

  const removeSkill = (category: keyof Skills, skillToRemove: string) => {
    onChange({
      ...data,
      [category]: data[category].filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, category: keyof Skills) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category);
    }
  };

  const skillCategories = [
    {
      key: "technical" as keyof Skills,
      name: "Programming Languages",
      icon: Code,
      placeholder: "JavaScript, Python, TypeScript...",
      color: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
    },
    {
      key: "frameworks" as keyof Skills,
      name: "Frameworks & Libraries",
      icon: Settings,
      placeholder: "React, Node.js, Express...",
      color: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
    },
    {
      key: "tools" as keyof Skills,
      name: "Tools & Technologies",
      icon: Settings,
      placeholder: "Docker, AWS, Git...",
      color: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
    },
    {
      key: "languages" as keyof Skills,
      name: "Spoken Languages",
      icon: Globe,
      placeholder: "English, Spanish, French...",
      color: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Award className="h-5 w-5" />
          Skills & Technologies
        </h2>

        <div className="space-y-6">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.key} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>

                {/* Add new skill */}
                <div className="flex gap-2">
                  <Input
                    value={newSkill[category.key]}
                    onChange={(e) => setNewSkill({ ...newSkill, [category.key]: e.target.value })}
                    onKeyPress={(e) => handleKeyPress(e, category.key)}
                    placeholder={category.placeholder}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                  <Button
                    onClick={() => addSkill(category.key)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Display skills */}
                {data[category.key].length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {data[category.key].map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className={`${category.color} flex items-center gap-1`}
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(category.key, skill)}
                          className="ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 text-sm italic">
                    No {category.name.toLowerCase()} added yet
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Add Suggestions */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">
            💡 Popular Developer Skills
          </h4>
          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium text-blue-800 dark:text-blue-200">Frontend:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {["React", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      if (!data.frameworks.includes(skill)) {
                        onChange({ ...data, frameworks: [...data.frameworks, skill] });
                      }
                    }}
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-medium text-blue-800 dark:text-blue-200">Backend:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {["Node.js", "Python", "Java", "PostgreSQL", "MongoDB"].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      const category = skill === "PostgreSQL" || skill === "MongoDB" ? "tools" : 
                                     skill === "Python" || skill === "Java" ? "technical" : "frameworks";
                      if (!data[category].includes(skill)) {
                        onChange({ ...data, [category]: [...data[category], skill] });
                      }
                    }}
                    className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 