type ImpersonationClaimsHeader = {
  "x-hasura-user-id": string;
  "x-hasura-projectsLeaded": string; // Object stringified
  "x-hasura-githubUserId": string; // Number stringified
  "x-hasura-githubAccessToken": string;
};

export function validateImpersonationHeader(header: string) {
  if (!header) return false;

  try {
    const parsedHeader = JSON.parse(header) as ImpersonationClaimsHeader;

    return (
      Boolean(parsedHeader["x-hasura-user-id"]) &&
      Boolean(parseInt(parsedHeader["x-hasura-githubUserId"])) &&
      Boolean(parsedHeader["x-hasura-githubAccessToken"])
    );
  } catch (e) {
    console.error(e);
    return false;
  }
}
