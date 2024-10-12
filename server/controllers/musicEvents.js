import { pool } from "../config/database.js"

const getMusicEvents = async (req, res) => {
    const sql = `
        SELECT * FROM music_event ORDER BY id
    `
    try {
        const result = await pool.query(sql)
        res.status(200).json(result.rows)
    } catch (err) {
        console.error('⚠️ error getting music_events', err)
        res.status(409).json({ error: err.message })
    }
}

const getMusicEventsById = async (req, res) => {
    const id = parseInt(req.params.id)
    const sql = `
        SELECT * FROM music_event WHERE id = $1
    `
    try {
        const result = await pool.query(sql, [id])
        res.status(200).json(result.rows[0])
    } catch (err) {
        console.error('⚠️ error getting music_event by id', err)
        res.status(409).json({ error: err.message })
    }
}

const getMusicEventsByLocation = async (req, res) => {
    const {location} = req.params
    const sql = `
        SELECT * FROM music_event WHERE location = $1
    `
    try {
        const result = await pool.query(sql, [location])
        res.status(200).json(result.rows)
    } catch (err) {
        console.error('⚠️ error getting music_event by location', err)
        res.status(409).json({ error: err.message })
    }
}

const getMusicEventsByLocationId = async (req, res) => {
    const id = parseInt(req.params.id)
    const sql = `
        SELECT music_event.id, music_event.title, date, time, location, music_event.image
        FROM music_event JOIN location 
        ON music_event.location = location.name 
        WHERE location.id = $1
    `
    try {
        const result = await pool.query(sql, [id])
        res.status(200).json(result.rows)
    } catch (err) {
        console.error('⚠️ error getting music_event by location', err)
        res.status(409).json({ error: err.message })
    }
}

export default {
    getMusicEvents,
    getMusicEventsById,
    getMusicEventsByLocation,
    getMusicEventsByLocationId
}
