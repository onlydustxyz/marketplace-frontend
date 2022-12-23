describe("The user", () => {
  before(() => {
    cy.createUser()
      .withGithubProvider(12345)
      .then(user => {
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

    cy.get("[value=PERSON]").click();
    cy.get("[name=firstname]").clear().type(this.profile.firstname);
    cy.get("[name=lastname]").clear().type(this.profile.lastname);
    cy.get("[name=email]").clear().type(this.profile.email);
    cy.get("[name=number]").clear().type(this.profile.number);
    cy.get("[name=street]").clear().type(this.profile.street);
    cy.get("[name=postCode]").clear().type(this.profile.postCode);
    cy.get("[name=city]").clear().type(this.profile.city);
    cy.get("[name=country]").clear().type(this.profile.country);
    cy.get("[value=ETHEREUM_ADDRESS]").click();
    cy.get("[name=ethWalletAddress]").clear().type(this.profile.ethWalletAddress);

    cy.contains("Save profile").click();

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
    cy.get("[name=number]").should("have.value", this.profile.number);
    cy.get("[name=street]").should("have.value", this.profile.street);
    cy.get("[name=postCode]").should("have.value", this.profile.postCode);
    cy.get("[name=city]").should("have.value", this.profile.city);
    cy.get("[name=country]").should("have.value", this.profile.country);
    cy.get("[name=ethWalletAddress]").should("have.value", this.profile.ethWalletAddress);
  });
});

describe("The company", () => {
  before(() => {
    cy.createUser()
      .withGithubProvider(54321)
      .then(user => {
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

    cy.get("[value=COMPANY]").click();
    cy.get("[name=id]").clear().type(this.profile.id);
    cy.get("[name=name]").clear().type(this.profile.name);
    cy.get("[name=email]").clear().type(this.profile.email);
    cy.get("[name=number]").clear().type(this.profile.number);
    cy.get("[name=street]").clear().type(this.profile.street);
    cy.get("[name=postCode]").clear().type(this.profile.postCode);
    cy.get("[name=city]").clear().type(this.profile.city);
    cy.get("[name=country]").clear().type(this.profile.country);
    cy.get("[value=BANK_ADDRESS]").click();
    cy.get("[name=IBAN]").clear().type(this.profile.IBAN);
    cy.get("[name=BIC]").clear().type(this.profile.BIC);

    cy.contains("Save profile").click();

    cy.contains("Browse projects");
  });

  it("can see their personal info pre-filled", function () {
    cy.visit("http://127.0.0.1:5173/profile", {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });

    cy.get("[name=id]").should("have.value", this.profile.id);
    cy.get("[name=name]").should("have.value", this.profile.name);
    cy.get("[name=email]").should("have.value", this.profile.email);
    cy.get("[name=number]").should("have.value", this.profile.number);
    cy.get("[name=street]").should("have.value", this.profile.street);
    cy.get("[name=postCode]").should("have.value", this.profile.postCode);
    cy.get("[name=city]").should("have.value", this.profile.city);
    cy.get("[name=country]").should("have.value", this.profile.country);
    cy.get("[name=IBAN]").should("have.value", this.profile.IBAN);
    cy.get("[name=BIC]").should("have.value", this.profile.BIC);
  });
});
