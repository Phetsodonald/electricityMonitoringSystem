import pool from "../config/database.js";

export const createAppliance = async (user_id, name, voltage, current) => {
    const query = "INSERT INTO appliances (user_id, name, voltage, current) VALUES($1, $2, $3, $4) RETURNING id, user_id, name, voltage, current";
    const data = await pool.query(query, [user_id, name, voltage, current]);

    return data.rows[0]
}

export const getAppliances = async (user_id) => {
    const query = `SELECT * FROM appliances WHERE user_id = $1`;
    const data = await pool.query(query, [user_id]);

    return data.rows;
}

export const getAppliancesById = async (user_id, appliance_id) => {
    const query = `SELECT * FROM appliances WHERE user_id = $1 AND id = $2`;
    const data = await pool.query(query, [user_id, appliance_id]);

    return data.rows[0];
}

export const updateApplianceById = async (user_id, appliance_id, updates) => {
    const {name, voltage, current} = updates;
    const query =  `UPDATE appliances SET name = COALESCE($1, name), voltage = COALESCE($2, voltage), current = COALESCE($3, current), updated_at = CURRENT_TIMESTAMP WHERE id = $4 AND user_id = $5 RETURNING id, user_id, name, voltage, current, updated_at`;
    const data = await pool.query(query, [name, voltage, current, appliance_id, user_id]);

    return data.rows[0];
}

export const removeApplianceById = async (user_id, appliance_id) => {
    const query = `DELETE FROM appliances WHERE id = $1 AND user_id = $2 RETURNING id, user_id, name, voltage, current`;
    const data = await pool.query(query, [appliance_id, user_id])

    return data.rows[0];
}