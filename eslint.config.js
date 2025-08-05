// @ts-check
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import js from '@eslint/js'
import ts from 'typescript-eslint'
import css from '@eslint/css'
import vue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import tailwind from 'eslint-plugin-tailwindcss'
import globals from 'globals'
import format from 'eslint-plugin-format'

export default ts.config(
  { ignores: ['**/coverage', '**/dist'] },
  {
    files: ['**/*.{ts,vue}'],
    extends: [
      js.configs.recommended,
      ...ts.configs.recommended,
      ...vue.configs['flat/recommended'],
      css.configs.recommended,
      ...tailwind.configs['flat/recommended'],
      stylistic.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: ts.parser,
      },
    },
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      '@stylistic/object-curly-spacing': 'error',
      '@typescript-eslint/no-unused-vars': ["error", { "ignoreRestSiblings": true }]
    },
    settings: {
      tailwindcss: {
        config:
          dirname(fileURLToPath(import.meta.url)) + '/src/assets/css/tailwind.css',
      },
    },
  },
  {
    files: ['**/*.{css}'],
    extends: [
      css.configs.recommended,
      ...tailwind.configs['flat/recommended'],
      stylistic.configs.recommended,
    ],
    languageOptions: {
      parser: format.parserPlain,
    },
    plugins: {
      format,
    },
    rules: {
      'format/prettier': ['error', { parser: 'css' }],
    },
  },
)
