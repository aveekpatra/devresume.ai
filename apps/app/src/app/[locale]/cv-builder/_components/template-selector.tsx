"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@v1/backend/convex/_generated/api";
import { Id } from "@v1/backend/convex/_generated/dataModel";
import { Button } from "@v1/ui/button";
import { Badge } from "@v1/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@v1/ui/dialog";
import { Input } from "@v1/ui/input";
import { ScrollArea } from "@v1/ui/scroll-area";
import { 
  Palette, 
  Search, 
  Star, 
  Crown,
  Check,
  X
} from "lucide-react";
import { toast } from "sonner";

interface TemplateSelectorProps {
  currentTemplateId?: string;
  onTemplateSelect: (templateId: string) => void;
}

const CATEGORIES = [
  { id: "all", label: "All Templates" },
  { id: "professional", label: "Professional" },
  { id: "creative", label: "Creative" },
  { id: "technical", label: "Technical" },
  { id: "academic", label: "Academic" },
  { id: "modern", label: "Modern" },
];

export function TemplateSelector({ currentTemplateId, onTemplateSelect }: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch templates
  const templates = useQuery(api.templates.list, {
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  // Filter templates based on search
  const filteredTemplates = templates?.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleTemplateSelect = (templateId: string) => {
    onTemplateSelect(templateId);
    setIsOpen(false);
    toast.success("Template applied successfully!");
  };

  const currentTemplate = templates?.find(t => t._id === currentTemplateId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          {currentTemplate ? currentTemplate.name : "Choose Template"}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Choose Template
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-xs"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <ScrollArea className="h-[400px] pr-4">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <Palette className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  No templates found
                </h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or category filter
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredTemplates.map((template) => (
                  <div
                    key={template._id}
                    className={`relative group border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                      currentTemplateId === template._id
                        ? "ring-2 ring-primary border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleTemplateSelect(template._id)}
                  >
                    {/* Template Preview */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                      {/* Mock CV Preview */}
                      <div 
                        className="absolute inset-4 bg-white rounded shadow-sm p-3 text-xs"
                        style={{ 
                          color: template.config.colors.text,
                          fontFamily: template.config.fonts.body 
                        }}
                      >
                        <div 
                          className="font-bold text-sm mb-1"
                          style={{ 
                            color: template.config.colors.primary,
                            fontFamily: template.config.fonts.heading 
                          }}
                        >
                          John Doe
                        </div>
                        <div className="text-xs mb-2" style={{ color: template.config.colors.secondary }}>
                          Software Engineer
                        </div>
                        <div className="space-y-1">
                          <div className="h-1 bg-gray-200 rounded"></div>
                          <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className="mt-2 space-y-1">
                          <div 
                            className="h-1 rounded"
                            style={{ backgroundColor: template.config.colors.primary }}
                          ></div>
                          <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                          <div className="h-1 bg-gray-200 rounded w-3/5"></div>
                        </div>
                      </div>

                      {/* Premium Badge */}
                      {template.isPremium && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            <Crown className="h-3 w-3 mr-1" />
                            PRO
                          </Badge>
                        </div>
                      )}

                      {/* Selected Indicator */}
                      {currentTemplateId === template._id && (
                        <div className="absolute top-2 left-2">
                          <div className="bg-primary text-primary-foreground rounded-full p-1">
                            <Check className="h-3 w-3" />
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>

                    {/* Template Info */}
                    <div className="p-3">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-medium text-sm truncate">
                          {template.name}
                        </h3>
                        {template.isPremium && (
                          <Crown className="h-4 w-4 text-amber-500 flex-shrink-0 ml-1" />
                        )}
                      </div>
                      {template.description && (
                        <p className="text-xs text-muted-foreground overflow-hidden" style={{ 
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as const
                        }}>
                          {template.description}
                        </p>
                      )}
                      
                      {/* Color Palette Preview */}
                      <div className="flex items-center gap-1 mt-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: template.config.colors.primary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: template.config.colors.secondary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: template.config.colors.text }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-xs text-muted-foreground">
              {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
            </div>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 