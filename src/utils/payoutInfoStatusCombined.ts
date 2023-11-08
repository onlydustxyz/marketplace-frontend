type PayoutInfoCombinedStatus = {
  missingSepaAccount: boolean;
  missingUsdcWallet: boolean;
  missingEthWallet: boolean;
  isCompany?: boolean;
  isBankWire?: boolean;
};

/** SHOW IBAN MESSAGE
 * 1 : isCompany && bank wire tab && ( missingUsdcWallet || missingSepaAccount )
 * Then show iban message
 */
/** SHOW ETH MESSAGE
 * 1 : !isCompany && (missingUsdcWallet  || missingEthWallet) then show eth message
 * 2 : isCompany && crypto wire && (missingUsdcWallet || missingEthWallet) -> show eth message
 * 3 missingEthWallet -> show eth message
 */
// missingSepaAccount: true,
// missingUsdcWallet: true,
// missingEthWallet: false,
// isCompany: true,
// isBankWire: false,

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
