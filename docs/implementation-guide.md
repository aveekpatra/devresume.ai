# Technical Implementation Guide

This guide provides step-by-step implementation details for building the AI CV and Cover Letter Maker MVP.

## Overview

Transform the existing DevResume.ai starter kit into a full-featured AI-powered CV and Cover Letter SaaS platform.

## Phase 1: Foundation (Weeks 1-2)

### Database Schema Updates

Update the Convex schema to support CV projects:

```typescript
// packages/backend/convex/schema.ts
export default defineSchema({
  ...authTables,
  
  projects: defineTable({
    userId: v.id("users"),
    name: v.string(),
    type: v.union(v.literal("cv"), v.literal("cover_letter")),
    status: v.union(v.literal("draft"), v.literal("completed")),
    templateId: v.string(),
    data: v.any(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  templates: defineTable({
    name: v.string(),
    category: v.string(),
    isPremium: v.boolean(),
    previewImage: v.string(),
    config: v.any(),
  }),
});
```

### Project Management API

```typescript
// packages/backend/convex/projects.ts
export const create = mutation({
  args: {
    name: v.string(),
    type: v.union(v.literal("cv"), v.literal("cover_letter")),
    templateId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("projects", {
      userId,
      name: args.name,
      type: args.type,
      status: "draft",
      templateId: args.templateId,
      data: getInitialData(args.type),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});
```

### Dashboard Components

```typescript
// apps/app/src/components/dashboard/project-card.tsx
export function ProjectCard({ project, onEdit }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <Badge>{project.status}</Badge>
      </CardHeader>
      <CardContent>
        <Button onClick={() => onEdit(project._id)}>
          Open
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Phase 2: CV Builder (Weeks 3-4)

### CV Builder Interface

```typescript
// apps/app/src/app/[locale]/cv-builder/[id]/page.tsx
export default function CVBuilderPage({ params }: { params: { id: string } }) {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const project = useQuery(api.projects.get, { id: params.id });

  return (
    <div className="h-screen flex">
      <div className="w-1/2 border-r">
        <CVEditor data={cvData} onChange={setCvData} />
      </div>
      <div className="w-1/2">
        <CVPreview data={cvData} />
      </div>
    </div>
  );
}
```

### Form Components

```typescript
// Personal Info Form
function PersonalInfoForm({ data, onChange }: FormProps) {
  return (
    <div className="space-y-4">
      <Input
        label="Full Name"
        value={data.fullName}
        onChange={(e) => onChange({ ...data, fullName: e.target.value })}
      />
      <Input
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) => onChange({ ...data, email: e.target.value })}
      />
      <Textarea
        label="Professional Summary"
        value={data.summary}
        onChange={(e) => onChange({ ...data, summary: e.target.value })}
      />
    </div>
  );
}
```

## Phase 3: AI Integration (Weeks 9-10)

### OpenAI Service

```typescript
// packages/backend/convex/ai/openai.ts
export const generateContent = action({
  args: { prompt: v.string(), context: v.any() },
  handler: async (ctx, args) => {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a CV writing assistant." },
        { role: "user", content: args.prompt },
      ],
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || "";
  },
});
```

### AI Assistant Component

```typescript
// apps/app/src/components/cv-builder/ai-assistant.tsx
export function AIAssistant({ cvData, onSuggestionApply }: AIAssistantProps) {
  const generateContent = useAction(api.ai.openai.generateContent);

  const handleGenerateSuggestion = async () => {
    const suggestion = await generateContent({
      prompt: `Improve this CV section: ${JSON.stringify(cvData)}`,
      context: cvData,
    });
    
    onSuggestionApply(suggestion);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGenerateSuggestion}>
          Generate Suggestions
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Phase 4: Export System

### PDF Generation

```typescript
// packages/backend/convex/export/pdf.ts
export const generatePDF = action({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.runQuery(internal.projects.get, { id: args.projectId });
    const html = generateHTMLFromTemplate(project.data);
    
    // Use Puppeteer to generate PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    
    // Store file
    const fileId = await ctx.storage.store(new Blob([pdfBuffer]));
    return { fileId };
  },
});
```

## Implementation Timeline

### Week 1-2: Foundation
- [ ] Database schema updates
- [ ] Project CRUD operations
- [ ] Dashboard interface
- [ ] Basic routing

### Week 3-4: CV Builder
- [ ] CV builder interface
- [ ] Form components
- [ ] Real-time preview
- [ ] Auto-save functionality

### Week 5-6: Templates
- [ ] Template system
- [ ] Template gallery
- [ ] Template switching
- [ ] Customization options

### Week 7-8: Export
- [ ] PDF generation
- [ ] DOCX export
- [ ] File storage
- [ ] Download system

### Week 9-10: AI Integration
- [ ] OpenAI API integration
- [ ] Content generation
- [ ] ATS optimization
- [ ] AI assistant UI

This guide provides the essential implementation steps for building the AI CV and Cover Letter Maker MVP. 