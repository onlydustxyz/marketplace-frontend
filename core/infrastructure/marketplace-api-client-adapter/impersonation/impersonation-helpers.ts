export function buildImpersonationHeaders({ githubUserId }: { githubUserId: string }) {
  return { "X-Impersonation-Claims": JSON.stringify({ sub: `github|${githubUserId}` }) };
}
