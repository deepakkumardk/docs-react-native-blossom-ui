module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", ["guides", "components"]],
    "scope-case": [2, "always", "kebab-case"],
  },
};
