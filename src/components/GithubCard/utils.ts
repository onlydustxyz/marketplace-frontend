// British date format DD/MM/YYYY
export const getFormattedDate = (date: Date) => new Intl.DateTimeFormat("en-GB", { dateStyle: "short" }).format(date);
// American time format HH:MM AM/PM
export const getFormattedTime = (date: Date) => new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(date);
