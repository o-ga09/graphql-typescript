import { UserDao } from '@/lib/dao/user';
import { expect, test } from 'vitest';

test('createUser should create a new user', async () => {
	// Arrange
	const userDao = new UserDao();
	const userId = '456';
	const name = 'Jane Smith';
	const email = 'jane.smith@example.com';
	const address = '456 Elm St';
	const sex = 2;
	const birthday = '1995-05-05';
	const password = 'password456';

	// Act
	await userDao.createUser({ userId, name, email, address, sex, birthday, password });

	// Assert
	const createdUser = await userDao.getUserDetail(userId);
	expect(createdUser).not.toBeNull();
	expect(createdUser?.name).toBe(name);
	expect(createdUser?.email).toBe(email);
	expect(createdUser?.address).toBe(address);
	expect(createdUser?.sex).toBe(sex);
	expect(createdUser?.birthday).toBe(birthday);
	expect(createdUser?.password).toBe(password);
});
