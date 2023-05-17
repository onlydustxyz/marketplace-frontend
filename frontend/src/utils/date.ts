export const formatDate = (date: Date) => new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
export const formatDateTime = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "medium" }).format(date);

export const daysFromNow = (days: number) => new Date(Date.now() - days * 24 * 3600 * 1000);
