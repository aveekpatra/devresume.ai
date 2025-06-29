import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  users: defineTable({
    // Convex Auth fields
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),

    // custom fields
    username: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
  }).index("email", ["email"]),

  projects: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    userId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
    status: v.union(v.literal("draft"), v.literal("active"), v.literal("archived")),
    color: v.optional(v.string()), // For visual organization
  })
    .index("by_user", ["userId"])
    .index("by_user_status", ["userId", "status"])
    .index("by_created", ["createdAt"]),

  cvs: defineTable({
    projectId: v.id("projects"),
    userId: v.id("users"),
    title: v.string(),
    templateId: v.optional(v.string()),
    
    // Personal Information
    personalInfo: v.object({
      fullName: v.optional(v.string()),
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
      location: v.optional(v.string()),
      website: v.optional(v.string()),
      linkedin: v.optional(v.string()),
      summary: v.optional(v.string()),
    }),

    // Experience
    experience: v.array(v.object({
      id: v.string(),
      company: v.string(),
      position: v.string(),
      startDate: v.string(),
      endDate: v.optional(v.string()),
      current: v.boolean(),
      description: v.optional(v.string()),
      location: v.optional(v.string()),
    })),

    // Education
    education: v.array(v.object({
      id: v.string(),
      institution: v.string(),
      degree: v.string(),
      field: v.optional(v.string()),
      startDate: v.string(),
      endDate: v.optional(v.string()),
      gpa: v.optional(v.string()),
      description: v.optional(v.string()),
    })),

    // Skills
    skills: v.array(v.object({
      id: v.string(),
      category: v.string(),
      items: v.array(v.string()),
    })),

    // Additional sections
    certifications: v.optional(v.array(v.object({
      id: v.string(),
      name: v.string(),
      issuer: v.string(),
      date: v.string(),
      url: v.optional(v.string()),
    }))),

    projects: v.optional(v.array(v.object({
      id: v.string(),
      name: v.string(),
      description: v.string(),
      technologies: v.array(v.string()),
      url: v.optional(v.string()),
      github: v.optional(v.string()),
    }))),

    languages: v.optional(v.array(v.object({
      id: v.string(),
      language: v.string(),
      proficiency: v.string(),
    }))),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"]),

  coverLetters: defineTable({
    projectId: v.id("projects"),
    userId: v.id("users"),
    title: v.string(),
    companyName: v.optional(v.string()),
    positionTitle: v.optional(v.string()),
    content: v.string(),
    jobDescription: v.optional(v.string()), // For AI optimization
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"]),

  templates: defineTable({
    name: v.string(),
    category: v.string(),
    description: v.optional(v.string()),
    isPremium: v.boolean(),
    previewImage: v.optional(v.string()),
    config: v.object({
      colors: v.object({
        primary: v.string(),
        secondary: v.string(),
        text: v.string(),
      }),
      fonts: v.object({
        heading: v.string(),
        body: v.string(),
      }),
      layout: v.string(),
    }),
    createdAt: v.number(),
  }).index("by_category", ["category"]),
});
