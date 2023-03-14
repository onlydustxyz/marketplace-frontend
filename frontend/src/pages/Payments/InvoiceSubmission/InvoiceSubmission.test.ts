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
  requestedAt: new Date(`December ${id + 10}, 2022`),
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
    expect(hiddenFields.github_id).toBe("123456");
    expect(hiddenFields.request_ids).toBe("abc1111111,abc2222222,abc3333333");
    expect(hiddenFields.pretty_requests).toBe(
      "#ABC11 - Dec 11, 2022 ($2,100), #ABC22 - Dec 12, 2022 ($2,200), #ABC33 - Dec 13, 2022 ($2,300)"
    );
    expect(hiddenFields.company_name).toBe("My Company");
    expect(hiddenFields.company_number).toBe("1234567890");
    expect(hiddenFields.first_name).toBe("James");
    expect(hiddenFields.last_name).toBe("Bond");
    expect(hiddenFields.street_address).toBe("007 Big Ben Street");
    expect(hiddenFields.zip_code).toBe("007GB");
    expect(hiddenFields.city).toBe("London");
    expect(hiddenFields.country).toBe("England");
    expect(hiddenFields.total_amount).toBe("$6,600");
  });

  it("should build hidden fields for ENS Domain", () => {
    const hiddenFields = buildHiddenFields({
      githubUserId,
      userInfos: { ...userInfos, ...ens },
      paymentRequests,
    });
    expect(hiddenFields.payout_info).toBe("ENS Domain: 007.eth");
  });

  it("should build hidden fields for ETH address", () => {
    const hiddenFields = buildHiddenFields({
      githubUserId,
      userInfos: { ...userInfos, ...ethAddress },
      paymentRequests,
    });
    expect(hiddenFields.payout_info).toBe("ETH Address: 0x4675c7e5baafbffbca748158becba61ef3b0a263");
  });

  it("should build hidden fields for ETH address", () => {
    const hiddenFields = buildHiddenFields({
      githubUserId,
      userInfos: { ...userInfos, ...wireTransfer },
      paymentRequests,
    });
    expect(hiddenFields.payout_info).toBe("IBAN: FR0614508000708483648722R33, BIC: AGFBFRCC");
  });
});
