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
            .graphql({
                query: `query($email: citext!) {
                    users(where: {email: {_eq: $email}}) {
                        id
                    }
                }`,
                variables: { email }
            })
            .asAdmin()
            .data("users")
            .its(0)
            .its("id")
            .should("be.a", "string")
            .then((userId) => {
                cy.graphql({
                    query: `mutation($userId: uuid!) {
                        updateUser(pk_columns: {id: $userId}, _set: {emailVerified: true}) {
                            id
                        }
                    }`,
                    variables: { userId }
                })
                    .asAdmin()
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
        cy.graphql({
            query: `mutation($userId: uuid!, $githubUserId: String!) {
                insertAuthUserProvider( object: {userId: $userId, providerId: "github", providerUserId: $githubUserId, accessToken: "fake-token"},
                                        onConflict: {constraint: user_providers_provider_id_provider_user_id_key, update_columns: userId}) {
                    id
                }
            }`,
            variables: { userId: user.id, githubUserId: githubUserId.toString() }
        })
            .asAdmin()
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
        .its("body.session")
        .should("be.a", "object")
        .then((session) => {
            return {
                session,
                ...user,
            };
        });
});

Cypress.Commands.add(
    "updateProfileInfo",
    (email, location, identity, payoutSettings) => ({
            query: `mutation($email: Email!, $identity: IdentityInput!, $location: Location!, $payoutSettings: PayoutSettingsInput!) {
            updateProfileInfo(email: $email, identity: $identity, location: $location, payoutSettings: $payoutSettings)
        }`,
        variables: { email, identity, location, payoutSettings }
    })
);
