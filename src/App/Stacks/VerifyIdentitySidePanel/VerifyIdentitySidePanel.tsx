import SumsubWebSdk from "@sumsub/websdk-react";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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

export function VerifyIdentitySidePanel() {
  const { user = {} } = useAuth0();
  const { sub: userId } = user;

  const [token, setToken] = useState("");

  useEffect(() => {
    fetch("/api/sumsub-token", { method: "POST", body: JSON.stringify({ userId }) }).then(res => {
      res.json().then(({ token }) => {
        setToken(token);
      });
    });
  }, []);

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
