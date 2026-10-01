import pool from "../config/database.js";

export const createUser = async (name, email, password) => {
    const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email";
    const data = await pool.query(query, [name, email, password]);

    return data.rows[0];
};