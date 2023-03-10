import { range } from "lodash";
import { Payment } from "src/components/PayoutTable/Line";
import { Currency, PaymentStatus } from "src/types";
import { UserInfo } from "src/__generated/graphql";
import { buildHiddenFields } from ".";

const paymentRequests: Payment[] = range(1, 4).map(id => ({
  id: `abc${id}${id}${id}${id}${id}${id}${id}`,
  amount: {
    value: 2000 + id * 100,
    currency: Currency.USD,
  },
  reason: "",
  requestedAt: new Date(),
  status: PaymentStatus.WAITING_PAYMENT,
}));

const userInfos: UserInfo = {
  userId: "user-1",
  identity: {
    Company: {
      name: "My Company",
      identification_number: "1234567890",
      owner: { firstname: "James", lastname: "Bond" },
    },
  },
  contactInformation: {},
  location: {
    address: "007 Big Ben Street",
    post_code: "007GB",
    city: "London",
    country: "England",
  },
  payoutSettings: {},
  arePayoutSettingsValid: true,
};

const ens = {
  payoutSettings: {
    EthTransfer: { Name: "007.eth" },
  },
};

const ethAddress = {
  payoutSettings: {
    EthTransfer: { Address: "0x4675c7e5baafbffbca748158becba61ef3b0a263" },
  },
};

const wireTransfer = {
  payoutSettings: {
    WireTransfer: { IBAN: "FR0614508000708483648722R33", BIC: "AGFBFRCC" },
  },
};

const githubUserId = 123456;

describe("buildHiddenFields", () => {
  it("should build hidden fields", () => {
    const hiddenFields = buildHiddenFields({ githubUserId, userInfos, paymentRequests });
    expect(hiddenFields.githubID).toBe("123456");
    expect(hiddenFields.requestIDs).toBe("ABC11 ($2,100), ABC22 ($2,200), ABC33 ($2,300)");
    expect(hiddenFields.companyName).toBe("My Company");
    expect(hiddenFields.companyNumber).toBe("1234567890");
    expect(hiddenFields.firstName).toBe("James");
    expect(hiddenFields.lastName).toBe("Bond");
    expect(hiddenFields.streetAddress).toBe("007 Big Ben Street");
    expect(hiddenFields.zipCode).toBe("007GB");
    expect(hiddenFields.city).toBe("London");
    expect(hiddenFields.country).toBe("England");
    expect(hiddenFields.totalAmount).toBe("$6,600");
  });

  it("should build hidden fields for ENS Domain", () => {
    const hiddenFields = buildHiddenFields({
      githubUserId,
      userInfos: { ...userInfos, ...ens },
      paymentRequests,
    });
    expect(hiddenFields.payoutInfo).toBe("ENS Domain: 007.eth");
  });

  it("should build hidden fields for ETH address", () => {
    const hiddenFields = buildHiddenFields({
      githubUserId,
      userInfos: { ...userInfos, ...ethAddress },
      paymentRequests,
    });
    expect(hiddenFields.payoutInfo).toBe("ETH Address: 0x4675c7e5baafbffbca748158becba61ef3b0a263");
  });

  it("should build hidden fields for ETH address", () => {
    const hiddenFields = buildHiddenFields({
      githubUserId,
      userInfos: { ...userInfos, ...wireTransfer },
      paymentRequests,
    });
    expect(hiddenFields.payoutInfo).toBe("IBAN: FR0614508000708483648722R33, BIC: AGFBFRCC");
  });
});
