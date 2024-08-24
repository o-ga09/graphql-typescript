import * as path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
		hookTimeout: 120000,
		testTimeout: 120000,
	},
});
