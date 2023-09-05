export function slugify(input: string): string {
  // Convert the input string to lowercase
  const lowercaseInput = input.toLowerCase();

  // Replace spaces and special characters with hyphens
  const slug = lowercaseInput.replace(/[^a-zA-Z0-9]/g, "-");

  // Remove consecutive hyphens
  return slug.replace(/-{2,}/g, "-");
}
