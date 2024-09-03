import { expect, test } from 'vitest';

test('adds 1 + 2 to equal 3', () => {
	const env = process.env.VITE_MYSQL_DATABASE;
	const result = sum(1, 2);
	expect(result).toBe(3);
	expect(env).toBe('testdb');
});

function sum(a, b) {
	return a + b;
}
