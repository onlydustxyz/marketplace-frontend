export function newRandomGithubUserId() {
  return Math.floor(Math.random() * (Math.pow(2, 31) - 1));
}
