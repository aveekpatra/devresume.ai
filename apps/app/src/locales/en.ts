export default {
  dashboard: {
    title: "DevResume.ai",
    description:
      "Create professional CVs and cover letters with AI assistance. Manage your career documents in organized projects.",
    bodyTitle: "Your Projects",
    bodyDescription:
      "Organize your CVs and cover letters into projects. Each project can contain multiple versions and variations.",
    bodyTip: "TIP: Try creating your first project!",
    headerTitle: "Dashboard",
    headerDescription: "Manage your CV and cover letter projects.",
    documentationLink: "Explore Documentation",
    
    // Project management
    projects: {
      title: "Projects",
      description: "Manage your CV and cover letter projects",
      createNew: "Create New Project",
      searchPlaceholder: "Search projects...",
      sortBy: "Sort by",
      sortOptions: {
        createdAt: "Created Date",
        updatedAt: "Last Modified",
        title: "Title",
      },
      sortOrder: {
        asc: "Ascending",
        desc: "Descending",
      },
      filterBy: "Filter by Status",
      filterOptions: {
        all: "All Projects",
        draft: "Draft",
        active: "Active",
        archived: "Archived",
      },
      empty: {
        title: "No projects yet",
        description: "Create your first project to get started with building your CV and cover letters.",
        createButton: "Create Your First Project",
      },
      card: {
        cvCount: "CV",
        cvCountPlural: "CVs",
        coverLetterCount: "Cover Letter",
        coverLetterCountPlural: "Cover Letters",
        lastModified: "Last modified",
        status: {
          draft: "Draft",
          active: "Active",
          archived: "Archived",
        },
      },
      actions: {
        edit: "Edit Project",
        duplicate: "Duplicate",
        archive: "Archive",
        unarchive: "Unarchive",
        delete: "Delete",
        view: "View Project",
      },
    },
    
    // Create/Edit Project Modal
    createProject: {
      title: "Create New Project",
      editTitle: "Edit Project",
      form: {
        title: "Project Title",
        titlePlaceholder: "e.g., Software Engineer Applications",
        description: "Description (Optional)",
        descriptionPlaceholder: "Brief description of this project...",
        color: "Project Color",
        colorPlaceholder: "Choose a color for visual organization",
      },
      buttons: {
        cancel: "Cancel",
        create: "Create Project",
        save: "Save Changes",
        creating: "Creating...",
        saving: "Saving...",
      },
    },
    
    // Delete confirmation
    deleteProject: {
      title: "Delete Project",
      description: "Are you sure you want to delete this project? This will permanently delete all CVs and cover letters in this project.",
      warning: "This action cannot be undone.",
      buttons: {
        cancel: "Cancel",
        delete: "Delete Project",
        deleting: "Deleting...",
      },
    },
    
    // Stats
    stats: {
      totalProjects: "Total Projects",
      totalCvs: "Total CVs",
      totalCoverLetters: "Total Cover Letters",
      draftProjects: "Draft Projects",
      activeProjects: "Active Projects",
      archivedProjects: "Archived Projects",
    },
  },
  settings: {
    title: "Settings",
    headerTitle: "Settings",
    headerDescription: "Manage your account settings.",
    avatar: {
      title: "Your Avatar",
      description: "This is your avatar. It will be displayed on your profile.",
      uploadHint: "Click on the avatar to upload a custom one from your files.",
      resetButton: "Reset",
    },
    deleteAccount: {
      title: "Delete Account",
      description:
        "Permanently delete your DevResume.ai account, all of your projects, CVs, cover letters and their respective data.",
      warning: "This action cannot be undone, proceed with caution.",
      deleteButton: "Delete Account",
      confirmButton: "Are you sure?",
    },
    sidebar: {
      general: "General",
      billing: "Billing",
    },
  },
} as const;
