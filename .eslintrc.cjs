/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "@hono/esLint-config",
    "prettier",
    "plugin:perfectionist/recommended-natural"
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        disallowTypeAnnotations: true,
        fixStyle: "inline-type-imports",
        prefer: "type-imports"
      }
    ],
    "import/no-duplicates": "warn"
  }
};
