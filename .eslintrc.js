module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-alert": process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': 'off',
    'space-unary-ops': 'off',
    'no-trailing-spaces': 'off',
    'space-before-function-paren': 'off',
    'no-irregular-whitespace':'off',
    "no-unused-vars":0,
    'no-mixed-spaces-and-tabs':'off',
    "no-dupe-keys": 'error',//在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-duplicate-case": 'error',//switch中的case标签不能重复
    "no-redeclare":'error',//禁止重复声明变量
    // "unexpected-character-in-attribute-name": 1, 
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}