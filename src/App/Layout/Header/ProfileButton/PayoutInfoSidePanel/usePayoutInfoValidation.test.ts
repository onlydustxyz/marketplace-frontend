import { PreferredMethod, UserPayoutSettingsFragment } from "src/__generated/graphql";
import { usePayoutInfoValidation } from "./usePayoutInfoValidation";

const mockUser: UserPayoutSettingsFragment = {
  userId: "user-1",
  companyName: null,
  companyIdentificationNumber: "1234567890",
  firstname: "James",
  lastname: "Bond",
  address: "007 Big Ben Street",
  postCode: "007GB",
  city: null,
  country: "GB",
  usdPreferredMethod: PreferredMethod.Crypto,
  ethWallet: null,
  bic: null,
  iban: null,
  isCompany: false,
  arePayoutSettingsValid: true,
  aptosWallet: null,
  optimismWallet: null,
  starknetWallet: null,
};

describe("usePayoutInfoValidation", () => {
  it("should return false for both isContactInfoValid and isPaymentInfoValid when missing contact and payments infos", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation(mockUser);
    expect(isContactInfoValid && isPaymentInfoValid).toBe(false);
  });

  it("should return true for isContactInfoValid and false for isPaymentInfoValid when missing payment infos", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({ ...mockUser, city: "London" });
    expect(isContactInfoValid).toBe(true);
    expect(isPaymentInfoValid).toBe(false);
  });

  it("should return false for isPaymentInfoValid and true for isContactInfoValid when missing contact infos", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({ ...mockUser, ethWallet: "007.eth" });
    expect(isContactInfoValid).toBe(false);
    expect(isPaymentInfoValid).toBe(true);
  });

  it("should return false for isContactInfoValid when missing company informations", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({
      ...mockUser,
      isCompany: true,
      ethWallet: "007.eth",
    });
    expect(isContactInfoValid).toBe(false);
    expect(isPaymentInfoValid).toBe(true);
  });

  it("should return true for isContactInfoValid with complete company infos", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({
      ...mockUser,
      isCompany: true,
      companyName: "ODDDDD",
      ethWallet: "007.eth",
    });
    expect(isContactInfoValid).toBe(false);
    expect(isPaymentInfoValid).toBe(true);
  });

  it("should returns false for isPaymentInfoValid when FIAT is preferred method without banking infos", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({
      ...mockUser,
      city: "London",
      ethWallet: "007.eth",
      usdPreferredMethod: PreferredMethod.Fiat,
    });
    expect(isContactInfoValid).toBe(true);
    expect(isPaymentInfoValid).toBe(false);
  });

  it("should return true when FIAT is preferred method with banking infos", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({
      ...mockUser,
      city: "London",
      bic: "TRZOFR21XXX",
      iban: "NL40RABO4212215411",
      usdPreferredMethod: PreferredMethod.Fiat,
    });
    expect(isContactInfoValid && isPaymentInfoValid).toBe(true);
  });

  it("should return true for both isContactInfoValid and isPaymentInfoValid when valid", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({
      ...mockUser,
      city: "London",
      ethWallet: "007.eth",
    });
    expect(isContactInfoValid && isPaymentInfoValid).toBe(true);
  });
});
