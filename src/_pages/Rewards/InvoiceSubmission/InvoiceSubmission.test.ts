import { range } from "lodash";
import { MyRewardType as Reward } from "src/components/UserRewardTable/Line";
import { Currency, PaymentStatus } from "src/types";
import { MyPayoutInfoType } from ".";
import { buildHiddenFields } from "./View";

const paymentRequests: Reward[] = range(1, 4).map(id => ({
  id: `abc${id}${id}${id}${id}${id}${id}${id}`,
  amount: {
    total: 2000 + id * 100,
    currency: Currency.USD,
  },
  numberOfRewardedContributions: 2,
  projectId: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
  requestedAt: new Date(`December ${id + 10}, 2022`).toISOString(),
  rewardedOnProjectLogoUrl: "",
  rewardedOnProjectName: "Project 1",
  status: PaymentStatus.PENDING_INVOICE,
}));

const githubUserId = 123456;

const payoutInfo: MyPayoutInfoType = {
  company: {
    identificationNumber: "1873-4987-41234",
    name: "OnlyDust",
    owner: {
      firstname: "John",
      lastname: "Smith",
    },
  },
  hasValidContactInfo: false,
  isCompany: false,
  location: {
    address: "33 rue de Rivoli",
    city: "Paris",
    country: "France",
    postalCode: "75001",
  },
  payoutSettings: {
    aptosAddress: "0xa645c3bdd0dfd0c3628803075b3b133e8426061dc915ef996cc5ed4cece6d4e5",
    ethAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    ethName: "vitalik.eth",
    hasValidPayoutSettings: false,
    missingAptosWallet: false,
    missingEthWallet: false,
    missingOptimismWallet: false,
    missingSepaAccount: false,
    missingStarknetWallet: false,
    optimismAddress: "0x72c30fcd1e7bd691ce206cd36bbd87c4c7099545",
    sepaAccount: {
      bic: "DAAEFRPPCCT",
      iban: "FR5417569000301995586997O41",
    },
    starknetAddress: "0x056471aa79e3daebb62185cebee14fb0088b462b04ccf6e60ec9386044bec798",
    usdPreferredMethod: "CRYPTO",
  },
  person: {
    firstname: "John",
    lastname: "Smith",
  },
};

describe("buildHiddenFields", () => {
  it("should build hidden fields", () => {
    const hiddenFields = buildHiddenFields({ githubUserId, paymentRequests, payoutInfo });
    expect(hiddenFields.github_id).toBe("123456");
    expect(hiddenFields.request_ids).toBe("abc1111111,abc2222222,abc3333333");
    expect(hiddenFields.pretty_requests).toBe(
      "#ABC11 - Dec 11, 2022 ($2,100), #ABC22 - Dec 12, 2022 ($2,200), #ABC33 - Dec 13, 2022 ($2,300)"
    );
    expect(hiddenFields.company_name).toBe("OnlyDust");
    expect(hiddenFields.company_number).toBe("1873-4987-41234");
    expect(hiddenFields.first_name).toBe("John");
    expect(hiddenFields.last_name).toBe("Smith");
    expect(hiddenFields.street_address).toBe("33 rue de Rivoli");
    expect(hiddenFields.zip_code).toBe("75001");
    expect(hiddenFields.city).toBe("Paris");
    expect(hiddenFields.country).toBe("France");
    expect(hiddenFields.total_amount).toBe("$6,600");
    expect(hiddenFields.env).toBe("local");
  });

  //   it("should build hidden fields for ENS Domain", () => {
  //     const hiddenFields = buildHiddenFields({
  //       githubUserId,
  //       payoutInfo,
  //       paymentRequests,
  //     });
  //     expect(hiddenFields.payout_info).toBe("ENS Domain: 007.eth");
  //   });

  it("should build hidden fields for ETH address", () => {
    const hiddenFields = buildHiddenFields({
      githubUserId,
      payoutInfo,
      paymentRequests,
    });
    expect(hiddenFields.payout_info).toBe("ETH Address: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
  });

  //   it("should build hidden fields for IBAN", () => {
  //     const hiddenFields = buildHiddenFields({
  //       githubUserId,
  //       payoutInfo,
  //       paymentRequests,
  //     });
  //     expect(hiddenFields.payout_info).toBe("IBAN: FR0614508000708483648722R33, BIC: AGFBFRCC");
  //   });
});
