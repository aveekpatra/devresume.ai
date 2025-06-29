import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// Get all templates
export const list = query({
  args: { 
    category: v.optional(v.string()),
    isPremium: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let templates;
    
    if (args.category) {
      templates = await ctx.db
        .query("templates")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
    } else {
      templates = await ctx.db.query("templates").collect();
    }
    
    if (args.isPremium !== undefined) {
      templates = templates.filter(template => template.isPremium === args.isPremium);
    }
    
    return templates.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get template by ID
export const get = query({
  args: { templateId: v.id("templates") },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);
    if (!template) {
      throw new Error("Template not found");
    }
    return template;
  },
});

// Create a new template (admin only for now)
export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    // TODO: Add admin check when user roles are implemented
    
    const now = Date.now();
    const templateId = await ctx.db.insert("templates", {
      name: args.name,
      category: args.category,
      description: args.description,
      isPremium: args.isPremium,
      previewImage: args.previewImage,
      config: args.config,
      createdAt: now,
    });

    return templateId;
  },
});

// Update template (admin only for now)
export const update = mutation({
  args: {
    templateId: v.id("templates"),
    name: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    isPremium: v.optional(v.boolean()),
    previewImage: v.optional(v.string()),
    config: v.optional(v.object({
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
    })),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin check when user roles are implemented
    
    const template = await ctx.db.get(args.templateId);
    if (!template) {
      throw new Error("Template not found");
    }

    const updates: any = {};
    if (args.name !== undefined) updates.name = args.name;
    if (args.category !== undefined) updates.category = args.category;
    if (args.description !== undefined) updates.description = args.description;
    if (args.isPremium !== undefined) updates.isPremium = args.isPremium;
    if (args.previewImage !== undefined) updates.previewImage = args.previewImage;
    if (args.config !== undefined) updates.config = args.config;

    await ctx.db.patch(args.templateId, updates);
    return args.templateId;
  },
});

// Delete template (admin only for now)
export const remove = mutation({
  args: { templateId: v.id("templates") },
  handler: async (ctx, args) => {
    // TODO: Add admin check when user roles are implemented
    
    const template = await ctx.db.get(args.templateId);
    if (!template) {
      throw new Error("Template not found");
    }

    await ctx.db.delete(args.templateId);
    return args.templateId;
  },
});

// Seed initial templates (for development)
export const seedTemplates = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if templates already exist
    const existingTemplates = await ctx.db.query("templates").collect();
    if (existingTemplates.length > 0) {
      return { message: "Templates already exist" };
    }

    const defaultTemplates = [
      {
        name: "Modern Professional",
        category: "professional",
        description: "Clean, modern design perfect for corporate roles",
        isPremium: false,
        config: {
          colors: {
            primary: "#2563eb",
            secondary: "#64748b",
            text: "#1e293b",
          },
          fonts: {
            heading: "Inter",
            body: "Inter",
          },
          layout: "single-column",
        },
      },
      {
        name: "Creative Designer",
        category: "creative",
        description: "Bold, creative layout for design professionals",
        isPremium: true,
        config: {
          colors: {
            primary: "#7c3aed",
            secondary: "#a855f7",
            text: "#374151",
          },
          fonts: {
            heading: "Poppins",
            body: "Inter",
          },
          layout: "two-column",
        },
      },
      {
        name: "Technical Engineer",
        category: "technical",
        description: "Structured format ideal for engineering roles",
        isPremium: false,
        config: {
          colors: {
            primary: "#059669",
            secondary: "#6b7280",
            text: "#111827",
          },
          fonts: {
            heading: "JetBrains Mono",
            body: "Inter",
          },
          layout: "single-column",
        },
      },
      {
        name: "Academic Research",
        category: "academic",
        description: "Traditional format for academic and research positions",
        isPremium: true,
        config: {
          colors: {
            primary: "#dc2626",
            secondary: "#9ca3af",
            text: "#1f2937",
          },
          fonts: {
            heading: "Times New Roman",
            body: "Times New Roman",
          },
          layout: "single-column",
        },
      },
      {
        name: "Minimalist Modern",
        category: "modern",
        description: "Ultra-clean design for contemporary professionals",
        isPremium: true,
        config: {
          colors: {
            primary: "#000000",
            secondary: "#6b7280",
            text: "#374151",
          },
          fonts: {
            heading: "Inter",
            body: "Inter",
          },
          layout: "two-column",
        },
      },
    ];

    const templateIds = [];
    for (const template of defaultTemplates) {
      const templateId = await ctx.db.insert("templates", {
        ...template,
        createdAt: Date.now(),
      });
      templateIds.push(templateId);
    }

    return { 
      message: "Templates seeded successfully", 
      count: templateIds.length,
      templateIds 
    };
  },
}); 