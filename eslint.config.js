import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {ignores: ['dist']},
    {
        // TODO:
        //  For prod,
        //  Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
        //  Optionally add `...tseslint.configs.stylisticTypeChecked`
        //  Install `eslint-plugin-react` and update the config:
        //  import react from 'eslint-plugin-react'

        //  TODO: For prod:
        //   settings: { react: { version: '18.3' } },
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            // // for prod
            // parserOptions: {
            //     project: ['./tsconfig.node.json', './tsconfig.app.json'],
            //     tsconfigRootDir: import.meta.dirname,
            // },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true},
            ],
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',

            // // TODO: For prod
            //     ...react.configs.recommended.rules,
            //     ...react.configs['jsx-runtime'].rules,
        },
    },
)
