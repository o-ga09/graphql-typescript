import globals from 'globals';
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
         ...globals.browser,
          ...globals.node,
          ...globals.es2015, 
      }
    },
  },
  {
    ignores: [
      "node_modules",
      "dist",
      "src/generated/*.ts",
    ]
  }
]
