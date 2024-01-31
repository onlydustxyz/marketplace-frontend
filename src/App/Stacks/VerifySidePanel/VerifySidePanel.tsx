// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck - pass build
import SumsubWebSdk from "@sumsub/websdk-react";
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

interface Props {
  userId: string;
  levelName: "basic-kyb-level" | "basic-kyc-level";
}

export function VerifySidePanel({ userId, levelName }: Props) {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (userId) {
      fetch("/api/sumsub-token", { method: "POST", body: JSON.stringify({ userId, levelName }) }).then(res => {
        res.json().then(({ token }) => {
          setToken(token);
        });
      });
    }
  }, [userId]);

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
