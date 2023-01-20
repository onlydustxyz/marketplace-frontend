export const formatDollars = (amount: number) => {
  return Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
};
