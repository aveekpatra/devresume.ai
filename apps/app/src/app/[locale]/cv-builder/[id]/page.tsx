"use client";

import { ModernCVEditor } from "../_components/modern-cv-editor"

interface CVBuilderPageProps {
  params: {
    id: string
    locale: string
  }
}

export default function CVBuilderPage({ params }: CVBuilderPageProps) {
  return <ModernCVEditor />
} 