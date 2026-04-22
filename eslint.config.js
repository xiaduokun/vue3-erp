import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['node_modules/**', 'dist/**', '.git/**']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tsParser
      }
    },
    plugins: {
      vue: pluginVue
    },
    rules: {
      'no-undef': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'vue/no-unused-vars': 'warn',
      'vue/no-mutating-props': 'error',
      'vue/valid-template-root': 'error'
    }
  }
]
