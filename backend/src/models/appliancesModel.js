import pool from "../config/database.js";

export const createAppliance = async (user_id, name, voltage, current) => {
    const query = "INSERT INTO appliances (user_id, name, voltage, current) VALUES($1, $2, $3, $4) RETURNING id, user_id, name, voltage, current";
    const data = await pool.query(query, [user_id, name, voltage, current]);

    return data.rows[0]
}