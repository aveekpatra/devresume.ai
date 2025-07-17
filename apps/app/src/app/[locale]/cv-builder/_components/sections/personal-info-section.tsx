"use client";

import { Button } from "@v1/ui/button"
import { Input } from "@v1/ui/input"
import { Label } from "@v1/ui/label"
import { Separator } from "@v1/ui/separator"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  ExternalLink, 
  Globe 
} from "lucide-react"
import { CVSectionProps } from "../types"

export function PersonalInfoSection({ cvData, setCvData }: CVSectionProps) {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">
              Full Name
            </Label>
            <Input
              id="name"
              value={cvData.personalInfo.name}
              onChange={(e) => setCvData({
                ...cvData,
                personalInfo: { ...cvData.personalInfo, name: e.target.value }
              })}
              placeholder="John Doe"
              className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-slate-700">
              Professional Title
            </Label>
            <Input
              id="title"
              value={cvData.personalInfo.title}
              onChange={(e) => setCvData({
                ...cvData,
                personalInfo: { ...cvData.personalInfo, title: e.target.value }
              })}
              placeholder="Software Engineer"
              className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center gap-1">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={cvData.personalInfo.email}
              onChange={(e) => setCvData({
                ...cvData,
                personalInfo: { ...cvData.personalInfo, email: e.target.value }
              })}
              placeholder="john@example.com"
              className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-slate-700 flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={cvData.personalInfo.phone}
              onChange={(e) => setCvData({
                ...cvData,
                personalInfo: { ...cvData.personalInfo, phone: e.target.value }
              })}
              placeholder="+1 (555) 123-4567"
              className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-slate-700 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            Location
          </Label>
          <Input
            id="location"
            value={cvData.personalInfo.location}
            onChange={(e) => setCvData({
              ...cvData,
              personalInfo: { ...cvData.personalInfo, location: e.target.value }
            })}
            placeholder="San Francisco, CA"
            className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <Separator className="my-6" />

        <div>
          <h3 className="text-lg font-medium text-slate-900 mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={cvData.personalInfo.linkedin}
                onChange={(e) => setCvData({
                  ...cvData,
                  personalInfo: { ...cvData.personalInfo, linkedin: e.target.value }
                })}
                placeholder="linkedin.com/in/johndoe"
                className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                <Github className="w-4 h-4" />
                GitHub
              </Label>
              <Input
                id="github"
                value={cvData.personalInfo.github}
                onChange={(e) => setCvData({
                  ...cvData,
                  personalInfo: { ...cvData.personalInfo, github: e.target.value }
                })}
                placeholder="github.com/johndoe"
                className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                <ExternalLink className="w-4 h-4" />
                Portfolio
              </Label>
              <Input
                id="portfolio"
                value={cvData.personalInfo.portfolio}
                onChange={(e) => setCvData({
                  ...cvData,
                  personalInfo: { ...cvData.personalInfo, portfolio: e.target.value }
                })}
                placeholder="johndoe.com"
                className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium text-slate-700 flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Website
              </Label>
              <Input
                id="website"
                value={cvData.personalInfo.website}
                onChange={(e) => setCvData({
                  ...cvData,
                  personalInfo: { ...cvData.personalInfo, website: e.target.value }
                })}
                placeholder="johndoe.dev"
                className="h-11 bg-white border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 