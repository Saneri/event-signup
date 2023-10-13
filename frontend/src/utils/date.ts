export const formatDateAndTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.valueOf())) {
    return "Invalid date";
  }

  return `${date.toLocaleDateString("fi-FI")} ${date.toLocaleTimeString(
    "fi-FI"
  )}`;
};
