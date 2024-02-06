import { TSumsub } from "app/api/sumsub-token/types";

export async function createSumsubToken({ externalId, levelName }: TSumsub.CreateTokenProps) {
  const response = await fetch("/api/sumsub-token", {
    method: "POST",
    body: JSON.stringify({ externalId, levelName }),
  });

  if (!response.ok) {
    throw new Error("Failed to create Sumsub token.");
  }

  return await response.json();
}
