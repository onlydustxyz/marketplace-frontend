export function getOrdinalSuffix(position: number): string {
  // Check the last two digits to handle special cases like 11th, 12th, 13th, etc.
  const lastTwoDigits = position % 100;
  if (lastTwoDigits >= 10 && lastTwoDigits <= 19) {
    return `${position}th`;
  }

  // Check the last digit to determine the correct suffix
  switch (position % 10) {
    case 1:
      return `${position}st`;
    case 2:
      return `${position}nd`;
    case 3:
      return `${position}rd`;
    default:
      return `${position}th`;
  }
}
