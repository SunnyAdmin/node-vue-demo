module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': ["error", 4],
    'space-before-function-paren': ['error', 'never'],
    'semi': 0,
    "quotes": 0,
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }]
  }
}
