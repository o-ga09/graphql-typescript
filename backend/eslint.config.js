// eslint.config.js
const globals = require('globals');
const parser = require('@typescript-eslint/parser');

module.exports = [
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
			parser: parser,
			globals: {
				amd: 'readonly',
				...Object.fromEntries(Object.entries(globals).map(([key, value]) => [key, 'readonly'])),
			},
		},
		plugins: {
			'@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
		},
		rules: {
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
		},
		ignores: [
			// .eslintignoreの内容をここに��動
			'node_modules/',
			'dist/',
			'build/',
		],
	},
];
