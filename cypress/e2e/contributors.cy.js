describe("As a public user, I", () => {
  const ANTHO = 43467246;

  beforeEach(function () {
    cy.createGithubUser(98735558).then(user => {
      cy.createProjectWithLeader(user, "Project with budget", 100000, 493591124)
        .as("projectId")
        .then(projectId => {
          cy.requestPayment(projectId, 100, ANTHO, {
            workItems: [
              "https://github.com/onlydustxyz/starkonquest/pull/68",
              "https://github.com/onlydustxyz/starkonquest/pull/68",
            ],
          })
            .asRegisteredUser(user)
            .data("requestPayment");
          cy.requestPayment(projectId, 100, ANTHO, {
            workItems: ["https://github.com/onlydustxyz/starkonquest/pull/68"],
          })
            .asRegisteredUser(user)
            .data("requestPayment");
          cy.requestPayment(projectId, 500, ANTHO, {
            workItems: ["https://github.com/onlydustxyz/starkonquest/pull/68"],
          })
            .asRegisteredUser(user)
            .data("requestPayment");
          cy.requestPayment(projectId, 500, ANTHO, {
            workItems: ["https://github.com/onlydustxyz/starkonquest/pull/68"],
          })
            .asRegisteredUser(user)
            .data("requestPayment");
          cy.requestPayment(projectId, 2000, ANTHO, {
            workItems: ["https://github.com/onlydustxyz/starkonquest/pull/68"],
          })
            .asRegisteredUser(user)
            .data("requestPayment");
          cy.requestPayment(projectId, 10000, ANTHO, {
            workItems: ["https://github.com/onlydustxyz/starkonquest/pull/68"],
          })
            .asRegisteredUser(user)
            .data("requestPayment");
        });
    });
  });

  it("can see the contributors of a project", function () {
    cy.visit(`http://localhost:5173/projects/${this.projectId}`);

    cy.contains("Contributors").click();

    cy.get("#contributors_table tbody tr:nth-child(1)").within(() => {
      cy.get("td:nth-child(1)").should(div => expect(div.text()).to.include("AnthonyBuisset"));
      cy.get("td:nth-child(2)").should("have.text", "$13,200");
      cy.get("td:nth-child(3)").should("have.text", "7");
    });

    cy.get("#contributors_table tbody tr").its("length").should("be.greaterThan", 5);
  });

  it("can sort the contributors of a project", function () {
    cy.visit(`http://localhost:5173/projects/${this.projectId}`);

    cy.contains("Contributors").click();
    cy.get("#contributors_table thead tr th:nth-child(1)").click(); // sort by contributor name ASC

    cy.get("#contributors_table tbody tr:nth-child(1)").within(() => {
      cy.get("td:nth-child(1)").should("have.text", "abdelhamidbakhta");
      cy.get("td:nth-child(2)").should("have.text", "-");
      cy.get("td:nth-child(3)").should("have.text", "-");
    });
  });
});

describe("As a project lead, I", () => {
const ANTHO = 43467246;

  beforeEach(function () {
    cy.createGithubUser(98735558)
      .then(user => {
        cy.createProjectWithLeader(user, "Project with budget", 100000, 493591124).as("projectId")
        cy.signinUser(user)
          .then(user => JSON.stringify(user.session))
          .as("token");
      });
  });

  it.skip("can request a payment for a contributor", function () {
    cy.visit(`http://localhost:5173/projects/${this.projectId}`, {
        onBeforeLoad(win) {
          win.localStorage.setItem("hasura_token", this.token);
        },
      });

    cy.contains("Contributors").click();

    cy.get('[data-testid="send-payment-button"]').first().click({force: true});
    cy.get('[name="contributor"]').should("have.value", "tdelabro");
});
});
