import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "array-callback-return": [
        "error",
        { allowImplicit: true, checkForEach: true },
      ],
      "arrow-body-style": "error",
      "block-scoped-var": "error",
      "class-methods-use-this": "error",
      complexity: ["error", { max: 10 }],
      "consistent-this": ["error", "self"],
      "default-case": "error",
      "default-param-last": "error",
      "func-name-matching": ["error", { considerPropertyDescriptor: true }],
      "func-names": ["error", "as-needed"],
      "func-style": ["error", "declaration"],
      "id-length": ["error", { exceptions: ["t", "_"] }],
      "line-comment-position": ["error", { position: "above" }],
      "no-console": "warn",
      "no-process-exit": "error",
    },
  },
];
