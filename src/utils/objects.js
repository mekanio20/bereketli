export const cleanObject = (obj) => {
  if (!obj || typeof obj !== "object") return {};

  const cleaned = {};

  Object.entries(obj).forEach(([key, value]) => {
    // null / undefined
    if (value === null || value === undefined) return;

    // number
    if (typeof value === "number") {
      if (value > 0) cleaned[key] = value;
      return;
    }

    // string
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) return;

      const numeric = Number(trimmed);
      cleaned[key] = !isNaN(numeric) ? numeric : trimmed;
      return;
    }

    // array
    if (Array.isArray(value)) {
      if (value.length > 0) cleaned[key] = value;
      return;
    }

    // object
    if (typeof value === "object") {
      if (Object.keys(value).length > 0) cleaned[key] = value;
      return;
    }
  });

  return cleaned;
};