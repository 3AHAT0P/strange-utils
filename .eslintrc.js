module.exports = {
  root: true,
  settings: {
    'import/resolver': {
      typescript: {}
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript/base',
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  plugins: [
    "@typescript-eslint",
    'import',
  ],
  rules: {
    '@typescript-eslint/no-inferrable-types': ['off'],
    '@typescript-eslint/unbound-method': ['warn'],
    '@typescript-eslint/require-await': ['warn'],
    '@typescript-eslint/naming-convention': ['off'], // @TODO: Configre this rule later
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    '@typescript-eslint/no-unsafe-member-access': ['off'], // @WHY: becouse it's rule is broken
    '@typescript-eslint/no-unsafe-assignment': ['off'], // @WHY: becouse it's rule is broken
    '@typescript-eslint/no-unsafe-call': ['off'], // @WHY: becouse it's rule is broken
    '@typescript-eslint/no-unsafe-return': ['off'], // @WHY: becouse it's rule is broken
    'import/prefer-default-export': ['off'],
    'no-underscore-dangle': ['off'],
    'no-restricted-syntax': ['off'],
    'no-void': ['warn'],
    'no-continue': ['off'],
    'class-methods-use-this': ['warn'],
    'consistent-return': ['off'],
    'no-async-promise-executor': ['off'],
    'no-await-in-loop': ['off'],
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'eol-last': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
  },
};
