describe("As authentication service I", () => {
  it("can register a new user", () => {
    cy.createGithubUser(2398374);
  });
});
