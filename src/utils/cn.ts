/**
 * Utility function to conditionally join class names together
 * @param classes Array of class names, arrays of class names, or falsy values
 * @returns Combined class names string
 */
export function cn(...classes: (string | string[] | undefined | false | null)[]): string {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ');
}