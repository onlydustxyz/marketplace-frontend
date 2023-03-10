import { Uuid } from "../common";

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      populateUsers(): Chainable<Map<string, User>>;
    }
  }
}

export enum UserIdentityType {
  PERSON = "PERSON",
  COMPANY = "COMPANY",
}

export enum PayoutIdentityType {
  BANK_ADDRESS = "BANK_ADDRESS",
  ETHEREUM_ADDRESS = "ETHEREUM_ADDRESS",
}

export type PayoutIdentity = {
  type: PayoutIdentityType;
  optBankAddress: {
    BIC?: string;
    IBAN?: string;
  };
  optEthAddress?: string;
};

export type User = {
  id?: Uuid;
  password?: string;
  email: string;
  github: {
    id: number;
    login: string;
  };
  profile?: {
    identity?: {
      type: UserIdentityType;
      optPerson?: {
        firstname?: string;
        lastname?: string;
      };
      optCompany?: {
        name: string;
      };
    };
    location?: {
      address?: string;
      city?: string;
      country?: string;
      postCode?: string;
    };
    payoutSettings?: PayoutIdentity;
    contactInformation?: {
      email?: string;
      telegram?: string;
      twitter?: string;
      discord?: string;
    };
  };
};

Cypress.Commands.add("populateUsers", function () {
  cy.fixture("users.json").then((_users: any) => {
    const users = new Map<string, User>(Object.entries(_users));
    const augmented_users = new Map<string, User>();

    for (const [key, user] of users) {
      cy.createGithubUser(user.github.id, user.email, user.github.login).then(registered_user => {
        augmented_users.set(key, {
          id: registered_user.id,
          password: registered_user.password,
          ...user,
        });

        if (user.profile) {
          const profile = user.profile;
          cy.updateProfileInfo({ email: user.email }, profile.location, profile.identity, profile.payoutSettings)
            .asRegisteredUser(registered_user)
            .data("updateProfileInfo");
        }
      });
    }

    cy.then(() => {
      cy.writeFile("cypress/fixtures/__generated/users.json", Object.fromEntries(augmented_users));
      cy.wrap(Object.fromEntries(augmented_users)).as("users");
    });
  });
});
