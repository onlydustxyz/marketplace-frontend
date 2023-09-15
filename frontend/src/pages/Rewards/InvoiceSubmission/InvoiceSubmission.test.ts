import { range } from "lodash";
import { Reward } from "src/components/UserRewardTable/Line";
import { Currency, PaymentStatus } from "src/types";
import { UserPayoutSettingsFragment, WorkItemType } from "src/__generated/graphql";
import { buildHiddenFields } from "./View";

const paymentRequests: Reward[] = range(1, 4).map(id => ({
  id: `abc${id}${id}${id}${id}${id}${id}${id}`,
  amount: {
    value: 2000 + id * 100,
    currency: Currency.USD,
  },
  workItems: [
    {
      id: `abc${id}${id}${id}${id}${id}${id}${id}`,
      type: WorkItemType.Issue,
      githubIssue: null,
      githubPullRequest: null,
    },
  ],
  requestedAt: new Date(`December ${id + 10}, 2022`),
  status: PaymentStatus.WAITING_PAYMENT,
  invoiceReceived: id % 2 === 0,
}));

const userInfos: UserPayoutSettingsFragment = {
  userId: "user-1",
  companyName: "My Company",
  companyIdentificationNumber: "1234567890",
  firstname: "James",
  lastname: "Bond",
  address: "007 Big Ben Street",
  postCode: "007GB",
  city: "London",
  country: "England",
  bic: null,
  ethWallet: null,
  iban: null,
  isCompany: null,
  usdPreferredMethod: null,
  arePayoutSettingsValid: true,
};

const ens = {
  ethWallet: "007.eth",
};

const ethAddress = {
  ethWallet: "0x4675c7e5baafbffbca748158becba61ef3b0a263",
};

const wireTransfer = {
  iban: "FR0614508000708483648722R33",
  bic: "AGFBFRCC",
};

const githubUserId = 123456;

describe("buildHiddenFields", () => {
  it("should build hidden fields", () => {
    const hiddenFields = buildHiddenFields({ githubUserId, userInfos, paymentRequests: paymentRequests });
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
    expect(hiddenFields.env).toBe("local");
  });

  it("should build hidden fields for ENS Domain", () => {
    const hiddenFields = buildHiddenFields({
      githubUserId,
      userInfos: { ...userInfos, ...ens },
      paymentRequests: paymentRequests,
    });
    expect(hiddenFields.payout_info).toBe("ENS Domain: 007.eth");
  });

  it("should build hidden fields for ETH address", () => {
    const hiddenFields = buildHiddenFields({
      githubUserId,
      userInfos: { ...userInfos, ...ethAddress },
      paymentRequests: paymentRequests,
    });
    expect(hiddenFields.payout_info).toBe("ETH Address: 0x4675c7e5baafbffbca748158becba61ef3b0a263");
  });

  it("should build hidden fields for ETH address", () => {
    const hiddenFields = buildHiddenFields({
      githubUserId,
      userInfos: { ...userInfos, ...wireTransfer },
      paymentRequests: paymentRequests,
    });
    expect(hiddenFields.payout_info).toBe("IBAN: FR0614508000708483648722R33, BIC: AGFBFRCC");
  });
});
