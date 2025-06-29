import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// Get CV by project ID
export const getByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Verify project access
    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== userId) {
      throw new Error("Project not found or access denied");
    }

    const cv = await ctx.db
      .query("cvs")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .first();

    return cv;
  },
});

// Get CV by ID
export const get = query({
  args: { cvId: v.id("cvs") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const cv = await ctx.db.get(args.cvId);
    if (!cv || cv.userId !== userId) {
      throw new Error("CV not found or access denied");
    }

    return cv;
  },
});

// Create a new CV
export const create = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    templateId: v.optional(v.string()),
    personalInfo: v.object({
      fullName: v.optional(v.string()),
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
      location: v.optional(v.string()),
      website: v.optional(v.string()),
      linkedin: v.optional(v.string()),
      summary: v.optional(v.string()),
    }),
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
    skills: v.array(v.object({
      id: v.string(),
      category: v.string(),
      items: v.array(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Verify project access
    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== userId) {
      throw new Error("Project not found or access denied");
    }

    const now = Date.now();
    const cvId = await ctx.db.insert("cvs", {
      projectId: args.projectId,
      userId,
      title: args.title,
      templateId: args.templateId,
      personalInfo: args.personalInfo,
      experience: args.experience,
      education: args.education,
      skills: args.skills,
      createdAt: now,
      updatedAt: now,
    });

    return cvId;
  },
});

// Update a CV
export const update = mutation({
  args: {
    cvId: v.id("cvs"),
    title: v.optional(v.string()),
    templateId: v.optional(v.string()),
    personalInfo: v.optional(v.object({
      fullName: v.optional(v.string()),
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
      location: v.optional(v.string()),
      website: v.optional(v.string()),
      linkedin: v.optional(v.string()),
      summary: v.optional(v.string()),
    })),
    experience: v.optional(v.array(v.object({
      id: v.string(),
      company: v.string(),
      position: v.string(),
      startDate: v.string(),
      endDate: v.optional(v.string()),
      current: v.boolean(),
      description: v.optional(v.string()),
      location: v.optional(v.string()),
    }))),
    education: v.optional(v.array(v.object({
      id: v.string(),
      institution: v.string(),
      degree: v.string(),
      field: v.optional(v.string()),
      startDate: v.string(),
      endDate: v.optional(v.string()),
      gpa: v.optional(v.string()),
      description: v.optional(v.string()),
    }))),
    skills: v.optional(v.array(v.object({
      id: v.string(),
      category: v.string(),
      items: v.array(v.string()),
    }))),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const cv = await ctx.db.get(args.cvId);
    if (!cv || cv.userId !== userId) {
      throw new Error("CV not found or access denied");
    }

    const updates: any = {
      updatedAt: Date.now(),
    };

    if (args.title !== undefined) updates.title = args.title;
    if (args.templateId !== undefined) updates.templateId = args.templateId;
    if (args.personalInfo !== undefined) updates.personalInfo = args.personalInfo;
    if (args.experience !== undefined) updates.experience = args.experience;
    if (args.education !== undefined) updates.education = args.education;
    if (args.skills !== undefined) updates.skills = args.skills;

    await ctx.db.patch(args.cvId, updates);
    return args.cvId;
  },
});

// Delete a CV
export const remove = mutation({
  args: { cvId: v.id("cvs") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const cv = await ctx.db.get(args.cvId);
    if (!cv || cv.userId !== userId) {
      throw new Error("CV not found or access denied");
    }

    await ctx.db.delete(args.cvId);
    return args.cvId;
  },
}); 