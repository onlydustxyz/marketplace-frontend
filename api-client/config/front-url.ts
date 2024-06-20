export const getBaseUrl = () => {
  const baseUrl = process.env.VERCEL_URL || undefined;
  if (baseUrl?.includes("localhost")) {
    return `http://${baseUrl}`;
  }

  if (baseUrl) {
    return `https://${baseUrl}`;
  }

  return undefined;
};
