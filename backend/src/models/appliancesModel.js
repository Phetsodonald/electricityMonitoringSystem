import pool from "../config/database";

export const getAllAppliances = async () => {
    const query = "SELECT * FROM appliances ORDER BY id ASC"
    const data = await pool.query(query);
    return data.rows;
}