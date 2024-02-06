import SumsubWebSdk from "@sumsub/websdk-react";
import { useEffect, useState } from "react";

import { createSumsubToken } from "app/api/sumsub-token/handlers";

import { config } from "src/App/Stacks/VerifySidePanel/VerifySidePanel.config";
import { TVerifySidePanel } from "src/App/Stacks/VerifySidePanel/VerifySidePanel.types";
import { IMAGES } from "src/assets/img";

import { EmptyState } from "components/layout/placeholders/empty-state";

const options = {};

export function VerifySidePanel({ externalId, levelName }: TVerifySidePanel.Props) {
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    handleTokenCreation();
  }, []);

  async function handleTokenCreation() {
    try {
      const { token } = await createSumsubToken({ externalId, levelName });
      setToken(token);
    } catch (error) {
      handleError();
      console.error(error);
    }
  }

  function handleExpiration() {
    setToken("");
    handleTokenCreation();
  }

  function handleError() {
    setError(true);
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <EmptyState
          illustrationSrc={IMAGES.icons.emptyState}
          title={{ token: "v2.features.verify.error.title" }}
          description={{ token: "v2.features.verify.error.description" }}
        />
      </div>
    );
  }

  if (token) {
    return (
      <SumsubWebSdk
        accessToken={token}
        expirationHandler={handleExpiration}
        config={config}
        options={options}
        onError={handleError}
        className="w-full p-4"
      />
    );
  }

  return null;
}
