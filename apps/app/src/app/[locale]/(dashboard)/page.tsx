"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@v1/backend/convex/_generated/api";
import { Id } from "@v1/backend/convex/_generated/dataModel";
import { ProjectCard } from "@/app/[locale]/(dashboard)/_components/project-card";
import { CreateProjectModal } from "@/app/[locale]/(dashboard)/_components/create-project-modal";
import { Button } from "@v1/ui/button";
import { Input } from "@v1/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@v1/ui/select";
import { Plus, Search, Filter, SortAsc } from "lucide-react";

interface Project {
  _id: Id<"projects">;
  title: string;
  description?: string;
  status: "draft" | "active" | "archived";
  color?: string;
  createdAt: number;
  updatedAt: number;
  cvCount: number;
  coverLetterCount: number;
}

interface EditableProject {
  _id: Id<"projects">;
  title: string;
  description?: string;
  status: "draft" | "active" | "archived";
  color?: string;
}

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "active" | "archived">("all");
  const [sortBy, setSortBy] = useState<"createdAt" | "updatedAt" | "title">("updatedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<EditableProject | null>(null);

  // Fetch projects with filters
  const projects = useQuery(api.projects.getUserProjects, {
    search: searchQuery || undefined,
    status: statusFilter === "all" ? undefined : statusFilter,
    sortBy,
    sortOrder,
  });

  const handleEditProject = (project: Project) => {
    const editableProject: EditableProject = {
      _id: project._id,
      title: project.title,
      description: project.description,
      status: project.status,
      color: project.color,
    };
    setEditingProject(editableProject);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingProject(null);
  };

  const isLoading = projects === undefined;

  return (
    <div className="flex h-full w-full bg-gray-100 dark:bg-black px-6 py-8">
      <div className="z-10 mx-auto flex h-full w-full max-w-screen-xl flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">DevResume.ai</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create professional CVs and cover letters with AI assistance. Manage your career documents in organized projects.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex w-full flex-col rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50">
          
          {/* Project Header */}
          <div className="flex w-full flex-col rounded-lg p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white">Your Projects</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Organize your CVs and cover letters into projects. Each project can contain multiple versions and variations.
                </p>
              </div>
              <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4" />
                Create New Project
              </Button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex w-full px-6">
            <div className="w-full border-b border-gray-200 dark:border-gray-700" />
          </div>
          
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                  <SelectTrigger className="w-[140px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                  const [field, order] = value.split('-');
                  setSortBy(field as any);
                  setSortOrder(order as any);
                }}>
                  <SelectTrigger className="w-[160px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                    <SortAsc className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updatedAt-desc">Last Modified</SelectItem>
                    <SelectItem value="createdAt-desc">Newest First</SelectItem>
                    <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                    <SelectItem value="title-asc">Title A-Z</SelectItem>
                    <SelectItem value="title-desc">Title Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="px-6 pb-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
                </div>
              </div>
            ) : projects && projects.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    onEdit={handleEditProject}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-600 mb-4">
                  <Plus className="h-8 w-8 stroke-[1.5px] text-blue-600" />
                </div>
                <div className="text-center max-w-md">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {searchQuery || statusFilter !== "all" ? "No projects found" : "No projects yet"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {searchQuery || statusFilter !== "all" 
                      ? "Try adjusting your search or filter criteria."
                      : "Create your first project to get started with building your CV and cover letters."
                    }
                  </p>
                  {!searchQuery && statusFilter === "all" && (
                    <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4" />
                      Create Your First Project
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create/Edit Project Modal */}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        editingProject={editingProject}
      />
    </div>
  );
}
