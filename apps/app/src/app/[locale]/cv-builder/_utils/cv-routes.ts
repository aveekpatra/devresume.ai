/**
 * Utility functions for CV routing and URL generation
 */

/**
 * Convert a CV name to a URL-safe slug
 */
export function cvNameToSlug(name: string): string {
  return encodeURIComponent(
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\w\-]/g, '') // Remove special characters except hyphens
  );
}

/**
 * Convert a URL slug back to a readable CV name
 */
export function slugToCvName(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
}

/**
 * Generate a CV builder URL from a CV name
 */
export function getCvBuilderUrl(cvName: string, locale: string = 'en'): string {
  const slug = cvNameToSlug(cvName);
  return `/${locale}/cv-builder/${slug}`;
}

/**
 * Validate if a CV name is suitable for URL usage
 */
export function isValidCvName(name: string): boolean {
  return name.trim().length > 0 && name.trim().length <= 100;
}

/**
 * Generate a unique CV name if one already exists
 */
export function generateUniqueCvName(baseName: string, existingNames: string[]): string {
  let counter = 1;
  let newName = baseName;
  
  while (existingNames.includes(newName)) {
    newName = `${baseName} ${counter}`;
    counter++;
  }
  
  return newName;
} 