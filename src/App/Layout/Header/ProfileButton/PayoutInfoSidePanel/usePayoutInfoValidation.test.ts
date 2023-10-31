import { PreferredMethod } from "src/__generated/graphql";
import { UserPayoutType } from "./PayoutInfoSidePanel";
import { usePayoutInfoValidation } from "./usePayoutInfoValidation";

const mockUser: UserPayoutType = {
  company: {
    identificationNumber: "1234567890",
  },
  isCompany: false,
  location: {
    address: "007 Big Ben Street",
    postalCode: "007GB",
    country: "GB",
  },
  payoutSettings: {
    usdPreferredMethod: PreferredMethod.Crypto,
  },
  person: {
    firstname: "James",
    lastname: "Bond",
  },
};

describe("usePayoutInfoValidation", () => {
  it("should return false for both isContactInfoValid and isPaymentInfoValid when missing contact and payments infos", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation(mockUser);
    expect(isContactInfoValid && isPaymentInfoValid).toBe(false);
  });

  it("should return true for isContactInfoValid and false for isPaymentInfoValid when missing payment infos", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({
      ...mockUser,
      location: {
        ...mockUser.location,
        city: "London",
      },
    });
    expect(isContactInfoValid).toBe(true);
    expect(isPaymentInfoValid).toBe(false);
  });

  it("should return false for isPaymentInfoValid and true for isContactInfoValid when missing contact infos", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({
      ...mockUser,
      payoutSettings: {
        ...mockUser.payoutSettings,
        ethName: "007.eth",
      },
    });
    expect(isContactInfoValid).toBe(false);
    expect(isPaymentInfoValid).toBe(true);
  });

  it("should return false for isContactInfoValid when missing company informations", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({
      ...mockUser,
      isCompany: true,
      payoutSettings: {
        ...mockUser.payoutSettings,
        ethName: "007.eth",
      },
    });
    expect(isContactInfoValid).toBe(false);
    expect(isPaymentInfoValid).toBe(true);
  });

  it("should return true for isContactInfoValid with complete company infos", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({
      ...mockUser,
      isCompany: true,
      company: {
        ...mockUser.company,
        name: "ODDDDD",
      },
      payoutSettings: {
        ...mockUser.payoutSettings,
        ethName: "007.eth",
      },
    });
    expect(isContactInfoValid).toBe(false);
    expect(isPaymentInfoValid).toBe(true);
  });

  it("should returns false for isPaymentInfoValid when FIAT is preferred method without banking infos", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({
      ...mockUser,
      location: {
        ...mockUser.location,
        city: "London",
      },
      payoutSettings: {
        ...mockUser.payoutSettings,
        ethName: "007.eth",
        usdPreferredMethod: PreferredMethod.Fiat,
      },
    });
    expect(isContactInfoValid).toBe(true);
    expect(isPaymentInfoValid).toBe(false);
  });

  it("should return true when FIAT is preferred method with banking infos", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({
      ...mockUser,
      location: {
        ...mockUser.location,
        city: "London",
      },
      payoutSettings: {
        ...mockUser.payoutSettings,
        sepaAccount: {
          bic: "TRZOFR21XXX",
          iban: "NL40RABO4212215411",
        },
        usdPreferredMethod: PreferredMethod.Fiat,
      },
    });
    expect(isContactInfoValid && isPaymentInfoValid).toBe(true);
  });

  it("should return true for both isContactInfoValid and isPaymentInfoValid when valid", () => {
    const { isContactInfoValid, isPaymentInfoValid } = usePayoutInfoValidation({
      ...mockUser,
      location: {
        ...mockUser.location,
        city: "London",
      },
      payoutSettings: {
        ...mockUser.payoutSettings,
        ethName: "007.eth",
      },
    });
    expect(isContactInfoValid && isPaymentInfoValid).toBe(true);
  });
});
