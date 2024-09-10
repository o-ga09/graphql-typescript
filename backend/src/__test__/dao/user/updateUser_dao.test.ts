import { expect, test } from 'vitest';
import { UserDao } from '@/lib/dao/user';

test('updateUser should update the user details', async () => {
	// Arrange
	const userDao = new UserDao();
	const userId = '123';
	const name = 'John Doe';
	const email = 'john.doe@example.com';
	const address = '123 Main St';
	const sex = 1;
	const birthday = '1990-01-01';
	const password = 'password123';

	// Act
	await userDao.updateUser({ userId, name, email, address, sex, birthday, password });

	// Assert
	const updatedUser = await userDao.getUserDetail(userId);
	expect(updatedUser).not.toBeNull();
	expect(updatedUser?.name).toBe(name);
	expect(updatedUser?.email).toBe(email);
	expect(updatedUser?.address).toBe(address);
	expect(updatedUser?.sex).toBe(sex);
	expect(updatedUser?.birthday).toBe(birthday);
	expect(updatedUser?.password).toBe(password);
});
