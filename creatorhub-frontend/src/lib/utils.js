// Minimal className combiner (shadcn-style `cn` helper, no extra deps).
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}
