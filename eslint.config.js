import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            /**
             * 类型定义符号后面需要统一空格
             */
            '@typescript-eslint/type-annotation-spacing': [
                'error',
                {
                    before: false,
                    after: true
                }
            ],

            /**
             * 缩进空格
             */
            indent: ['error', 4],

            /**
             * 最高代码行数
             */
            'max-lines': ['error', { max: 1000 }],

            /**
             * 导入排序
             */
            'sort-imports': [
                'error',
                {
                    ignoreCase: false,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'],
                    allowSeparatedGroups: false
                }
            ],

            /**
             * 注释间隔
             */
            'spaced-comment': ['error', 'always', { markers: ['/'] }],

            /**
             * 注释换行
             */
            'lines-around-comment': [
                'error',
                {
                    beforeBlockComment: true,
                    beforeLineComment: true
                }
            ],

            /**
             * 不允许块内有多余的换行，关闭校验
             */
            'padded-blocks': ['off']
        }
    }
)
