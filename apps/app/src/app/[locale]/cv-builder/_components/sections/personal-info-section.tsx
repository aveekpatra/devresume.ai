"use client";

import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import { Label } from "@v1/ui/label";
import { Textarea } from "@v1/ui/textarea";
import { Upload, Sparkles, User } from "lucide-react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

interface PersonalInfoSectionProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoSection({ data, onChange }: PersonalInfoSectionProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>
        
        {/* Profile Photo */}
        <div className="flex items-start gap-6 mb-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              <Upload className="h-3 w-3 mr-1" />
              Upload Photo
            </Button>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300">Full Name</Label>
            <Input
              id="fullName"
              value={data.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="John Doe"
              className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@example.com"
              className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone</Label>
            <Input
              id="phone"
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">Location</Label>
            <Input
              id="location"
              value={data.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="New York, NY"
              className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Developer-specific Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Professional Links</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="website" className="text-gray-700 dark:text-gray-300">Website</Label>
              <Input
                id="website"
                value={data.website || ""}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://johndoe.com"
                className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="portfolio" className="text-gray-700 dark:text-gray-300">Portfolio</Label>
              <Input
                id="portfolio"
                value={data.portfolio || ""}
                onChange={(e) => handleChange("portfolio", e.target.value)}
                placeholder="https://portfolio.johndoe.com"
                className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="linkedin" className="text-gray-700 dark:text-gray-300">LinkedIn</Label>
              <Input
                id="linkedin"
                value={data.linkedin || ""}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/johndoe"
                className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="github" className="text-gray-700 dark:text-gray-300">GitHub</Label>
              <Input
                id="github"
                value={data.github || ""}
                onChange={(e) => handleChange("github", e.target.value)}
                placeholder="https://github.com/johndoe"
                className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 