import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
	const saltRounds = 10;
	return await bcrypt.hash(password, saltRounds);
};

console.log('PassedTestUser01', await hashPassword('!PassedTestUser01'));
console.log('PassedTestUser02', await hashPassword('!PassedTestUser02'));
console.log('PassedTestUser03', await hashPassword('!PassedTestUser03'));
