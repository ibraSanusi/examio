import { defineConfig } from "eslint-define-config";

export default defineConfig({
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["react", "react-hooks", "@typescript-eslint", "tailwindcss"],
  rules: {
    // reglas de código
    "no-unused-vars": "warn",
    "no-undef": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",

    // tailwindcss plugin
    "tailwindcss/classnames-order": "warn",
    "tailwindcss/enforces-shorthand": "warn",
    "tailwindcss/no-custom-classname": "off", // opcional
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});
