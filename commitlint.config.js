module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "guides",
        "design-system",
        "components",
        "dates",
        "overlays",
        "src",
        "config",
      ],
    ],
    "scope-case": [2, "always", "kebab-case"],
  },
};
