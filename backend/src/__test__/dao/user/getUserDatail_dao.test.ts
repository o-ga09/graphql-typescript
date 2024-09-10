import { expect, test } from 'vitest';
import { UserDao } from '../../../lib/dao/user';

test('getUserList should return an array of users', async () => {
	// Arrange
	const userDao = new UserDao();

	// Act
	const userList = await userDao.getUserList();

	// Assert
	expect(Array.isArray(userList)).toBe(true);
});

test('getUserList should return the correct number of users', async () => {
	// Arrange
	const userDao = new UserDao();

	// Act
	const userList = await userDao.getUserList();

	// Assert
	expect(userList.length).toBe(3); // Replace 3 with the expected number of users
});

test('getUserList should return users with the correct properties', async () => {
	// Arrange
	const userDao = new UserDao();

	// Act
	const userList = await userDao.getUserList();

	// Assert
	userList.forEach((user) => {
		expect(user).toHaveProperty('userId');
		expect(user).toHaveProperty('name');
		expect(user).toHaveProperty('email');
		expect(user).toHaveProperty('address');
		expect(user).toHaveProperty('sex');
		expect(user).toHaveProperty('birthday');
		expect(user).toHaveProperty('password');
	});
});
