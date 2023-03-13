export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
};
