import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  // Global ignores
  {
    ignores: [
      'node_modules/**',
      '.DS_Store',
      '*.tsbuildinfo',
      '.react-router/**',
      'build/**',
      '.mf/**',
      '.wrangler/**',
      '.dev.vars*',
      'app/components/icons/**', // Generated icon files
    ],
  },

  // Base configuration for all JavaScript/TypeScript files
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      sourceType: 'module',
    },
    plugins: {
      perfectionist,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...perfectionist.configs['recommended-natural'].rules,
    },
  },

  // React configuration
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'jsx-a11y': jsxA11y,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
    },
    settings: {
      formComponents: ['Form'],
      linkComponents: [
        { linkAttribute: 'to', name: 'Link' },
        { linkAttribute: 'to', name: 'NavLink' },
      ],
      react: {
        version: 'detect',
      },
    },
  },

  // TypeScript configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
        Cloudflare: 'readonly',
        ExportedHandler: 'readonly',
        Headers: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLHeadingElement: 'readonly',
        HTMLParagraphElement: 'readonly',
        JSX: 'readonly',
        React: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        SVGSVGElement: 'readonly',
      },
      parser: typescriptParser,
    },
    plugins: {
      '@typescript-eslint': typescript,
      import: importPlugin,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      'import/no-unresolved': ['error', {
        ignore: ['^virtual:'],
      }],
    },
    settings: {
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },

  // Prettier - must be last to override other formatting rules
  prettier,

  // Special handling for config files
  {
    files: ['*.config.{js,ts,mjs}', 'eslint.config.js'],
    languageOptions: {
      globals: {
        node: true,
      },
    },
  },
];