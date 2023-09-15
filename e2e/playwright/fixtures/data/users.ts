import { UserFixture } from "../../types";
import { PreferredMethod } from "../../__generated/graphql";

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
        company: {
          name: "TokioRs",
          identificationNumber: "TRS12345",
          owner: {
            firstname: "John",
            lastname: "Tok",
          },
        },
        person: null,
      },
      location: {
        address: "4564 30th St",
        city: "San Diego",
        country: "USA",
        postCode: "92116",
      },
      payoutSettings: {
        bankAccount: {
          BIC: "BNPCFR21",
          IBAN: "FR7610107001011234567890129",
        },
        ethAddress: null,
        ethName: null,
        aptosAddress: null,
        optimismAddress: null,
        starknetAddress: null,
        usdPreferredMethod: PreferredMethod.Crypto,
      },
    },
    onboardingWizardCompleted: true,
  },
  Olivier: {
    email: "olivier@mymail.org",
    github: {
      id: 595505,
      login: "ofux",
      bio: "Web3, Cloud, Unity3D",
      avatarUrl: "https://avatars.githubusercontent.com/u/595505?v=4",
    },
    payoutInfo: {
      populate: false,
      identity: {
        company: null,
        person: {
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
        bankAccount: null,
        ethAddress: null,
        ethName: "vitalik.eth",
        aptosAddress: null,
        optimismAddress: null,
        starknetAddress: null,
        usdPreferredMethod: PreferredMethod.Crypto,
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
        company: null,
        person: {
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
        ethAddress: "0xb0E28d8e010d10a78e8ffB5BCDd607A3bEe366b7",
        ethName: null,
        bankAccount: null,
        aptosAddress: null,
        optimismAddress: null,
        starknetAddress: null,
        usdPreferredMethod: PreferredMethod.Crypto,
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
  Pierre: {
    email: "pierre@super-mail.org",
    github: {
      id: 16590657,
      login: "PierreOucif",
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
