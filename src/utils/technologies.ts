export interface Technologies {
  [key: string]: number;
}

export function getTopTechnologies(technologies: Technologies): string[] {
  // Convert object to array of [technology, count] pairs
  const techArray: [string, number][] = Object.entries(technologies);

  // Sort array in descending order based on count
  const sortedTechArray = techArray.sort((a, b) => b[1] - a[1]);

  // Take the first three items from the sorted array
  const topThree = sortedTechArray.slice(0, 3);

  // Extract the names of the top three technologies
  const topThreeNames = topThree.map(item => item[0]);

  return topThreeNames;
}
