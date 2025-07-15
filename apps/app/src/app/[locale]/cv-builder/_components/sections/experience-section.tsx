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
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(
      data.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Building className="h-5 w-5" />
            Work Experience
          </h2>
          <Button
            onClick={addExperience}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">No work experience added yet</p>
            <Button onClick={addExperience} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Experience
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((experience, index) => (
              <div key={experience.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Experience {index + 1}
                  </h3>
                  <Button
                    onClick={() => removeExperience(experience.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Company</Label>
                    <Input
                      value={experience.company}
                      onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                      placeholder="Company Name"
                      className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Position</Label>
                    <Input
                      value={experience.position}
                      onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                      placeholder="Job Title"
                      className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Location</Label>
                    <Input
                      value={experience.location}
                      onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                      placeholder="City, State"
                      className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300">Start Date</Label>
                    <Input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                      className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={experience.current}
                      onCheckedChange={(checked) => updateExperience(experience.id, "current", checked)}
                    />
                    <Label className="text-sm text-gray-700 dark:text-gray-300">Currently working here</Label>
                  </div>
                  
                  {!experience.current && (
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300">End Date</Label>
                      <Input
                        type="month"
                        value={experience.endDate || ""}
                        onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                        className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-gray-700 dark:text-gray-300">Description</Label>
                  <Textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                    className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 