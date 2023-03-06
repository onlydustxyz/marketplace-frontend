# Cypress tests

## Lifecycle

1. The `__populate` test runs first and:
    1. Cleanup the DB by truncating all necessary tables.
    2. Populate data by reading fixtures (`users`, `projects`, `repos`, and `payments` in `fixtures` folder) and calling
    appropriate mutations accordingly.
    3. Save *augmented* fixtures in `fixtures/populated` folder. By "augmented", we mean fixtures with their corresponding
    ID (eg. when a project is created by calling a mutation, its ID is returned, and saved in the fixture file for further use).
    4. Dump the DB.
2. Then, before each test **suite** (a test suite corresponds to a test file), the DB is restored from the dump previously
created.
3. Before each test, *augmented* fixtures are loaded and made accessible in tests through `this.users` and `this.projects` variables.
4. Test runs

TLDR;

- Populating data into the DB is done only once, before all other test suites.
- The DB is restored with populated data before each test **suite**.
- As a convenience, `users` and `projects` fixtures are loaded for you before each tests. They contain users IDs and projects IDs.

## How to write e2e tests

- Write entire scenarios of a user doing multiple actions, not some kind of unit-test-like tests.
- Use populated data. Add more to fixtures if needed.
- In some specific cases, you might want to setup some data that must not be part of common populated
data. To do so, simply use `before` and/or `beforeEach` methods as usual.
