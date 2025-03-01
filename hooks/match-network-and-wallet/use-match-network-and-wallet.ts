import { useMemo } from "react";

interface Wallets {
  eth?: string;
  optimism?: string;
  aptos?: string;
  starknet?: string;
  near?: string;
  stellar?: string;
  bankAccount?: {
    bic?: string;
    number?: string;
  };
}
type Network = "SEPA" | "ETHEREUM" | "OPTIMISM" | "APTOS" | "STARKNET" | "STELLAR" | "NEAR";
interface IuseMatchNetworkAndWallet {
  wallets: Wallets;
  networks: Array<Network | undefined>;
}

export interface useMatchNetworkAndWalletReturn {
  wallets: {
    [key in Network]?: {
      network: Network;
      wallet?: string;
      bankAccount?: {
        bic?: string;
        number?: string;
      };
    };
  };
}
export const useMatchNetworkAndWallet = ({
  networks,
  wallets,
}: IuseMatchNetworkAndWallet): useMatchNetworkAndWalletReturn => {
  const matchedWallet = useMemo((): useMatchNetworkAndWalletReturn["wallets"] => {
    const matchWallet: useMatchNetworkAndWalletReturn["wallets"] = {};

    if (networks.includes("SEPA")) {
      matchWallet["SEPA"] = {
        network: "SEPA",
        bankAccount: wallets.bankAccount,
      };
    }

    if (networks.includes("ETHEREUM")) {
      matchWallet["ETHEREUM"] = {
        network: "ETHEREUM",
        wallet: wallets.eth,
      };
    }

    if (networks.includes("OPTIMISM")) {
      matchWallet["OPTIMISM"] = {
        network: "OPTIMISM",
        wallet: wallets.optimism,
      };
    }

    if (networks.includes("APTOS")) {
      matchWallet["APTOS"] = {
        network: "APTOS",
        wallet: wallets.aptos,
      };
    }

    if (networks.includes("STARKNET")) {
      matchWallet["STARKNET"] = {
        network: "STARKNET",
        wallet: wallets.starknet,
      };
    }

    if (networks.includes("STELLAR")) {
      matchWallet["STELLAR"] = {
        network: "STELLAR",
        wallet: wallets.stellar,
      };
    }

    if (networks.includes("NEAR")) {
      matchWallet["NEAR"] = {
        network: "NEAR",
        wallet: wallets.near,
      };
    }

    return matchWallet;
  }, [wallets, networks]);

  return {
    wallets: matchedWallet,
  };
};
