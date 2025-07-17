"use client";

import { CVEditor } from "../_components/cv-editor"
import { slugToCvName } from "../_utils/cv-routes"

interface CVBuilderPageProps {
  params: {
    name: string;
    locale: string;
  };
}

export default function CVBuilderPage({ params }: CVBuilderPageProps) {
  // Convert the URL slug back to a readable CV name
  const cvName = slugToCvName(params.name);
  
  return <CVEditor cvName={cvName} />
} 