export interface Technologies {
  [key: string]: number;
}

export function isBlackListedTechnology(technology: string): boolean {
  const blackListedTech = process.env.NEXT_PUBLIC_LANGUAGES_FILTER?.toLowerCase();

  const arrayOfTech = blackListedTech?.split(",");

  return !!arrayOfTech?.find(b => b === technology.toLowerCase()) || false;
}
