import { WAIT_LONG } from "../support/commands/common";
import IBAN from "iban";

describe("The user", () => {
  before(() => {
    cy.createGithubUser(12345).then(user => {
      cy.signinUser(user)
        .then(user => JSON.stringify(user.session))
        .as("token");
    });
  });

  beforeEach(() => {
    cy.fixture("profiles/james_bond").as("profile");
  });

  it("can fill their personal info", function () {
    cy.visit("http://127.0.0.1:5173/profile", {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });

    cy.wait(1000);
    cy.get("[data-testid=PERSON]").click().wait(100);
    cy.get("[name=firstname]").clear().type(this.profile.firstname);
    cy.get("[name=lastname]").clear().type(this.profile.lastname);
    cy.get("[name=email]").clear().type(this.profile.email);
    cy.get("[name=address]").clear().type(this.profile.address);
    cy.get("[name=postCode]").clear().type(this.profile.postCode);
    cy.get("[name=city]").clear().type(this.profile.city);
    cy.get("[name=country]").clear().type(this.profile.country);

    cy.get("[data-testid=ETHEREUM_IDENTITY]").click().wait(100);
    cy.get("[name=ethIdentity]").clear().type(this.profile.ethWalletAddress);

    cy.contains("Save profile").click().wait(WAIT_LONG);

    cy.contains("Browse projects");
  });

  it("can see their personal info pre-filled", function () {
    cy.visit("http://127.0.0.1:5173/profile", {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });

    cy.get("[name=firstname]").should("have.value", this.profile.firstname);
    cy.get("[name=lastname]").should("have.value", this.profile.lastname);
    cy.get("[name=email]").should("have.value", this.profile.email);
    cy.get("[name=address]").should("have.value", this.profile.address);
    cy.get("[name=postCode]").should("have.value", this.profile.postCode);
    cy.get("[name=city]").should("have.value", this.profile.city);
    cy.get("[name=country]").should("have.value", this.profile.country);
    cy.get("[id=ETHEREUM_IDENTITY]").should("be.checked");
    cy.get("[name=ethIdentity]").should("have.value", this.profile.ethWalletAddress);
  });
});

describe("The company", () => {
  before(() => {
    cy.createGithubUser(54321).then(user => {
      cy.signinUser(user)
        .then(user => JSON.stringify(user.session))
        .as("token");
    });
  });

  beforeEach(() => {
    cy.fixture("profiles/mi6").as("profile");
  });

  it("can fill their personal info", function () {
    cy.visit("http://127.0.0.1:5173/profile", {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });

    cy.wait(1000);
    cy.get('[role="switch"]').click().wait(100);
    cy.get("[name=companyName]").clear().type(this.profile.name);
    cy.get("[name=email]").clear().type(this.profile.email);
    cy.get("[name=address]").clear().type(this.profile.address);
    cy.get("[name=postCode]").clear().type(this.profile.postCode);
    cy.get("[name=city]").clear().type(this.profile.city);
    cy.get("[name=country]").clear().type(this.profile.country);
    cy.get("[data-testid=BANK_ADDRESS]").click().wait(100);
    cy.get("[name=IBAN]").clear().type(this.profile.IBAN);
    cy.get("[name=BIC]").clear().type(this.profile.BIC);

    cy.contains("Save profile").click();
    cy.wait(WAIT_LONG);

    cy.contains("Browse projects");
  });

  it("can see their personal info pre-filled", function () {
    cy.visit("http://127.0.0.1:5173/profile", {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });

    cy.get("[name=companyName]").should("have.value", this.profile.name);
    cy.get("[name=email]").should("have.value", this.profile.email);
    cy.get("[name=address]").should("have.value", this.profile.address);
    cy.get("[name=postCode]").should("have.value", this.profile.postCode);
    cy.get("[name=city]").should("have.value", this.profile.city);
    cy.get("[name=country]").should("have.value", this.profile.country);
    cy.get("[id=BANK_ADDRESS]").should("be.checked");
    cy.get("[name=IBAN]").should("have.value", IBAN.printFormat(this.profile.IBAN));
    cy.get("[name=BIC]").should("have.value", this.profile.BIC);
  });
});
