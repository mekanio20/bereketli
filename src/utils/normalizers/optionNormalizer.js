const ID_KEYS = ["id"];
const LABEL_KEYS = ["name", "title", "label"];

export const normalizeToIdLabel = (list = []) =>
  list.map((item) => {
    const id =
      ID_KEYS.map((k) => item[k]).find((v) => v !== undefined) ??
      Object.values(item).find(
        (v) => typeof v === "number" || typeof v === "string",
      );

    let label = LABEL_KEYS.map((k) => item[k]).find(
      (v) => typeof v === "string",
    );

    if (!label || !label.trim()) label = "-";

    return { id, label };
  });