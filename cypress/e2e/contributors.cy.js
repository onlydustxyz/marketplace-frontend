describe("As a public user, I", () => {
  const OFUX = 595505;

  before(function () {
    cy.fixture("repos.json").as("repos");
    cy.createGithubUser(98735558).then(user => {
      cy.createProject("Project with budget")
        .withLeader(user)
        .withBudget(100000)
        .withRepo(this.repos.A.id)
        .withRepo(this.repos.B.id)
        .as("projectId")
        .then(projectId => {
          cy.requestPayment(projectId, 100, OFUX, {
            workItems: [
              "https://github.com/od-mocks/cool-repo-A/pull/1",
              "https://github.com/od-mocks/cool-repo-A/pull/2",
            ],
          })
            .asRegisteredUser(user)
            .data("requestPayment");
          cy.requestPayment(projectId, 100, OFUX, {
            workItems: ["https://github.com/od-mocks/cool-repo-A/pull/1"],
          })
            .asRegisteredUser(user)
            .data("requestPayment");
          cy.requestPayment(projectId, 500, OFUX, {
            workItems: ["https://github.com/od-mocks/cool-repo-A/pull/1"],
          })
            .asRegisteredUser(user)
            .data("requestPayment");
          cy.requestPayment(projectId, 500, OFUX, {
            workItems: ["https://github.com/od-mocks/cool-repo-A/pull/1"],
          })
            .asRegisteredUser(user)
            .data("requestPayment");
          cy.requestPayment(projectId, 2000, OFUX, {
            workItems: ["https://github.com/od-mocks/cool-repo-A/pull/1"],
          })
            .asRegisteredUser(user)
            .data("requestPayment");
          cy.requestPayment(projectId, 10000, OFUX, {
            workItems: ["https://github.com/od-mocks/cool-repo-A/pull/1"],
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
      cy.get("td:nth-child(1)").should(div => expect(div.text()).to.include("ofux"));
      cy.get("td:nth-child(2)").should("have.text", "$13,200");
      cy.get("td:nth-child(3)").should("have.text", "7");
    });

    cy.get("#contributors_table tbody tr:nth-child(2)").within(() => {
      cy.get("td:nth-child(1)").should(div => expect(div.text()).to.include("oscarwroche"));
      cy.get("td:nth-child(2)").should("have.text", "-");
      cy.get("td:nth-child(3)").should("have.text", "-");
    });

    cy.get("#contributors_table tbody tr:nth-child(3)").within(() => {
      cy.get("td:nth-child(1)").should(div => expect(div.text()).to.include("AnthonyBuisset"));
      cy.get("td:nth-child(2)").should("have.text", "-");
      cy.get("td:nth-child(3)").should("have.text", "-");
    });

    cy.get("#contributors_table tbody tr").its("length").should("equal", 3);
  });

  it("can sort the contributors of a project", function () {
    cy.visit(`http://localhost:5173/projects/${this.projectId}`);

    cy.contains("Contributors").click();
    cy.get("#contributors_table thead tr th:nth-child(1)").click(); // sort by contributor name ASC

    cy.get("#contributors_table tbody tr:nth-child(1)").within(() => {
      cy.get("td:nth-child(1)").should(div => expect(div.text()).to.include("AnthonyBuisset"));
      cy.get("td:nth-child(2)").should("have.text", "-");
      cy.get("td:nth-child(3)").should("have.text", "-");
    });

    cy.get("#contributors_table tbody tr:nth-child(2)").within(() => {
      cy.get("td:nth-child(1)").should(div => expect(div.text()).to.include("ofux"));
      cy.get("td:nth-child(2)").should("have.text", "$13,200");
      cy.get("td:nth-child(3)").should("have.text", "7");
    });

    cy.get("#contributors_table tbody tr:nth-child(3)").within(() => {
      cy.get("td:nth-child(1)").should(div => expect(div.text()).to.include("oscarwroche"));
      cy.get("td:nth-child(2)").should("have.text", "-");
      cy.get("td:nth-child(3)").should("have.text", "-");
    });
  });
});

describe("As a project lead, I", () => {
  beforeEach(function () {
    cy.createGithubUser(98735558).then(user => {
      cy.createProject("Project with budget").withLeader(user).withBudget(100000).withRepo().as("projectId");
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

    cy.get('[data-testid="send-payment-button"]').first().click({ force: true });
    cy.wait(1000);
    cy.contains("[name=contributorHandle]");
    cy.get("[name=contributorHandle]").should("have.value", "AnthonyBuisset");
  });
});
