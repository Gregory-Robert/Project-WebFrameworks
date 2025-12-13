export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("nl-BE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export function formatNumberInput(input: string): string {
  // Keep only numbers, dot, comma, and optional leading minus
  let sanitized = input.replace(/[^0-9.,-]/g, "");

  // Handle leading minus
  let isNegative = false;
  if (sanitized.startsWith("-")) {
    isNegative = true;
    sanitized = sanitized.slice(1);
  }

  // Replace comma with dot
  sanitized = sanitized.replace(/,/g, ".");

  // Split on first dot
  const [integerPart, ...decimalParts] = sanitized.split(".");

  let formatted = integerPart;

  if (decimalParts.length > 0) {
    const decimalPart = decimalParts.join("").slice(0, 2);
    formatted += "." + decimalPart;
  }

  // Allow trailing dot if user is typing
  if (sanitized.endsWith(".") && decimalParts.length === 0) {
    formatted += ".";
  }

  // Add minus back if needed
  if (isNegative) {
    formatted = "-" + formatted;
  }

  return formatted;
}

