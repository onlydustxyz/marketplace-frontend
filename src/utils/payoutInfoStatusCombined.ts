type PayoutInfoCombinedStatus = {
  missingSepaAccount: boolean;
  missingUsdcWallet: boolean;
  missingEthWallet: boolean;
  isCompany?: boolean;
  isBankWire?: boolean;
};

export const payoutInfoCombinedStatus = ({
  missingEthWallet,
  missingSepaAccount,
  missingUsdcWallet,
  isBankWire,
  isCompany,
}: PayoutInfoCombinedStatus) => {
  if (!isCompany) {
    return {
      eth: missingUsdcWallet || missingEthWallet,
      iban: false,
    };
  }

  if (isBankWire) {
    return {
      eth: missingEthWallet,
      iban: missingUsdcWallet || missingSepaAccount,
    };
  }

  return {
    eth: missingEthWallet || missingUsdcWallet,
    iban: false,
  };
};
