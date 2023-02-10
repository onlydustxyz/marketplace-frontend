const GITHUB_REPO_ID_WITHOUT_README = 584840242;
const GITHUB_REPO_ID_EMPTY_REPO = 584839416;
const STARKONQUEST_ID = 481932781;
const OFUX = 595505;

describe("A project without readme", () => {
  beforeEach(() => {
    cy.createGithubUser(98735558).then(user => {
      cy.createProjectWithLeader(user, "Project with budget", 1000, GITHUB_REPO_ID_WITHOUT_README).as("projectId");
      cy.signinUser(user)
        .then(user => JSON.stringify(user.session))
        .as("token");
    });
  });

  it("should render properly", function () {
    cy.visit(`http://127.0.0.1:5173/projects/${this.projectId}`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });
    cy.contains("CONTRIBUTORS");
  });
});

describe("A project", () => {
  beforeEach(() => {
    cy.createGithubUser(98735558).as("user").then(user => {
      cy.createProjectWithLeader(user, "Starkonquest", 1000, STARKONQUEST_ID).as("projectId");
    });
  });

  it("should render properly in public view", function () {
    cy.visit(`http://127.0.0.1:5173/projects/${this.projectId}`);
    cy.contains("CONTRIBUTORS");
  });

  it.only("should display total budget granted", function() {
    cy.visit(`http://127.0.0.1:5173/projects/${this.projectId}`);
    cy.get('[data-testid="money-granted-amount"]').should("have.text", "$0");

    cy.requestPayment(this.projectId, 500, OFUX, { workItems: ["https://github.com/onlydustxyz/marketplace/pull/504"] })
        .asRegisteredUser(this.user)
        .data("requestPayment")
        .as("paymentId");

    cy.requestPayment(this.projectId, 200, OFUX, { workItems: ["https://github.com/onlydustxyz/marketplace/pull/525"] })
        .asRegisteredUser(this.user)
        .data("requestPayment");


    cy.reload();
    cy.get('[data-testid="money-granted-amount"]').should("have.text", "$700");

    cy.get("@paymentId").then(paymentId =>cy.cancelPaymentRequest(this.projectId, paymentId).asAdmin())

    cy.reload();
    cy.get('[data-testid="money-granted-amount"]').should("have.text", "$200");
  });
});

describe("An empty project", () => {
  beforeEach(() => {
    cy.createGithubUser(98735558).then(user => {
      cy.createProjectWithLeader(user, "Project with budget", 1000, GITHUB_REPO_ID_EMPTY_REPO).as("projectId");
      cy.signinUser(user)
        .then(user => JSON.stringify(user.session))
        .as("token");
    });
  });

  it("should render properly", function () {
    cy.visit(`http://127.0.0.1:5173/projects/${this.projectId}`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", this.token);
      },
    });
    cy.contains("CONTRIBUTORS");
  });
});
