"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@v1/backend/convex/_generated/api";
import { Id } from "@v1/backend/convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@v1/ui/dialog";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import { Label } from "@v1/ui/label";
import { Textarea } from "@v1/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@v1/ui/select";
import { toast } from "sonner";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProject?: {
    _id: Id<"projects">;
    title: string;
    description?: string;
    status: "draft" | "active" | "archived";
    color?: string;
  } | null;
}

const colorOptions = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Orange", value: "#f59e0b" },
  { name: "Red", value: "#ef4444" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Indigo", value: "#6366f1" },
];

export function CreateProjectModal({
  isOpen,
  onClose,
  editingProject,
}: CreateProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"draft" | "active" | "archived">("draft");
  const [color, setColor] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createProject = useMutation(api.projects.createProject);
  const updateProject = useMutation(api.projects.updateProject);

  // Reset form when modal opens/closes or editing project changes
  useEffect(() => {
    if (isOpen) {
      if (editingProject) {
        setTitle(editingProject.title);
        setDescription(editingProject.description || "");
        setStatus(editingProject.status);
        setColor(editingProject.color || "");
      } else {
        setTitle("");
        setDescription("");
        setStatus("draft");
        setColor("");
      }
    }
  }, [isOpen, editingProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a project title");
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (editingProject) {
        await updateProject({
          projectId: editingProject._id,
          title: title.trim(),
          description: description.trim() || undefined,
          status,
          color: color || undefined,
        });
        toast.success("Project updated successfully");
      } else {
        await createProject({
          title: title.trim(),
          description: description.trim() || undefined,
          color: color || undefined,
        });
        toast.success("Project created successfully");
      }
      
      onClose();
    } catch (error) {
      toast.error(
        editingProject 
          ? "Failed to update project" 
          : "Failed to create project"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingProject ? "Edit Project" : "Create New Project"}
          </DialogTitle>
          <DialogDescription>
            {editingProject
              ? "Update your project details below."
              : "Create a new project to organize your CVs and cover letters."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Software Developer Applications"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of this project (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: any) => setStatus(value)} disabled={isSubmitting}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Color Theme (Optional)</Label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setColor("")}
                disabled={isSubmitting}
                className={`h-8 w-8 rounded-full border-2 ${
                  color === "" 
                    ? "border-primary" 
                    : "border-border hover:border-primary/50"
                } bg-card transition-colors`}
                title="No color"
              >
                <span className="sr-only">No color</span>
              </button>
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption.value}
                  type="button"
                  onClick={() => setColor(colorOption.value)}
                  disabled={isSubmitting}
                  className={`h-8 w-8 rounded-full border-2 ${
                    color === colorOption.value 
                      ? "border-primary" 
                      : "border-border hover:border-primary/50"
                  } transition-colors`}
                  style={{ backgroundColor: colorOption.value }}
                  title={colorOption.name}
                >
                  <span className="sr-only">{colorOption.name}</span>
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? editingProject
                  ? "Updating..."
                  : "Creating..."
                : editingProject
                ? "Update Project"
                : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 