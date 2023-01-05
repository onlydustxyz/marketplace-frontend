const GITHUB_REPO_ID_WITHOUT_README = 584840242;
const GITHUB_REPO_ID_EMPTY_REPO = 584839416;
const STARKONQUEST_ID = 481932781;

describe("A project without readme", () => {
  beforeEach(() => {
    cy.createGithubUser(98735558)
      .then(user => {
        cy.createProjectWithLeader(user, "Project with budget", 1000, GITHUB_REPO_ID_WITHOUT_README)
          .as("projectId");
        cy.wait(500);
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
    cy.contains("Technologies");
  });
});

describe("A project", () => {
  beforeEach(() => {
    cy.createGithubUser(98735558)
      .then(user => {
        cy.createProjectWithLeader(user, "Starkonquest", 1000, STARKONQUEST_ID)
          .as("projectId");
        cy.wait(500);
      });
  });

  it("should render properly in public view", function () {
    cy.visit(`http://127.0.0.1:5173/projects/${this.projectId}`);
    cy.contains("Technologies");
  });
});

describe("An empty project", () => {
    beforeEach(() => {
      cy.createGithubUser(98735558)
        .then(user => {
          cy.createProjectWithLeader(user, "Project with budget", 1000, GITHUB_REPO_ID_EMPTY_REPO)
            .as("projectId");
          cy.wait(500);
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
      cy.contains("Technologies");
    });
  });
