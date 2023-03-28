module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
    "plugin:storybook/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier", "no-relative-import-paths"],
  rules: {
    quotes: [
      "warn",
      "double",
      {
        avoidEscape: true,
      },
    ],
    "prettier/prettier": [
      "error",
      {
        arrowParens: "avoid",
        bracketSpacing: true,
        endOfLine: "auto",
        trailingComma: "es5",
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        printWidth: 120,
      },
    ],
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-relative-import-paths/no-relative-import-paths": ["error", { allowSameFolder: true, rootDir: "frontend" }],
  },
  ignorePatterns: [
    "frontend/dist/*",
    "frontend/test/*",
    "frontend/src/__generated",
    "cypress/*",
    "playwright/__generated",
    "playwright/fixtures/__generated",
    "app.json",
    "scripts/*",
    "dist/*",
  ],
};
