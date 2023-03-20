import { Project } from "../support/commands/populate/projects";

const OFUX = 595505;

describe("A project", () => {
  let project: Project;
  let paymentRequests: PaymentRequest[];

  beforeEach(function () {
    project = this.projects["Project A"];
    paymentRequests = this.paymentRequests[project.name][OFUX];
  });

  it("should render properly in public view", function () {
    cy.visitApp({ path: `projects/${project.id}` });
    cy.contains("Project overview");
  });

  it("should display project overview panel", function () {
    cy.visitApp({ path: `projects/${project.id}` });

    cy.get('[data-testid="money-granted-amount"]').should("have.text", "$13.4K / $100.0K");

    cy.cancelPaymentRequest(project.id, paymentRequests[1].id).asAdmin().data();
    cy.reload();
    cy.get('[data-testid="money-granted-amount"]').should("have.text", "$13.3K / $100.0K");

    cy.get('[data-testid="sponsors"]').should("have.text", project.sponsors[0]);
    cy.get('[data-testid="more-info-link"]').should("have.text", "t.me/a");
  });
});

describe("An empty project", () => {
  let project: Project;

  beforeEach(function () {
    project = this.projects["Empty"];
  });

  it("should render properly", function () {
    cy.visitApp({ path: `projects/${project.id}` });
    cy.contains("Project overview");
  });
});
