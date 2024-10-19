import { createPool, PoolConnection, Pool } from 'mysql2/promise';

export let dbPool: Pool;
export let Testdbconnection: PoolConnection;

// Create a MySQL connection
export const createConnection = async () => {
	dbPool = await createPool({
		host: process.env.MYSQL_HOST,
		port: Number(process.env.MYSQL_PORT),
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
	});
};

export const getConnection = async () => {
	return await dbPool.getConnection();
};

export const closeConnection = async () => {
	if (dbPool) {
		await dbPool.end();
	}
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

	Testdbconnection = await pool.getConnection();
};
