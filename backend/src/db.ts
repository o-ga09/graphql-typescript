import mysql, { createPool, PoolConnection } from 'mysql2/promise';

export let dbconnection: mysql.Connection;
export let Testdbconnection: PoolConnection;

// Create a MySQL connection using DSN
export const createConnection = async () => {
	const dsn = process.env.DATABASE_URL;
	dbconnection = await mysql.createConnection(dsn);
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
export const createTestdbConnection = async () => {
	const dsn = process.env.DATABASE_URL;
	const pool = await createPool(dsn);
	Testdbconnection = await pool.getConnection();
};
