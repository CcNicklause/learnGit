module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 'off',
    'no-console': 'error', // 禁止使用console
    'no-unused-vars': 'error', // 禁止定义未使用的变量
    'no-debugger': 'error', // 禁止使用debugger
    'no-var': 'error' // 要求使用 let 或 const 而不是 var
  }
}
