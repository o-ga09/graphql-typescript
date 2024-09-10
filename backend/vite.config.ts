import * as path from 'path';
import { defineConfig } from 'vitest/config';
import env from 'vite-plugin-env-compatible';

export default defineConfig({
	test: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
		hookTimeout: 120000,
		testTimeout: 120000,
	},
	plugins: [env({ prefix: 'VITE', mountedPath: 'process.env' })],
});
