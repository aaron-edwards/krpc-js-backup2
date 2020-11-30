module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "import"],
  env: {
    browser: false,
    es6: true,
    jest: true
  },
  extends: [
    "airbnb-typescript/base",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "@typescript-eslint/indent": "off",
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        argsIgnorePattern: "^_"
      }
    ],
    "import/order": ["error", {
      "groups": [
        "builtin",
        "external",
        "parent",
        ["sibling", "index"]
      ],
      "newlines-between": "always"
    }],
    "no-underscore-dangle": ["warn", {"allowAfterThis": true}]
  }
};

