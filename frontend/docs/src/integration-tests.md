# Integration tests

Integration test more complex behaviors, namely those of whole components.

Integration tests, like unit tests, use [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), using more sophisticated features of the latter.

## Boilerplate / setup


### Expect DOM-related stuff

Some content related to the DOM, and accessed with queries / selectors such as `screen.findByText(...)` needs to be compatible with the Vitest `expect` function.

This is possible with the following lines of code that are present in every intregration test:

```typescript
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
```

### Mocking authentication mechanisms

A few things are regularly accessed by components, such as user and auth info.
The token refresh mechanism hence needs to be mocked.

The following code is often used in the beginning of files (and could / should probably be refactored):

```typescript
const HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE = {
  user: {
    id: TEST_USER_ID,
  },
  accessToken: "VALID_ACCESS_TOKEN",
  accessTokenExpiresIn: 900,
  creationDate: new Date().getTime(),
  refreshToken: "test-refresh-token",
};

vi.mock("axios", () => ({
  default: {
    post: (url: string, tokenSet?: TokenSet) => ({
      data: tokenSet?.refreshToken ? HASURA_TOKEN_WITH_VALID_JWT_TEST_VALUE : HASURA_TOKEN_BASIC_TEST_VALUE,
    }),
  },
}));

vi.mock("jwt-decode", () => ({
  default: (jwt: string) => {
    if (jwt === "VALID_ACCESS_TOKEN") {
      return {
        [CLAIMS_KEY]: { [PROJECTS_LED_KEY]: `{"${TEST_PROJECT_ID}"}`, [GITHUB_USERID_KEY]: TEST_GITHUB_USER_ID },
      };
    } else throw "Error";
  },
}));
```

### Mocking history

The browser history can be mocked using our `MemoryRouterProviderFactory` utility wrapper as follows (this is a modified example from the `src/App/App.test.tsx` file:

```typescript
import App, { RoutePaths } from "src/App";

render(<App />, {
  wrapper: MemoryRouterProviderFactory({
	route: `${RoutePaths.Projects}`,
  }),
});
```

### Mocking GraphQL stuff

GraphQL queries / mutations are often called in high-level components and can be mocked using the same wrapper:

```typescript
import App, { RoutePaths } from "src/App";
import { GetProjectsDocument } from "src/__generated/graphql";

const ALL_PROJECTS_RESULT: { data: GetProjectsQueryResult["data"] } = {
  data: {
    projects: [
      {
        __typename: "Projects",
        id: TEST_PROJECT_ID,
		// add other fields
      },
    ],
  },
};

const graphQlMocks = [
  {
    request: {
      query: GetProjectsDocument,
      variables: {
        where: {},
      },
    },
    result: ALL_PROJECTS_RESULT,
  },
];

render(<App />, {
  wrapper: MemoryRouterProviderFactory({
	mocks: graphQlMocks,
  }),
});
```

Be careful to include the `__typename` in the result queries or fragments, otherwise queries might not be recognized properly.
