/** */
export const getFormattedDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("de-de", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
