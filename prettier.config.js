module.exports = {
  arrowParens: "avoid",
  bracketSpacing: true,
  endOfLine: "auto",
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 120,
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindFunctions: ["tv"],
  importOrder: ["^app/(.*)$", "^src/(.*)$", "^components/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
