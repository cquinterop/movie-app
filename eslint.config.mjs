import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.config({
		extends: ['next/core-web-vitals', 'next/typescript'],
		plugins: ['@typescript-eslint', 'prettier', 'react', 'react-hooks'],
		rules: {
			'prettier/prettier': 'error',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/sort-type-constituents': 'error',
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			'react/jsx-sort-props': ['warn', { callbacksLast: true, multiline: 'first', shorthandFirst: true }],
		},
	}),
];

export default eslintConfig;
