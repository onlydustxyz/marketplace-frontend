export {};

declare global {
  namespace Cypress {
    interface Chainable {
      fixtureOrDefault(path: string, as: string): Chainable<any>;
      graphql(query: GraphQLRequest): Chainable<GraphQLRequest>;
      asAnonymous(): Chainable<Response<any>>;
      asAdmin(): Chainable<Response<any>>;
      asRegisteredUser(user: any): Chainable<Response<any>>;
      property(property: string): Chainable<any>;
      data(path?: string): Chainable<any>;
      errors(): Chainable<any>;
      visitApp({ path, token }?: { path?: string; token?: string }): Chainable<AUTWindow>;
    }
  }
}

export type Url = string;
export type Uuid = string;
export type GraphQLRequest = {
  query: string;
  variables?: object;
  wait?: number;
};

const GRAPHQL_TIMEOUT = 10000;
const READ_BODY_PROPERTY_TIMEOUT = 100;
export const WAIT_SHORT = 100;
export const WAIT_LONG = 700;

Cypress.Commands.add("graphql", query => {
  return cy.wrap(query);
});

Cypress.Commands.add(
  "asAnonymous",
  {
    prevSubject: true,
  },
  (query: GraphQLRequest) => {
    expect(JSON.stringify(query)).to.be.a("string");
    cy.request({
      method: "POST",
      url: "/v1/graphql",
      body: { query: query.query, variables: query.variables },
      timeout: GRAPHQL_TIMEOUT,
    }).then(response => {
      if (query.wait) {
        cy.wait(query.wait).then(() => {
          return response;
        });
      } else {
        return response;
      }
    });
  }
);

Cypress.Commands.add(
  "asAdmin",
  {
    prevSubject: true,
  },
  (query: GraphQLRequest) => {
    expect(JSON.stringify(query)).to.be.a("string");
    cy.request({
      method: "POST",
      url: "/v1/graphql",
      body: { query: query.query, variables: query.variables },
      headers: {
        "X-Hasura-Admin-Secret": Cypress.env("hasuraAdminSecret"),
      },
      timeout: GRAPHQL_TIMEOUT,
    }).then(response => {
      if (query.wait) {
        cy.wait(query.wait).then(() => {
          return response;
        });
      } else {
        return response;
      }
    });
  }
);

Cypress.Commands.add(
  "asRegisteredUser",
  {
    prevSubject: true,
  },
  (query: GraphQLRequest, user: any) => {
    cy.signinUser(user)
      .then(({ session }) => {
        expect(JSON.stringify(query)).to.be.a("string");
        cy.request({
          method: "POST",
          url: "/v1/graphql",
          body: { query: query.query, variables: query.variables },
          headers: {
            "X-Hasura-Role": "registered_user",
            Authorization: `Bearer ${session.accessToken}`,
          },
          timeout: GRAPHQL_TIMEOUT,
        });
      })
      .then(response => {
        //TODO: remove this once refactoring with populated data is done
        if (query.wait) {
          cy.wait(query.wait).then(() => {
            return response;
          });
        } else {
          return response;
        }
      });
  }
);

Cypress.Commands.add(
  "property",
  {
    prevSubject: true,
  },
  (object: object, property: string) => {
    cy.wrap(object, { timeout: READ_BODY_PROPERTY_TIMEOUT })
      .should($object => {
        expect($object, JSON.stringify($object)).to.have.deep.nested.property(property).that.is.not.null;
      })
      .its(property, { timeout: READ_BODY_PROPERTY_TIMEOUT });
  }
);

Cypress.Commands.add(
  "data",
  {
    prevSubject: true,
  },
  (response: Cypress.Response<any>, path?: string) => {
    cy.wrap(response, { timeout: READ_BODY_PROPERTY_TIMEOUT })
      .should("have.property", "body")
      .property("data")
      .then(data => {
        if (path) {
          return cy.wrap(data).property(path);
        }
        return data;
      });
  }
);

Cypress.Commands.add(
  "errors",
  {
    prevSubject: true,
  },
  (response: Cypress.Response<any>) => {
    cy.wrap(response, { timeout: READ_BODY_PROPERTY_TIMEOUT }).should("have.property", "body").property("errors");
  }
);

Cypress.Commands.add("fixtureOrDefault", (path, as) => {
  cy.exec(`if [ ! -f "cypress/fixtures/${path}" ]; then echo "{}" > cypress/fixtures/${path}; fi`);
  cy.fixture(path).as(as);
});

Cypress.Commands.add("visitApp", ({ path, token }: { path?: string; token?: string } = {}) =>
  cy.visit(`http://localhost:5173/${path}`, {
    onBeforeLoad(win) {
      if (token) {
        win.localStorage.setItem("hasura_token", token);
      }
    },
  })
);
