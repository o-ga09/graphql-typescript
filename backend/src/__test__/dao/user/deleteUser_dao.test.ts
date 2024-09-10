import { UserDao } from '@/lib/dao/user';
import { expect, test } from 'vitest';

test('deleteUser should delete the user', async () => {
	// Arrange
	const userDao = new UserDao();
	const userId = '456';

	// Act
	await userDao.deleteUser(userId);

	// Assert
	const deletedUser = await userDao.getUserDetail(userId);
	expect(deletedUser).toBeNull();
});
