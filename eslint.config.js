const github = require('eslint-plugin-github')
const importPlugin = require('eslint-plugin-import')
const jest = require('eslint-plugin-jest')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const globals = require('globals')

function withoutPlugins(config) {
  const {plugins: _plugins, ...rest} = config
  return rest
}

module.exports = [
  // Previously defined in .eslintignore
  {
    ignores: ['**/dist/', '**/lib/', '**/test/', '**/node_modules/', '**/jest.config.js']
  },
  // plugin:github/recommended
  github.getFlatConfigs().recommended,
  // plugin:import/recommended and plugin:import/typescript
  // (the "import" plugin itself is already registered by the github preset; registering a
  // second copy would throw "Cannot redefine plugin", so only the rules/settings are taken)
  withoutPlugins(importPlugin.flatConfigs.recommended),
  withoutPlugins(importPlugin.flatConfigs.typescript),
  {
    // ESLint 8 only linted .js by default; the old run used --ext for all of these
    files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
    plugins: {
      jest,
      '@typescript-eslint': tsPlugin
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 9,
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 9,
        sourceType: 'module',
        project: './tsconfig.json'
      },
      globals: {
        ...globals.node,
        ...globals.es6,
        ...jest.environments.globals.globals
      }
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true
      }
    },
    rules: {
      'i18n-text/no-en': 'off',
      'eslint-comments/no-use': 'off',
      // eslintrc "filenames/match-regex" is "github/filenames-match-regex" in the flat preset
      'github/filenames-match-regex': 'off',
      'import/no-namespace': 'off',
      'no-console': 'off',
      'one-var': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_'}
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/explicit-member-accessibility': ['error', {accessibility: 'no-public'}],
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      camelcase: 'off',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/explicit-function-return-type': ['error', {allowExpressions: true}],
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-extraneous-class': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/prefer-for-of': 'warn',
      '@typescript-eslint/prefer-function-type': 'warn',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      semi: 'off',
      '@typescript-eslint/unbound-method': 'error',
      // see https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/extensions.md
      'import/extensions': ['error', 'never', {pattern: {json: 'ignorePackages'}}]
    }
  }
]
