import { WAIT_LONG } from "../support/commands/common";
import { printFormat } from "iban";
import { User } from "../support/commands/populate/users";

describe("The user", () => {
  let user: User;

  beforeEach(function () {
    user = this.users["Oscar"];
    cy.fixture("profiles/james_bond").as("profile");
  });

  it("can fill their personal info", function () {
    cy.fillPayoutSettings(user.token);
    cy.contains("Changes saved");
  });

  it("can see their personal info pre-filled", function () {
    cy.visitApp({ path: "profile", token: user.token });

    cy.get("[name=firstname]").should("have.value", this.profile.firstname);
    cy.get("[name=lastname]").should("have.value", this.profile.lastname);
    cy.get("[name=email]").should("have.value", this.profile.email);
    cy.get("[name=twitter]").should("have.value", this.profile.twitter);
    cy.get("[name=discord]").should("have.value", this.profile.discord);
    cy.get("[name=telegram]").should("have.value", this.profile.telegram);
    cy.get("[name=address]").should("have.value", this.profile.address);
    cy.get("[name=postCode]").should("have.value", this.profile.postCode);
    cy.get("[name=city]").should("have.value", this.profile.city);
    cy.get("[name=country]").should("have.value", this.profile.country);
    cy.get("[name=ethIdentity]").should("have.value", this.profile.ethWalletAddress);
  });
});

describe("The company", () => {
  let user: User;

  beforeEach(function () {
    user = this.users["Oscar"];
    cy.fixture("profiles/mi6").as("profile");
  });

  it("can fill their personal info", function () {
    cy.visitApp({ path: "profile", token: user.token });

    cy.get("[data-testid=COMPANY]").click();
    cy.get("[name=companyName]").clear().type(this.profile.name);
    cy.get("[name=identificationNumber]").clear().type(this.profile.identificationNumber);
    cy.get("[name=firstname]").clear().type(this.profile.companyOwnerFirstName);
    cy.get("[name=lastname]").clear().type(this.profile.companyOwnerLastName);
    cy.get("[name=email]").clear().type(this.profile.email);
    cy.get("[name=telegram]").clear().type(this.profile.telegram);
    cy.get("[name=twitter]").clear().type(this.profile.twitter);
    cy.get("[name=discord]").clear().type(this.profile.discord);
    cy.get("[name=address]").clear().type(this.profile.address);
    cy.get("[name=postCode]").clear().type(this.profile.postCode);
    cy.get("[name=city]").clear().type(this.profile.city);
    cy.get("[name=country]").clear().type(this.profile.country);
    cy.get("[data-testid=BANK_ADDRESS]").click().wait(100);
    cy.get("[name=IBAN]").clear().type(this.profile.IBAN);
    cy.get("[name=BIC]").clear().type(this.profile.BIC);

    cy.contains("Save profile").click();
    cy.wait(WAIT_LONG);

    cy.contains("Changes saved");
  });

  it("can see their personal info pre-filled", function () {
    cy.visitApp({ path: "profile", token: user.token });

    cy.get("[name=companyName]").should("have.value", this.profile.name);
    cy.get("[name=identificationNumber]").should("have.value", this.profile.identificationNumber);
    cy.get("[name=firstname]").should("have.value", this.profile.companyOwnerFirstName);
    cy.get("[name=lastname]").should("have.value", this.profile.companyOwnerLastName);
    cy.get("[name=email]").should("have.value", this.profile.email);
    cy.get("[name=twitter]").should("have.value", this.profile.twitter);
    cy.get("[name=discord]").should("have.value", this.profile.discord);
    cy.get("[name=telegram]").should("have.value", this.profile.telegram);
    cy.get("[name=address]").should("have.value", this.profile.address);
    cy.get("[name=postCode]").should("have.value", this.profile.postCode);
    cy.get("[name=city]").should("have.value", this.profile.city);
    cy.get("[name=country]").should("have.value", this.profile.country);
    cy.get("[id=BANK_ADDRESS]").should("be.checked");
    cy.get("[name=IBAN]").should("have.value", printFormat(this.profile.IBAN));
    cy.get("[name=BIC]").should("have.value", this.profile.BIC);
  });
});
