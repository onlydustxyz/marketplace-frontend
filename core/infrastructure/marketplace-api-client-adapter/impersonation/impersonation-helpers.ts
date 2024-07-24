import { ImpersonationClaim } from "core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation.types";

export function buildImpersonationHeadersFromClaim(claim: ImpersonationClaim) {
  return { "X-Impersonation-Claims": JSON.stringify(claim) };
}
