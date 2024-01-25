export interface Technologies {
  [key: string]: number;
}

export function matchBlackListedTechnology(technology: string, lower?: boolean): boolean {
  const blackListedTech = lower
    ? process.env.NEXT_PUBLIC_LANGUAGES_FILTER?.toLowerCase()
    : process.env.NEXT_PUBLIC_LANGUAGES_FILTER;

  const arrayOfTech = blackListedTech?.split(",");

  return !!arrayOfTech?.find(b => b === technology.toLowerCase()) || false;
}
export function isBlackListedTechnologies(technology: string, lower?: boolean): boolean {
  const blackListedTech = process.env.NEXT_PUBLIC_LANGUAGES_FILTER;

  if (lower) {
    return blackListedTech?.toLowerCase().includes(technology) || false;
  }

  return blackListedTech?.includes(technology) || false;
}
export function getFilteredTechnologies(technologies: Technologies): {
  filteredTechObject: Technologies;
  filteredTechArray: [string, number][];
} {
  const blackListedTech = process.env.NEXT_PUBLIC_LANGUAGES_FILTER;

  // Convert object to array of [technology, count] pairs
  const techArray: [string, number][] = Object.entries(technologies);

  // Filter out blacklisted technologies
  const filteredTechArray = techArray.filter(item => !blackListedTech?.includes(item[0]));

  // Convert array back to object
  const filteredTechObject = Object.fromEntries(filteredTechArray);

  return { filteredTechObject, filteredTechArray };
}

export function getTopTechnologies(technologies: Technologies): string[] {
  const { filteredTechArray } = getFilteredTechnologies(technologies);

  // Sort array in descending order based on count
  const sortedTechArray = filteredTechArray.sort((a, b) => b[1] - a[1]);

  // Take the first three items from the sorted array
  const topThree = sortedTechArray.slice(0, 3);

  // Extract the names of the top three technologies
  const topThreeNames = topThree.map(item => item[0]);

  return topThreeNames;
}
