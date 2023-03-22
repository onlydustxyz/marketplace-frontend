import { test, expect, Page } from "@playwright/test";
import { execSync } from "child_process";
import { createGithubUser } from "./commands/user";

const TEST_ETH_ADDRESS = "0x3cd05ab88fbf996c0784e54f74195815bfa866de";

export const setLocalStorageTest = async (key: string, value: string, page: Page) => {
  await page.addInitScript(
    item => {
      window.localStorage.setItem(item.key, item.value);
    },
    { key, value }
  );
};

export const restoreDB = () => {
  const DATABASE_URL = process.env.DATABASE_URL;
  execSync(`if [ -f "cypress/marketplace_db_dump" ]; then psql ${DATABASE_URL} < "cypress/marketplace_db_dump"; fi`);
};

export type Url = string;
export type Uuid = string;
export type GraphQLRequest = {
  query: string;
  variables?: object;
  wait?: number;
};

export type Project = {
  id?: Uuid;
  name: string;
  shortDescription: string;
  longDescription: string;
  telegramLink?: Url;
  logoUrl?: Url;
  initialBudget?: number;
  leaders?: string[];
  pendingLeaderInvitations?: string[];
  repos: string[];
  sponsors: string[];
};

export type Repo = {
  id: number;
  name: string;
  owner: string;
  languages: Map<string, number>;
};

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
  optBankAddress?: {
    BIC?: string;
    IBAN?: string;
  };
  optEthAddress?: string;
};

