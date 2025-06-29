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
  summary: string;
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

  const generateSummary = () => {
    // TODO: Implement AI summary generation
    const sampleSummary = "Experienced software engineer with 5+ years of expertise in full-stack development. Proven track record of delivering scalable web applications and leading cross-functional teams. Passionate about clean code, user experience, and continuous learning.";
    handleChange('summary', sampleSummary);
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo Section */}
      <div className="flex items-start gap-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-24 h-24 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center hover:bg-muted/80 transition-colors">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            <Upload className="h-3 w-3 mr-1" />
            Upload Photo
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Optional but recommended
          </p>
        </div>

        {/* Basic Information */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@email.com"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="San Francisco, CA"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://johndoe.com"
              value={data.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/johndoe"
              value={data.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="summary">Professional Summary</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={generateSummary}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            AI Generate
          </Button>
        </div>
        <Textarea
          id="summary"
          placeholder="Write a compelling professional summary that highlights your key strengths, experience, and career objectives. This should be 2-3 sentences that give employers a quick overview of what you bring to the table."
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          rows={4}
          className="resize-none"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {data.summary.length} characters
          </span>
          <span>
            Recommended: 150-300 characters
          </span>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Tips for Personal Information
        </h4>
        <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Use a professional email address</li>
          <li>• Include your city and state/country</li>
          <li>• Make your summary specific and achievement-focused</li>
          <li>• Keep contact information up-to-date</li>
        </ul>
      </div>
    </div>
  );
} 