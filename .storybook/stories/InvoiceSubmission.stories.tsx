import { MyRewardType as Reward } from "src/components/UserRewardTable/Line";
import { MyPayoutInfoType } from "src/pages/Rewards/InvoiceSubmission";
import InvoiceSubmission from "src/pages/Rewards/InvoiceSubmission/View";
import { Currency, PaymentStatus } from "src/types";
import withToasterProvider from "../decorators/withToasterProvider";

export default {
  title: "InvoiceSubmission",
  component: InvoiceSubmission,
  decorators: [withToasterProvider],
};

const mockPayments: Reward[] = [
  {
    id: "c0cfdf80-bbba-4512-b5ec-066dfa9529b1",
    amount: {
      total: 2000,
      currency: Currency.USD,
    },
    numberOfRewardedContributions: 2,
    projectId: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
    requestedAt: new Date().toISOString(),
    rewardedOnProjectLogoUrl: "",
    rewardedOnProjectName: "Project 1",
    status: PaymentStatus.COMPLETE,
  },
  {
    id: "6397226d-0461-4451-962c-a61e36fd324b",
    amount: {
      total: 3000,
      currency: Currency.ETH,
    },
    numberOfRewardedContributions: 3,
    projectId: "1ac6c2ce-cba0-4e14-837c-facf9c1f0258",
    requestedAt: new Date().toISOString(),
    rewardedOnProjectLogoUrl: "",
    rewardedOnProjectName: "Project 2",
    status: PaymentStatus.PENDING_INVOICE,
  },
];

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

export const Default = {
  render: () => (
    <InvoiceSubmission
      paymentRequests={mockPayments}
      githubUserId={123456}
      payoutInfo={payoutInfo}
      markInvoiceAsReceived={() => {
        return;
      }}
    />
  ),
};
