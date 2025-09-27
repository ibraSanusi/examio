import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import { defineConfig } from "eslint/config"

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        plugins: { js },
        extends: ["js/recommended"],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser, ...globals.node, ...globals.jest,
            }
        },
    },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
            "react/react-in-jsx-scope": "off",
            // "no-console": "warn",
        },
    },
])
