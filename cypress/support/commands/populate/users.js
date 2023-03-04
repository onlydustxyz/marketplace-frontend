Cypress.Commands.add("populateUsers", function () {
  cy.fixture("users.json").then(users => {
    const augmented_users = {};

    for (const [key, user] of Object.entries(users)) {
      cy.createGithubUser(user.github.id, user.email, user.github.login).then(registered_user => {
        augmented_users[key] = {
          id: registered_user.id,
          password: registered_user.password,
          ...user,
        };

        if (user.createProfile === true) {
          cy.updateProfileInfo(user.email, user.location, user.identity, user.payoutSettings)
            .asRegisteredUser(registered_user)
            .data("updateProfileInfo");
        }
      });
    }

    cy.writeFile("cypress/fixtures/populated/users.json", augmented_users);
    cy.wrap(augmented_users).as("users");
  });
});
