import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import tsdoc from "eslint-plugin-tsdoc";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins:
    {
      tsdoc
    }
  },
  { rules: {
    "@typescript-eslint/no-unused-vars" : "off",
    "init-declarations" : "off",
    "prefer-const" : "off",
    "tsdoc/syntax" : "warn",
  }},
  { ignores: [
    "eslint.config.mjs",
    "tests/*",
    "dist/*",
    "docs/*"
  ]
  }
];