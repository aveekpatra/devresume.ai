"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@v1/backend/convex/_generated/api";
import { Id } from "@v1/backend/convex/_generated/dataModel";
import { Button } from "@v1/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@v1/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@v1/ui/dialog";
import { Badge } from "@v1/ui/badge";
import {
  MoreHorizontal,
  FileText,
  Mail,
  Calendar,
  Edit,
  Archive,
  Trash2,
  Eye,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProjectCardProps {
  project: {
    _id: Id<"projects">;
    title: string;
    description?: string;
    status: "draft" | "active" | "archived";
    color?: string;
    createdAt: number;
    updatedAt: number;
    cvCount: number;
    coverLetterCount: number;
  };
  onEdit: (project: {
    _id: Id<"projects">;
    title: string;
    description?: string;
    status: "draft" | "active" | "archived";
    color?: string;
    createdAt: number;
    updatedAt: number;
    cvCount: number;
    coverLetterCount: number;
  }) => void;
}

export function ProjectCard({ project, onEdit }: ProjectCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const router = useRouter();
  const deleteProject = useMutation(api.projects.deleteProject);
  const updateProject = useMutation(api.projects.updateProject);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProject({ projectId: project._id });
      toast.success("Project deleted successfully");
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error("Failed to delete project");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleArchive = async () => {
    try {
      await updateProject({
        projectId: project._id,
        status: project.status === "archived" ? "active" : "archived",
      });
      toast.success(
        project.status === "archived" 
          ? "Project unarchived successfully" 
          : "Project archived successfully"
      );
    } catch (error) {
      toast.error("Failed to update project");
    }
  };

  const handleView = () => {
    // Navigate to CV builder for CV projects, or cover letter generator for cover letter projects
    if (project.title.toLowerCase().includes('cv') || project.title.toLowerCase().includes('resume')) {
      router.push(`/cv-builder/${project._id}`);
    } else if (project.title.toLowerCase().includes('cover letter')) {
      router.push(`/cover-letter/${project._id}`);
    } else {
      // Default to CV builder for now
      router.push(`/cv-builder/${project._id}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const cardStyle = project.color
    ? { borderLeftColor: project.color, borderLeftWidth: "4px" }
    : {};

  return (
    <>
      <div
        className="group relative rounded-lg border border-border bg-card p-6 transition-all hover:shadow-md dark:bg-card/50"
        style={cardStyle}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {project.title}
            </h3>
            {project.description && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <Badge className={getStatusColor(project.status)} variant="secondary">
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleView}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Project
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(project)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Project
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleArchive}>
                  <Archive className="mr-2 h-4 w-4" />
                  {project.status === "archived" ? "Unarchive" : "Archive"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>
              {project.cvCount} {project.cvCount === 1 ? "CV" : "CVs"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>
              {project.coverLetterCount}{" "}
              {project.coverLetterCount === 1 ? "Cover Letter" : "Cover Letters"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              Last modified {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
            </span>
          </div>
        </div>

        {/* Click overlay for navigation */}
        <button
          onClick={handleView}
          className="absolute inset-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={`View ${project.title} project`}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{project.title}"? This will permanently 
              delete all CVs and cover letters in this project. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 