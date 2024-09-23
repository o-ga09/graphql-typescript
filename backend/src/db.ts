import { createPool, PoolConnection } from 'mysql2/promise';

export let dbconnection: PoolConnection;

// Create a MySQL connection
export const createConnection = async () => {
	const pool = await createPool({
		host: process.env.MYSQL_HOST,
		port: Number(process.env.MYSQL_PORT),
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
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
