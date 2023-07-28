import { UserFixture } from "../../types";
import { IdentityType, PayoutSettingsType } from "../../__generated/graphql";

export const users: Record<string, UserFixture> = {
  TokioRs: {
    email: "rust@tokio.com",
    github: {
      id: 20248544,
      login: "tokio-rs",
    },
    payoutInfo: {
      populate: false,
      identity: {
        type: IdentityType.Company,
        optCompany: {
          name: "TokioRs",
          identificationNumber: "TRS12345",
          owner: {
            firstname: "John",
            lastname: "Tok",
          },
        },
        optPerson: null,
      },
      location: {
        address: "4564 30th St",
        city: "San Diego",
        country: "USA",
        postCode: "92116",
      },
      payoutSettings: {
        type: PayoutSettingsType.BankAddress,
        optBankAddress: {
          BIC: "BNPCFR21",
          IBAN: "FR7610107001011234567890129",
        },
        optEthAddress: null,
        optEthName: null,
      },
    },
    onboardingWizardCompleted: true,
  },
  Olivier: {
    email: "olivier@mymail.org",
    github: {
      id: 595505,
      login: "ofux",
    },
    payoutInfo: {
      populate: false,
      identity: {
        type: IdentityType.Person,
        optCompany: null,
        optPerson: {
          firstname: "Olivier",
          lastname: "Fufifo",
        },
      },
      location: {
        address: "12 rue des Fougères",
        city: "Paris",
        country: "FR",
        postCode: "75005",
      },
      payoutSettings: {
        type: PayoutSettingsType.EthereumName,
        optBankAddress: null,
        optEthAddress: null,
        optEthName: "vitalik.eth",
      },
    },
  },
  Anthony: {
    email: "antho@foo-mail.org",
    admin: true,
    github: {
      id: 43467246,
      login: "AnthonyBuisset",
    },
    payoutInfo: {
      populate: false,
      identity: {
        type: IdentityType.Person,
        optCompany: null,
        optPerson: {
          firstname: "Anthony",
          lastname: "Bubibo",
        },
      },
      location: {
        address: "1 chemin du Cherche-midi",
        city: "Nice",
        country: "FR",
        postCode: "06100",
      },
      payoutSettings: {
        type: PayoutSettingsType.EthereumAddress,
        optEthAddress: "0xb0E28d8e010d10a78e8ffB5BCDd607A3bEe366b7",
        optEthName: null,
        optBankAddress: null,
      },
    },
    onboardingWizardCompleted: true,
  },
  Oscar: {
    email: "oscar@super-mail.org",
    github: {
      id: 21149076,
      login: "oscarwroche",
    },
    onboardingWizardCompleted: true,
  },
  EmptyContributor: {
    email: "empty@super-mail.org",
    github: {
      id: 136718082,
      login: "od-develop",
    },
    onboardingWizardCompleted: true,
  },
};
