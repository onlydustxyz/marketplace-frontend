const GITHUB_REPO_ID_WITHOUT_README = 1234;
const STARKONQUEST_ID = 481932781;

describe("A project without readme", () => {
    beforeEach(() => {
        cy.createUser().withGithubProvider(98735558).then(user => {
            cy.createProject(user.id, "Project with budget", 1000, GITHUB_REPO_ID_WITHOUT_README)
                .asAdmin()
                .data('createProject')
                .as('projectId');
            cy.wait(500);
            cy.signinUser(user).then(user => (JSON.stringify(user.session))).as('token')
        });
    });

    it("should render properly", function() {
        cy.visit(`http://127.0.0.1:5173/project/${this.projectId}`, {
            onBeforeLoad(win) {
                win.localStorage.setItem('hasura_token', this.token)
            },
        });

        cy.contains('Overview').click();
        cy.contains('Technologies');
    });
});


describe("A project", () => {
    beforeEach(() => {
        cy.createUser().withGithubProvider(98735558).then(user => {
            cy.createProject(user.id, "Starkonquest", 1000, STARKONQUEST_ID)
                .asAdmin()
                .data('createProject')
                .as('projectId');
            cy.wait(500);
        });
    });

    it("should render properly in public view", function() {
        cy.visit(`http://127.0.0.1:5173/project/${this.projectId}`);

        cy.contains('Overview').click();
        cy.contains('Technologies');
    });
});
