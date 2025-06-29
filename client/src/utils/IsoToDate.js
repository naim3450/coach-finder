export function IsoToDate(iso) {
  const date = new Date(iso);

  // Convert to readable format
  const readableDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  return readableDate;
}
