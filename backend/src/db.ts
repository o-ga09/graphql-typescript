import mysql, { createPool, PoolConnection } from 'mysql2/promise';

export let dbconnection: mysql.Connection;
export let Testdbconnection: PoolConnection;

// Create a MySQL connection
export const createConnection = async () => {
	dbconnection = await mysql.createConnection({
		host: process.env.MYSQL_HOST,
		port: Number(process.env.MYSQL_PORT),
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
	});
};

export const getConnection = async () => {
	dbconnection.connect();
};

export const closeConnection = async () => {
	if (dbconnection) {
		await dbconnection.end();
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
