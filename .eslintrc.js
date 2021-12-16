module.exports = {
  root: true,
  overrides: [
    {
      files: ["src/**/*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint", "prettier"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "no-console": 1,
      },
    },
  ],
};
