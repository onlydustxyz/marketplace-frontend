import { WAIT_LONG } from "./common";

Cypress.Commands.add(
  "createGithubUser",
  (githubUserId, email = `cypress-${Date.now()}@onlydust.xyz`, displayName = "John Smith") => {
    const password = "Str0ngPassw#ord-94|%";

    cy.request({
      method: "POST",
      url: "http://localhost:4000/signup/email-password",
      body: {
        email: email,
        options: {
          allowedRoles: ["me", "public", "registered_user"],
          defaultRole: "registered_user",
          displayName: displayName,
          locale: "en",
        },
        password: password,
      },
      failOnStatusCode: false,
    }).then(() => {
      return cy
        .graphql({
          query: `query($email: citext!) {
                    users(where: {email: {_eq: $email}}) {
                        id
                    }
                }`,
          variables: { email },
        })
        .asAdmin()
        .data("users")
        .its(0)
        .its("id")
        .should("be.a", "string")
        .then(userId => {
          cy.graphql({
            query: `mutation($userId: uuid!) {
                        updateUser(pk_columns: {id: $userId}, _set: {emailVerified: true}) {
                            id
                        }
                    }`,
            variables: { userId },
          })
            .asAdmin()
            .data("updateUser.id")
            .should("be.a", "string")
            .then(() => {
              cy.graphql({
                query: `mutation($userId: uuid!, $githubUserId: String!) {
                                insertAuthUserProvider( object: {userId: $userId, providerId: "github", providerUserId: $githubUserId, accessToken: "fake-token"},
                                                        onConflict: {constraint: user_providers_provider_id_provider_user_id_key, update_columns: userId}) {
                                    id
                                }
                            }`,
                variables: { userId, githubUserId: githubUserId.toString() },
              })
                .asAdmin()
                .data()
                .its("insertAuthUserProvider.id")
                .should("be.a", "string")
                .then(_ => ({
                  id: userId,
                  email,
                  password,
                  githubUserId,
                }));
            });
        });
    });
  }
);

Cypress.Commands.add("signinUser", user => {
  cy.request("POST", "http://localhost:4000/signin/email-password", {
    email: user.email,
    password: user.password,
  })
    .its("body.session")
    .should("be.a", "object")
    .then(session => {
      return {
        session,
        ...user,
      };
    });
});

Cypress.Commands.add("updateProfileInfo", (email, location, identity, payoutSettings) => ({
  query: `mutation($email: Email!, $identity: IdentityInput!, $location: Location!, $payoutSettings: PayoutSettingsInput!) {
            updateProfileInfo(email: $email, identity: $identity, location: $location, payoutSettings: $payoutSettings)
        }`,
  variables: { email, identity, location, payoutSettings },
}));

Cypress.Commands.add("fillPayoutSettings", token => {
  cy.fixture("profiles/james_bond").then(profile => {
    cy.visit("http://127.0.0.1:5173/profile", {
      onBeforeLoad(win) {
        win.localStorage.setItem("hasura_token", token);
      },
    });
    cy.wait(500);

    cy.get("[name=firstname]").clear().type(profile.firstname);
    cy.get("[name=lastname]").clear().type(profile.lastname);
    cy.get("[name=email]").clear().type(profile.email);
    cy.get("[name=address]").clear().type(profile.address);
    cy.get("[name=postCode]").clear().type(profile.postCode);
    cy.get("[name=city]").clear().type(profile.city);
    cy.get("[name=country]").clear().type(profile.country);

    cy.get("[data-testid=ETHEREUM_IDENTITY]").click().wait(100);
    cy.get("[name=ethIdentity]").clear().type(profile.ethWalletAddress);

    cy.contains("Save profile").click().wait(WAIT_LONG);
  });
});
