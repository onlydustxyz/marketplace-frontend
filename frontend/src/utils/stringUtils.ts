export const decodeBase64ToString = (x: string) => decodeURIComponent(escape(atob(x)));
export const buildGithubLink = (repoOwner: string, repoName: string) => `github.com/${repoOwner}/${repoName}`;
