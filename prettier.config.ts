import { type Config } from "prettier"

const config: Config = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  trailingComma: "all",
  jsxSingleQuote: false,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  plugins: ["prettier-plugin-tailwindcss"],
}

export default config
