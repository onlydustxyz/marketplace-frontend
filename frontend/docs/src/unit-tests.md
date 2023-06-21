# Unit tests

Unit tests are used to test utilities and reusable logical components (which are ofter extracted in custom hooks).

They use [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## Testing utility functions

This is like your regular tests using Jest.

## Testing hooks

Hooks can be "rendered" using React Testing Library in order to be tested. 

There is an example in the codebase with the `useRoles` hook:

```typescript
import { renderHook } from "@testing-library/react-hooks";

it("should return Public role when no token is provided", () => {
  const { result } = renderHook(() => useRoles());
  expect(result.current.roles).toEqual([HasuraUserRole.Public]);
});
```

The `rerender` function can be destructured from the result of the `renderHook` function
in order to manually reload a hook.

There is another example of this with the `useRoles` hook:

```typescript
it("should update the loggedIn flag when a token is given", () => {
  const { result, rerender } = renderHook(
    (accessToken?: AccessToken) => useRoles(accessToken)
  );
  expect(result.current.isLoggedIn).toBeFalsy();

  const jwtString = "some-token" as AccessToken;
  rerender(jwtString);

  expect(result.current.isLoggedIn).toBeTruthy();
});
```

