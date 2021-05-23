module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    semi: [ 'error', 'always' ],
    quotes: [ 'error', 'single' ],
    indent: [ 'warn', 2 ],
    'comma-dangle': [ 'warn', 'always-multiline' ],
    'arrow-parens': [ 'error', 'always' ],
    'object-curly-spacing': [
      'warn',
      'always',
      {
        'arraysInObjects': false,
        'objectsInObjects': false,
      },
    ],
    'array-bracket-spacing': [
      'warn',
      'always',
      {
        'singleValue': false,
        'objectsInArrays': false,
        'arraysInArrays': false,
      },
    ],
    'space-before-function-paren': [ 'error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      { allow: [ 'warn', 'error' ]},
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
};
