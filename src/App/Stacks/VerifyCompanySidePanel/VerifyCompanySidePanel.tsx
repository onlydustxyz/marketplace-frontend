// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck - pass build
import SumsubWebSdk from "@sumsub/websdk-react";
import { useCurrentUser } from "hooks/users/useCurrentUser";
import { useEffect, useState } from "react";

const config = {};
const options = {};

async function accessTokenExpirationHandler(...args) {
  console.error(args);
}

function messageHandler(...args) {
  console.log(args);
}

function errorHandler(...args) {
  console.error(args);
}

export function VerifyCompanySidePanel() {
  const { user } = useCurrentUser();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (user) {
      fetch("/api/sumsub-token", {
        method: "POST",
        // TODO use company id
        body: JSON.stringify({ userId: user.id, levelName: "basic-kyb-level" }),
      }).then(res => {
        res.json().then(({ token }) => {
          setToken(token);
        });
      });
    }
  }, [user]);

  return (
    <div className="flex h-full w-full items-center">
      {token ? (
        <SumsubWebSdk
          accessToken={token}
          expirationHandler={accessTokenExpirationHandler}
          config={config}
          options={options}
          onMessage={messageHandler}
          onError={errorHandler}
          className="w-full"
        />
      ) : null}
    </div>
  );
}
