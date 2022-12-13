import "./common";

Cypress.Commands.add("createUser", () => {
    const email = `cypress-${Date.now()}@onlydust.xyz`;
    const password = "Str0ngPassw#ord-94|%";

    cy.request({
        method: "POST",
        url: "http://localhost:4000/signup/email-password",
        body: {
            email: email,
            options: {
                allowedRoles: ["me", "public", "registered_user"],
                defaultRole: "registered_user",
                displayName: "John Smith",
                locale: "en",
            },
            password: password,
        },
        failOnStatusCode: false,
    }).then(() => {
        return cy
            .graphqlAsAdmin(
                `{
                users(where: {email: {_eq: "${email}"}}) {
                    id
                }
            }`
            )
            .data("users")
            .its(0)
            .its("id")
            .should("be.a", "string")
            .then((userId) => {
                cy.graphqlAsAdmin(
                    `mutation {
                    updateUser(pk_columns: {id: "${userId}"}, _set: {emailVerified: true}) {
                      id
                    }
                  }`
                )
                    .data("updateUser.id")
                    .should("be.a", "string")
                    .then(() => {
                        return {
                            id: userId,
                            email,
                            password,
                        };
                    });
            });
    });
});

Cypress.Commands.add(
    "withGithubProvider",
    {
        prevSubject: true,
    },
    (user, githubUserId) => {
        cy.graphqlAsAdmin(
            `mutation {
        insertAuthUserProvider( object: {userId: "${user.id}", providerId: "github", providerUserId: "${githubUserId}", accessToken: "fake-token"},
                                onConflict: {constraint: user_providers_provider_id_provider_user_id_key, update_columns: accessToken}) {
            id
        }
      }`
        )
            .data()
            .its("insertAuthUserProvider.id")
            .should("be.a", "string")
            .then((_) => {
                user.githubUserId = githubUserId;
                return user;
            });
    }
);

Cypress.Commands.add("signinUser", (user) => {
    cy.request("POST", "http://localhost:4000/signin/email-password", {
        email: user.email,
        password: user.password,
    })
        .its("body.session.accessToken")
        .should("be.a", "string")
        .then((accessToken) => {
            return {
                accessToken: accessToken,
                ...user,
            };
        });
});

Cypress.Commands.add(
    "updateProfileInfo",
    (requestor, email, location, identity, payout_settings) => {
        return cy.graphqlAsUser(
            requestor,
            `mutation {
        updateProfileInfo(email: "${email}", identity: ${identity}, location: ${location}, payoutSettings: ${payout_settings})
    }`
        );
    }
);
