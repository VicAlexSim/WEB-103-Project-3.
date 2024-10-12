import { pool } from "../config/database.js"

const getLocations = async (req, res) => {
    const sql = `
        SELECT * FROM location ORDER BY id
    `
    try {
        const result = await pool.query(sql)
        res.status(200).json(result.rows)
    } catch (err) {
        console.error('⚠️ error getting locations', err)
        res.status(409).json({ error: err.message })
    }
}

const getLocationById = async (req, res) => {
    const id = parseInt(req.params.id)
    const sql = `
        SELECT * FROM location WHERE id = $1
    `
    try {
        const result = await pool.query(sql, [id])
        res.status(200).json(result.rows[0])
    } catch (err) {
        console.error('⚠️ error getting location by id', err)
        res.status(409).json({ error: err.message })
    }
}

export default {
    getLocations,
    getLocationById
}
