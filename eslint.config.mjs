import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import _import from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/*.js', '**/*.d.ts', '**/node_modules/', '**/coverage', 'playground/*'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/typescript',
      'plugin:mocha/recommended',
      'plugin:prettier/recommended',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },

      'import/resolver': {
        node: {},

        typescript: {
          project: ['./tsconfig.json'],
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      'mocha/no-mocha-arrows': 0,
      'mocha/no-setup-in-describe': 0,

      'mocha/max-top-level-suites': [
        'warn',
        {
          limit: 2,
        },
      ],

      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      '@typescript-eslint/no-require-imports': ['error'],

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/test/**'],
          optionalDependencies: false,
          peerDependencies: true,
        },
      ],

      'import/no-unresolved': ['error'],

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external'],

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'no-duplicate-imports': ['error'],
      'no-shadow': ['off'],
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/ban-types': ['off'],
      '@typescript-eslint/no-unused-vars': ['off'],
      '@typescript-eslint/no-unsafe-function-type': ['off'],
      'key-spacing': ['error'],
      'no-multiple-empty-lines': ['error'],
      '@typescript-eslint/no-floating-promises': ['off'],
      'no-return-await': ['off'],
      '@typescript-eslint/return-await': ['error'],
      'no-trailing-spaces': ['error'],
      'dot-notation': ['error'],
      'no-bitwise': ['error'],
    },
  },
]
