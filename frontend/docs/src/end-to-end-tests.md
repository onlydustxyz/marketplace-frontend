# End-to-end tests

End-to-end tests are test that launch the app, open a browser and test a few critical user paths.

These tests are made using [Playwright](https://playwright.dev/).

## Running the tests

In order to run the test, the app should be running locally - with the frontend running with the `--host` flag, see [this section](./getting-started.html#development-setup) for more info.

You can then run:

```
make playwright/test
```

### Running tests individually

Before running tests individually, the `__populate` test should be run:

```
yarn run playwright test --grep __populate
```

Then any test can be run by specifying a test name's substring after the `--grep` flag:

```
yarn run playwright test --grep TEST_NAME_SUBSTRING
```

### Debug mode

Tests can be run in *debug mode*, i.e. line-per-line with a debugger, using the following command:

```
yarn run playwright test --grep TEST_NAME_SUBSTRING --debug --reporter line
```

This allows to either play the test while following which line the test is one, or stepping through the test line-per-line.


