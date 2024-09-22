import { createPool, PoolConnection } from 'mysql2/promise';

export let dbconnection: PoolConnection;

// Create a MySQL connection
export const createConnection = async () => {
	const pool = await createPool({
		host: 'localhost',
		port: 3306,
		user: 'user',
		password: 'pass',
		database: 'testdb',
	});

	return await pool.getConnection();
};

// Close the MySQL connection for Test
export const createTestdbConnection = async (param: { host; user; port; password; dbname }) => {
	const pool = await createPool({
		host: param.host,
		port: param.port,
		user: param.user,
		password: param.password,
		database: param.dbname,
	});

	dbconnection = await pool.getConnection();
};

// Close the MySQL connection
export const closeConnection = async (connection) => {
	connection.release();
};
