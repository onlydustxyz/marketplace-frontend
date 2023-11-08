/* eslint-disable @typescript-eslint/no-explicit-any */
import { payoutInfoCombinedStatus } from "./payoutInfoStatusCombined";

/** SHOW IBAN MESSAGE
 * 1 : isCompany && bank wire tab && ( missingUsdcWallet || missingSepaAccount )
 * Then show iban message
 */
/** SHOW ETH MESSAGE
 * 1 : !isCompany && (missingUsdcWallet  || missingEthWallet) then show eth message
 * 2 : isCompany && crypto wire && (missingUsdcWallet || missingEthWallet) -> show eth message
 * 3 missingEthWallet -> show eth message
 */

describe("PayoutInfoStatusCombined", () => {
  describe("Should show Iban", () => {
    it("(Show) if company is true and missingSepaAccount is true", () => {
      const { eth, iban } = payoutInfoCombinedStatus({
        missingSepaAccount: true,
        missingUsdcWallet: true,
        missingEthWallet: false,
        isCompany: true,
        isBankWire: true,
      });

      expect(eth).toBe(false);
      expect(iban).toBe(true);
    });
    it("(Not Show) if company is true and missingSepaAccount is false", () => {
      const { eth, iban } = payoutInfoCombinedStatus({
        missingSepaAccount: false,
        missingUsdcWallet: true,
        missingEthWallet: false,
        isCompany: true,
        isBankWire: true,
      });

      expect(eth).toBe(false);
      expect(iban).toBe(true);
    });
    it("(Not Show) if bank wire is false", () => {
      const { eth, iban } = payoutInfoCombinedStatus({
        missingSepaAccount: true,
        missingUsdcWallet: true,
        missingEthWallet: false,
        isCompany: true,
        isBankWire: false,
      });

      expect(eth).toBe(true);
      expect(iban).toBe(false);
    });
    it("(Not Show) if company is false", () => {
      const { eth, iban } = payoutInfoCombinedStatus({
        missingSepaAccount: true,
        missingUsdcWallet: true,
        missingEthWallet: false,
        isCompany: false,
        isBankWire: true,
      });

      expect(eth).toBe(true);
      expect(iban).toBe(false);
    });
  });
  describe("Should show ETH", () => {
    describe("Crypto wire is true", () => {
      describe("isCompany is true", () => {
        it("(show) missingUsdcWallet is true and missingEthWallet is true", () => {
          const { eth, iban } = payoutInfoCombinedStatus({
            missingSepaAccount: false,
            missingUsdcWallet: true,
            missingEthWallet: true,
            isCompany: true,
            isBankWire: false,
          });

          expect(eth).toBe(true);
          expect(iban).toBe(false);
        });
        it("(show) missingUsdcWallet is true and missingSepaAccount and missingEthWallet is true", () => {
          const { eth, iban } = payoutInfoCombinedStatus({
            missingSepaAccount: true,
            missingUsdcWallet: true,
            missingEthWallet: true,
            isCompany: true,
            isBankWire: false,
          });

          expect(eth).toBe(true);
          expect(iban).toBe(false);
        });
      });
      describe("isCompany is false", () => {
        it("(show) missingUsdcWallet is true and missingEthWallet is true", () => {
          const { eth, iban } = payoutInfoCombinedStatus({
            missingSepaAccount: false,
            missingUsdcWallet: true,
            missingEthWallet: true,
            isCompany: false,
            isBankWire: false,
          });

          expect(eth).toBe(true);
          expect(iban).toBe(false);
        });
      });
    });
    describe("Crypto wire is false", () => {
      describe("isCompany is true", () => {
        it("(not show) missingUsdcWallet is true and missingEthWallet is true", () => {
          const { eth, iban } = payoutInfoCombinedStatus({
            missingSepaAccount: false,
            missingUsdcWallet: true,
            missingEthWallet: true,
            isCompany: true,
            isBankWire: true,
          });

          expect(eth).toBe(true);
          expect(iban).toBe(true);
        });
      });
      describe("isCompany is false", () => {
        it("(show) missingUsdcWallet is true and missingUsdcWallet is true", () => {
          const { eth, iban } = payoutInfoCombinedStatus({
            missingSepaAccount: true,
            missingUsdcWallet: true,
            missingEthWallet: false,
            isCompany: false,
            isBankWire: true,
          });

          expect(eth).toBe(true);
          expect(iban).toBe(false);
        });
        it("(not show) missingUsdcWallet is true and missingEthWallet is true", () => {
          const { eth, iban } = payoutInfoCombinedStatus({
            missingSepaAccount: false,
            missingUsdcWallet: false,
            missingEthWallet: false,
            isCompany: false,
            isBankWire: true,
          });

          expect(eth).toBe(false);
          expect(iban).toBe(false);
        });
      });
    });
  });
});