export type User = {
  id?: Uuid;
  password?: string;
  email: string;
  token?: string;
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

test.describe("As a project lead, I", () => {
  let project: Project;
  let leader1: User;
  let leader2: User;
  let recipient: User;

  test.beforeEach(async ({ page, browser, request }) => {
    await createGithubUser(request, 70494, "ofuxet");

    project = {
      id: "8bb6bdd5-6912-45f9-9195-6c891029e721",
      name: "Kakarot",
      shortDescription: "EVM interpreter written in Cairo, a sort of ZK-EVM emulator, leveraging STARK proof system.",
      longDescription:
        "Kakarot is an Ethereum Virtual Machine written in Cairo. It means it can be deployed on StarkNet, a layer 2 scaling solution for Ethereum, and run any EVM bytecode program. Hence, Kakarot can be used to run Ethereum smart contracts on StarkNet. Kakarot is the super sayajin zkEVM! Why? Because: It's over 9000!!!!!.",
      telegramLink: "https://t.me/kakarot",
      logoUrl: "https://github.com/sayajin-labs/kakarot/raw/main/docs/img/kakarot_github_banner.png",
      initialBudget: 50000,
      pendingLeaderInvitations: ["Anthony", "Oscar"],
      leaders: ["TokioRs", "Olivier"],
      repos: ["kakarot"],
      sponsors: ["StarkNet"],
    };
    leader1 = {
      id: "5f8ce223-ef10-4ad0-9aa6-0d4ed763664d",
      token:
        '{"accessToken":"eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLXByb2plY3RzTGVhZGVkIjoie30iLCJ4LWhhc3VyYS1naXRodWJVc2VySWQiOiIyMDI0ODU0NCIsIngtaGFzdXJhLWdpdGh1YkFjY2Vzc1Rva2VuIjoiZ2hwX2xrZnJqeDlKeVRjODAzOThNeUtHSXlwUmdMTkxVYzNVNkZ3UiIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsibWUiLCJwdWJsaWMiLCJyZWdpc3RlcmVkX3VzZXIiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoicmVnaXN0ZXJlZF91c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6IjVmOGNlMjIzLWVmMTAtNGFkMC05YWE2LTBkNGVkNzYzNjY0ZCIsIngtaGFzdXJhLXVzZXItaXMtYW5vbnltb3VzIjoiZmFsc2UifSwic3ViIjoiNWY4Y2UyMjMtZWYxMC00YWQwLTlhYTYtMGQ0ZWQ3NjM2NjRkIiwiaWF0IjoxNjc5MzI4MDY3LCJleHAiOjE2Nzk5MzI4NjcsImlzcyI6Imhhc3VyYS1hdXRoIn0.XIOW97qhBRD-A1AOCVimMgRvWmee7ISb1mXoa-m0bYI","accessTokenExpiresIn":604800,"refreshToken":"d3d7a209-abaf-4b96-a3df-e9049b521b70","user":{"avatarUrl":"https://s.gravatar.com/avatar/859e6e1f8e452b856715ab38147cb8d7?r=g&default=blank","createdAt":"2023-03-20T16:01:06.551Z","disabled":false,"defaultRole":"registered_user","displayName":"tokio-rs","email":"rust@tokio.com","emailVerified":true,"id":"5f8ce223-ef10-4ad0-9aa6-0d4ed763664d","isAnonymous":false,"locale":"en","metadata":{},"phoneNumber":null,"phoneNumberVerified":false,"roles":["me","public","registered_user"],"activeMfaType":null,"newEmail":null,"totpSecret":null,"ticket":"verifyEmail:badf5f3f-fccd-4260-abf1-6d4f3106e75c","passwordHash":"$2a$10$NLuet.E3jhbanJkzeSP6HuvYc0npiuvxUtb7v8Meo5cAspLRSG6jC","otpHash":null,"otpMethodLastUsed":null,"webauthnCurrentChallenge":null,"ticketExpiresAt":"2023-04-19T16:01:06.541Z","otpHashExpiresAt":"2023-03-20T16:01:06.551Z","lastSeen":"2023-03-20T16:01:07.142Z"}}',

      email: "rust@tokio.com",
      github: {
        id: 20248544,
        login: "tokio-rs",
      },
      profile: {
        identity: {
          type: UserIdentityType.COMPANY,
          optCompany: {
            name: "TokioRs",
          },
        },
        location: {
          address: "4564 30th St",
          city: "San Diego",
          country: "USA",
          postCode: "92116",
        },
        payoutSettings: {
          type: PayoutIdentityType.BANK_ADDRESS,
          optBankAddress: {
            BIC: "BNPCFR21",
            IBAN: "FR7610107001011234567890129",
          },
        },
      },
    };
    leader2 = {
      id: "37e4e183-454a-483c-9b78-3f1cc4fbc237",
      token:
        '{"accessToken":"eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLXByb2plY3RzTGVhZGVkIjoie30iLCJ4LWhhc3VyYS1naXRodWJVc2VySWQiOiI1OTU1MDUiLCJ4LWhhc3VyYS1naXRodWJBY2Nlc3NUb2tlbiI6ImdocF9sa2Zyang5SnlUYzgwMzk4TXlLR0l5cFJnTE5MVWMzVTZGd1IiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIm1lIiwicHVibGljIiwicmVnaXN0ZXJlZF91c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InJlZ2lzdGVyZWRfdXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiIzN2U0ZTE4My00NTRhLTQ4M2MtOWI3OC0zZjFjYzRmYmMyMzciLCJ4LWhhc3VyYS11c2VyLWlzLWFub255bW91cyI6ImZhbHNlIn0sInN1YiI6IjM3ZTRlMTgzLTQ1NGEtNDgzYy05Yjc4LTNmMWNjNGZiYzIzNyIsImlhdCI6MTY3OTMyODA2OCwiZXhwIjoxNjc5OTMyODY4LCJpc3MiOiJoYXN1cmEtYXV0aCJ9.e4PqFQ2y6gzrwTxkbsWqjlf-4TIkjzU2gcL6bPtYqmM","accessTokenExpiresIn":604800,"refreshToken":"2ebe7dfc-4539-4a2a-b492-025f9b91d632","user":{"avatarUrl":"https://s.gravatar.com/avatar/03bb898a2c050de7538b654c154eea15?r=g&default=blank","createdAt":"2023-03-20T16:01:08.230Z","disabled":false,"defaultRole":"registered_user","displayName":"ofux","email":"olivier@mymail.org","emailVerified":true,"id":"37e4e183-454a-483c-9b78-3f1cc4fbc237","isAnonymous":false,"locale":"en","metadata":{},"phoneNumber":null,"phoneNumberVerified":false,"roles":["me","public","registered_user"],"activeMfaType":null,"newEmail":null,"totpSecret":null,"ticket":"verifyEmail:55a5740e-3279-4e1c-93b8-81683cc79e2f","passwordHash":"$2a$10$YFX/Fx7v3hgRDQNH6aurDuAmf3CqCpzGhpwWtYxL5AsimSbrhFPm2","otpHash":null,"otpMethodLastUsed":null,"webauthnCurrentChallenge":null,"ticketExpiresAt":"2023-04-19T16:01:08.225Z","otpHashExpiresAt":"2023-03-20T16:01:08.230Z","lastSeen":"2023-03-20T16:01:08.696Z"}}',

      email: "olivier@mymail.org",
      github: {
        id: 595505,
        login: "ofux",
      },
      profile: {
        identity: {
          type: UserIdentityType.PERSON,
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
          type: PayoutIdentityType.BANK_ADDRESS,
          optBankAddress: {
            BIC: "BNPAFRPPXXX",
            IBAN: "FR7630004000031234567890143",
          },
        },
      },
    };
    recipient = {
      id: "e54ec09e-b912-4862-a423-438c94bba3f1",
      token:
        '{"accessToken":"eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLXByb2plY3RzTGVhZGVkIjoie30iLCJ4LWhhc3VyYS1naXRodWJVc2VySWQiOiI0MzQ2NzI0NiIsIngtaGFzdXJhLWdpdGh1YkFjY2Vzc1Rva2VuIjoiZ2hwX2xrZnJqeDlKeVRjODAzOThNeUtHSXlwUmdMTkxVYzNVNkZ3UiIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsibWUiLCJwdWJsaWMiLCJyZWdpc3RlcmVkX3VzZXIiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoicmVnaXN0ZXJlZF91c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6ImU1NGVjMDllLWI5MTItNDg2Mi1hNDIzLTQzOGM5NGJiYTNmMSIsIngtaGFzdXJhLXVzZXItaXMtYW5vbnltb3VzIjoiZmFsc2UifSwic3ViIjoiZTU0ZWMwOWUtYjkxMi00ODYyLWE0MjMtNDM4Yzk0YmJhM2YxIiwiaWF0IjoxNjc5MzI4MDY5LCJleHAiOjE2Nzk5MzI4NjksImlzcyI6Imhhc3VyYS1hdXRoIn0.vn846pIsuqUsGp-lLZD5CARJUXC-n6FD2iqAK0K1Y_Q","accessTokenExpiresIn":604800,"refreshToken":"723543d9-11e5-404f-bf9c-20663b39bcd0","user":{"avatarUrl":"https://s.gravatar.com/avatar/a716d47e46d7223d66df49f5c746f505?r=g&default=blank","createdAt":"2023-03-20T16:01:09.459Z","disabled":false,"defaultRole":"registered_user","displayName":"AnthonyBuisset","email":"antho@foo-mail.org","emailVerified":true,"id":"e54ec09e-b912-4862-a423-438c94bba3f1","isAnonymous":false,"locale":"en","metadata":{},"phoneNumber":null,"phoneNumberVerified":false,"roles":["me","public","registered_user"],"activeMfaType":null,"newEmail":null,"totpSecret":null,"ticket":"verifyEmail:d9f823db-12c6-4324-b72a-eedc07329a9e","passwordHash":"$2a$10$j8tVd9bO5Ds.rNbA0y2RROYPuLYTDVFfqSLAHG727UvQU3cCM1die","otpHash":null,"otpMethodLastUsed":null,"webauthnCurrentChallenge":null,"ticketExpiresAt":"2023-04-19T16:01:09.457Z","otpHashExpiresAt":"2023-03-20T16:01:09.459Z","lastSeen":null}}',

      email: "antho@foo-mail.org",
      github: {
        id: 43467246,
        login: "AnthonyBuisset",
      },
      profile: {
        identity: {
          type: UserIdentityType.PERSON,
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
          type: PayoutIdentityType.ETHEREUM_ADDRESS,
          optEthAddress: "0xb0E28d8e010d10a78e8ffB5BCDd607A3bEe366b7",
        },
      },
    };

    restoreDB();
  });

  test("main navigation", async ({ page, browser, context }) => {
    await page.goto(`http://localhost:5173`);
    await setLocalStorageTest("hasura_token", leader1.token || "toto", page);
    await page.reload();

    await page.goto(`http://localhost:5173/projects/${project.id}/payments`);
    expect(page.url()).toBe(`http://localhost:5173/projects/${project.id}/payments`);

    await expect(page.locator("#remainingBudget")).toHaveText("$50,000");
    await page.getByText("New payment").click();

    await requestPayment(page, recipient.github.login, [
      "https://github.com/od-mocks/cool-repo-A/pull/1",
      "https://github.com/od-mocks/cool-repo-A/pull/2",
    ]);

    await expect(page.locator("#remainingBudget")).toHaveText("$49,000");
  });
});

async function requestPayment(page: Page, contributor: string, issues: string[]) {
  const contributorHandle = page.locator("[name=contributorHandle]");
  await contributorHandle.type(contributor);
  await contributorHandle.blur();

  await page.locator("[data-testid=add-work-item-btn]").click();
  await page.locator("[data-testid=add-other-pr-toggle]").click();

  for (const issue of issues) {
    await page.locator("[name=otherPrLink]").type(issue);

    const responsePromise = page.waitForResponse(
      response => response.url() === "http://localhost:8080/v1/graphql" && response.status() === 200
    );
    await page.locator("[data-testid=add-other-pr-btn]").click();
    await responsePromise;
  }

  await page.locator("[data-testid=close-add-work-item-panel-btn]").click();
  await page.getByText("Confirm payment").click();
}
