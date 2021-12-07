module.exports = {
  extends: [
    '../.eslintrc.js',
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
};
