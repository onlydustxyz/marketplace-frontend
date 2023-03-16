import { WAIT_SHORT } from "../support/commands/common";
import { Project } from "../support/commands/populate/projects";
import { User } from "../support/commands/populate/users";

describe("As a public user, I", () => {
  let project: Project;

  beforeEach(function () {
    project = this.projects["Project A"];
  });

  it("can see the contributors of a project", function () {
    cy.visitApp({ path: `projects/${project.id}` });

    cy.contains("Contributors").click();

    cy.get("#contributors_table tbody tr:nth-child(1)").within(() => {
      cy.get("td:nth-child(1)").should(div => expect(div.text()).to.include("ofux"));
      cy.get("td:nth-child(2)").should("have.text", "$13,200");
      cy.get("td:nth-child(3)").should("have.text", "7");
    });

    cy.get("#contributors_table tbody tr:nth-child(2)").within(() => {
      cy.get("td:nth-child(1)").should(div => expect(div.text()).to.include("oscarwroche"));
      cy.get("td:nth-child(2)").should("have.text", "$200");
      cy.get("td:nth-child(3)").should("have.text", "1");
    });

    cy.get("#contributors_table tbody tr:nth-child(3)").within(() => {
      cy.get("td:nth-child(1)").should(div => expect(div.text()).to.include("AnthonyBuisset"));
      cy.get("td:nth-child(2)").should("have.text", "-");
      cy.get("td:nth-child(3)").should("have.text", "-");
    });

    cy.get("#contributors_table tbody tr").its("length").should("equal", 3);
  });

  it("can sort the contributors of a project", function () {
    cy.visitApp({ path: `projects/${project.id}` });

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
      cy.get("td:nth-child(2)").should("have.text", "$200");
      cy.get("td:nth-child(3)").should("have.text", "1");
    });
  });
});

describe("As a project lead, I", () => {
  let project: Project;
  let user: User;

  beforeEach(function () {
    project = this.projects["Project B"];
    user = this.users["Oscar"];
  });

  it("can request a payment for a contributor", function () {
    cy.visitApp({ path: `projects/${project.id}`, token: user.token });
    cy.contains("Contributors").click();

    cy.get('[data-testid="send-payment-button"]').first().click({ force: true }).wait(WAIT_SHORT);
    cy.get("#contributorHandle").should("have.value", "oscarwroche");
  });
});
