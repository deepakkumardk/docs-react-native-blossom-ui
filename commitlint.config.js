module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["guides", "design-system", "components", "src", "config"],
    ],
    "scope-case": [2, "always", "kebab-case"],
  },
};
