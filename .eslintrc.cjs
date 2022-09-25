/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  overrides: [
    {
      files: ['cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
    {
      files: ['*.spec.{js,ts,jsx,tsx,vue}'],
      rules: {
        quotes: ['error', 'single'],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
