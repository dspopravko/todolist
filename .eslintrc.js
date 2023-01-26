module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-nested-ternary': 'error',
    'no-duplicate-imports': 'error',
    camelcase: 'off',
    curly: 'error',
    eqeqeq: 'warn',
    'max-depth': ['warn', 3],
    'no-debugger': 'off',
  },
}
