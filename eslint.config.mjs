import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import pluginImport from 'eslint-plugin-import';
import pluginOptimizeRegex from 'eslint-plugin-optimize-regex';
import parser from '@typescript-eslint/parser';
import i18next from 'eslint-plugin-i18next';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		ignores: ['build/**/*'],
		languageOptions: {
			parser: parser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: globals.browser,
		},
		plugins: {
			'@typescript-eslint': tseslint,
			react: pluginReact,
			import: pluginImport,
			'optimize-regex': pluginOptimizeRegex,
			'i18next': i18next,
		},
		rules: {
			...i18next.configs.recommended.rules,
			...pluginJs.configs.recommended.rules,
			...tseslint.configs.recommended.rules,
			...pluginReact.configs.flat.recommended.rules,
			...pluginImport.configs.errors.rules,
			...pluginImport.configs.warnings.rules,
			'quotes': ['error', 'single'],
			'no-undef': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'no-underscore-dangle': 'off',
			'jsx-a11y/control-has-associated-label': 'off',
			'react/react-in-jsx-scope': 'off',
			'react/no-deprecated': 'off',
			'@typescript-eslint/no-require-imports': 'warn',
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'interface',
					format: ['PascalCase'],
					custom: {
						regex: '^I[A-Z]',
						match: true,
					},
				},
				{
					selector: 'variable',
					format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
					leadingUnderscore: 'allowDouble',
					trailingUnderscore: 'allowDouble',
				},
				{
					selector: 'function',
					format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
					leadingUnderscore: 'allow',
					trailingUnderscore: 'allow',
				},
				{
					selector: 'class',
					format: ['PascalCase'],
				},
			],
			'no-cond-assign': 'off',
			'optimize-regex/optimize-regex': 'warn',
			'class-methods-use-this': 'off',
			indent: [2, 'tab'],
			'no-tabs': 'off',
			'lines-between-class-members': [
				'error',
				'always',
				{
					exceptAfterSingleLine: true,
				},
			],
			'react/jsx-filename-extension': [
				2,
				{
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			],
			'import/no-unresolved': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'import/extensions': [
				'error',
				'ignorePackages',
				{
					js: 'never',
					mjs: 'never',
					jsx: 'never',
					ts: 'never',
					tsx: 'never',
				},
			],
			'linebreak-style': 0,
			'no-use-before-define': [
				'error',
				{
					functions: false,
					classes: false,
				},
			],
			'no-plusplus': 'off',
			'no-shadow': 'off',
			'no-bitwise': 'off',
			'import/prefer-default-export': 'off',
			'max-len': [
				'error',
				{
					code: 120,
					ignoreComments: true,
				},
			],
			'no-trailing-spaces': 'off',
			'react/require-default-props': 'off',
			'arrow-parens': 'off',
			'react/no-unused-class-component-methods': 'off',
			'react/prop-types': 0,
			'react/jsx-props-no-spreading': 'off',
			'react/jsx-indent': [2, 'tab'],
			'react/jsx-indent-props': [2, 'tab'],
			'react/function-component-definition': [
				2,
				{
					namedComponents: 'arrow-function',
				},
			],
			'no-param-reassign': 0,
			'global-require': 0,
			'i18next/no-literal-string': [
				'error',
				{
					markupOnly: true,
					ignoreAttribute: ['data-testid', 'to'],
				}],
			'semi': ['error', 'always'],
			'object-curly-spacing': ['error', 'always'],
		},
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
				},
			},
			react: {
				version: 'detect', // Автоматическое определение версии React
			},
		},
	},
	{
		files: ['*.tsx'],
		rules: {
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'variable',
					format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
					leadingUnderscore: 'allowDouble', // Разрешает двойные подчеркивания в начале
					trailingUnderscore: 'allowDouble', // Разрешает двойные подчеркивания в конце
				},
				{
					selector: 'variable',
					format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
					leadingUnderscore: 'allow',
					trailingUnderscore: 'allow',
				},
			],
		},
	},
];

