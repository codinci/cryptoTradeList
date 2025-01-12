import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
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
      complexity: ["error", { max: 15 }],
      "consistent-this": ["error", "self"],
      "default-case": "error",
      "default-param-last": "error",
      "id-length": ["error", { exceptions: ["t", "_"] }],
      "line-comment-position": ["error", { position: "above" }],
      "no-process-exit": "error",
    },
  },
];
