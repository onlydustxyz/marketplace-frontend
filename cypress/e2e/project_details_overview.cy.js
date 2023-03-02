const OFUX = 595505;

describe("A project without readme", () => {
  beforeEach(function () {
    cy.fixture("repos.json").as("repos");
    cy.createGithubUser(98735558).then(user => {
      cy.createProject("Project with budget")
        .withLeader(user)
        .withBudget(1000)
        .withRepo(this.repos.noReadme.id)
        .as("projectId");
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
    cy.contains("Project overview");
  });
});

describe("A project", () => {
  let sponsorName;
  beforeEach(function () {
    cy.fixture("repos.json").as("repos");
    sponsorName = Math.random() + " sponsor"; // 😱😱😱😱😱😱 mandatory because we check unicity of sponsor names and DB is not reset between tests!

    cy.createGithubUser(98735558)
      .as("user")
      .then(user => {
        cy.createProject("Project A")
          .withBudget(1000)
          .withLeader(user)
          .withRepo(this.repos.A.id)
          .as("projectId")
          .then(projectId =>
            cy
              .createSponsor(sponsorName, "https://starkware.co/wp-content/uploads/2021/07/Group-177.svg")
              .then(sponsorId => cy.addSponsorToProject(projectId, sponsorId))
          );
      });
  });

  it("should render properly in public view", function () {
    cy.visit(`http://127.0.0.1:5173/projects/${this.projectId}`);
    cy.contains("Project overview");
  });

  it("should display project overview panel", function () {
    cy.visit(`http://127.0.0.1:5173/projects/${this.projectId}`);
    cy.get('[data-testid="money-granted-amount"]').should("have.text", "$0");

    cy.requestPayment(this.projectId, 500, OFUX, { workItems: ["https://github.com/od-mocks/cool-repo-A/pull/1"] })
      .asRegisteredUser(this.user)
      .data("requestPayment")
      .as("paymentId");

    cy.requestPayment(this.projectId, 200, OFUX, { workItems: ["https://github.com/od-mocks/cool-repo-A/pull/2"] })
      .asRegisteredUser(this.user)
      .data("requestPayment");

    cy.reload();
    cy.get('[data-testid="money-granted-amount"]').should("have.text", "$700");

    cy.get("@paymentId").then(paymentId => cy.cancelPaymentRequest(this.projectId, paymentId).asAdmin());

    cy.reload();
    cy.get('[data-testid="money-granted-amount"]').should("have.text", "$200");

    cy.get('[data-testid="sponsors"]').should("have.text", sponsorName);
    cy.get('[data-testid="telegram-link"]').should("have.text", "https://t.me/foo");
  });
});

describe("An empty project", () => {
  beforeEach(function () {
    cy.fixture("repos.json").as("repos");
    cy.createGithubUser(98735558).then(user => {
      cy.createProject("Project with empty repo")
        .withLeader(user)
        .withBudget(1000)
        .withRepo(this.repos.empty.id)
        .as("projectId");
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
    cy.contains("Project overview");
  });
});
