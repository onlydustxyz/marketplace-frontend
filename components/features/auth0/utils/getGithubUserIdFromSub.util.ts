export function getGithubUserIdFromSub(sub: string | undefined): number | undefined {
  if (sub) {
    return Number(sub.split("|")[1]);
  }
  return undefined;
}
