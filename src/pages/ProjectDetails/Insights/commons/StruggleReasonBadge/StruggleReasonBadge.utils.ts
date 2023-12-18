const calculateDaysAgo = (dateString: string): number => {
  const today = new Date();
  const lastUpdated = new Date(dateString);
  const differenceInTime = today.getTime() - lastUpdated.getTime();
  return Math.floor(differenceInTime / (1000 * 3600 * 24));
};

const getColorClass = (daysAgo: number): string => {
  if (daysAgo >= 30) {
    return "bg-struggleBadge-background-red text-struggleBadge-text-red";
  } else if (daysAgo >= 20) {
    return "bg-struggleBadge-background-orange text-struggleBadge-text-orange";
  } else if (daysAgo <= 10) {
    return "bg-struggleBadge-background-green text-struggleBadge-text-green";
  }
  return "";
};

export { calculateDaysAgo, getColorClass };
