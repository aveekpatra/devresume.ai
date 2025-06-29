import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// Get all projects for the current user
export const getUserProjects = query({
  args: {
    status: v.optional(v.union(v.literal("draft"), v.literal("active"), v.literal("archived"))),
    search: v.optional(v.string()),
    sortBy: v.optional(v.union(v.literal("createdAt"), v.literal("updatedAt"), v.literal("title"))),
    sortOrder: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    let query = ctx.db.query("projects").withIndex("by_user", (q) => q.eq("userId", userId));

    // Filter by status if provided
    if (args.status) {
      query = ctx.db.query("projects").withIndex("by_user_status", (q) => 
        q.eq("userId", userId).eq("status", args.status!)
      );
    }

    let projects = await query.collect();

    // Search filter
    if (args.search) {
      const searchLower = args.search.toLowerCase();
      projects = projects.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        (project.description && project.description.toLowerCase().includes(searchLower))
      );
    }

    // Sort projects
    const sortBy = args.sortBy || "updatedAt";
    const sortOrder = args.sortOrder || "desc";
    
    projects.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === "title") {
        aValue = (aValue as string).toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    // Get counts for each project
    const projectsWithCounts = await Promise.all(
      projects.map(async (project) => {
        const cvCount = await ctx.db
          .query("cvs")
          .withIndex("by_project", (q) => q.eq("projectId", project._id))
          .collect()
          .then(cvs => cvs.length);
        
        const coverLetterCount = await ctx.db
          .query("coverLetters")
          .withIndex("by_project", (q) => q.eq("projectId", project._id))
          .collect()
          .then(letters => letters.length);

        return {
          ...project,
          cvCount,
          coverLetterCount,
        };
      })
    );

    return projectsWithCounts;
  },
});

// Get a single project by ID
export const getProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== userId) {
      throw new Error("Project not found or access denied");
    }

    return project;
  },
});

// Create a new project
export const createProject = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const now = Date.now();
    const projectId = await ctx.db.insert("projects", {
      title: args.title,
      description: args.description,
      userId,
      createdAt: now,
      updatedAt: now,
      status: "draft",
      color: args.color,
    });

    return projectId;
  },
});

// Update a project
export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(v.union(v.literal("draft"), v.literal("active"), v.literal("archived"))),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== userId) {
      throw new Error("Project not found or access denied");
    }

    const updates: any = {
      updatedAt: Date.now(),
    };

    if (args.title !== undefined) updates.title = args.title;
    if (args.description !== undefined) updates.description = args.description;
    if (args.status !== undefined) updates.status = args.status;
    if (args.color !== undefined) updates.color = args.color;

    await ctx.db.patch(args.projectId, updates);
    return args.projectId;
  },
});

// Delete a project and all associated CVs and cover letters
export const deleteProject = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== userId) {
      throw new Error("Project not found or access denied");
    }

    // Delete all CVs in this project
    const cvs = await ctx.db
      .query("cvs")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    
    for (const cv of cvs) {
      await ctx.db.delete(cv._id);
    }

    // Delete all cover letters in this project
    const coverLetters = await ctx.db
      .query("coverLetters")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
    
    for (const coverLetter of coverLetters) {
      await ctx.db.delete(coverLetter._id);
    }

    // Delete the project
    await ctx.db.delete(args.projectId);
    return args.projectId;
  },
}); 