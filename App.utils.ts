export const isObjectLike = (
  value: unknown
): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const tryExtractErrorMessage = (error: unknown): string =>
  isObjectLike(error) && "message" in error && typeof error.message === "string"
    ? error.message
    : "";
