import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            // React e bibliotecas principais
            ["^react", "^next", "^@?\\w"],
            // Imports com alias (@/)
            ["^(@|@/)(.*)$"],
            // Imports relativos (../ ou ./)
            ["^\\u0000", "^\\.\\.(?!/?$)", "^\\./(?=.*/)(?!/?$)", "^\\./?$"],
            // Imports de estilos
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
    },
  },
];

export default eslintConfig;
