import { defineConfig, lazyPlugins } from "vite-plus";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: {
    plugins: ["oxc", "typescript", "unicorn", "react"],
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
    categories: {
      correctness: "warn",
    },
    env: {
      builtin: true,
      browser: true,
      es2024: true,
    },
    ignorePatterns: [
      "**/dist",
      "**/node_modules",
      "**/build",
      "**/.cache",
      "**/vite.config.ts",
      "**/pnpm-lock.yaml",
    ],
    rules: {
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": "error",
      "typescript/no-explicit-any": "error",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    sortTailwindcss: {},
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: ["dist", "node_modules", "pnpm-lock.yaml"],
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: lazyPlugins(() => [
    { enforce: "pre", ...mdx({ providerImportSource: "@mdx-js/react" }) },
    react({ include: /\.(mdx|jsx|tsx)$/ }),
    tailwindcss(),
  ]),
});
