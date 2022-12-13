export const decodeBase64ToString = (x: string) => decodeURIComponent(escape(atob(x)));
