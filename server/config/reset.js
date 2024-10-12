import { pool } from "./database.js"
import './dotenv.js'
import MusicData from '../data/musicEvents.js'
import locationData from '../data/location.js'

const createMusicEventsTable = async () => {
    const sql = `
        DROP TABLE IF EXISTS music_event;

        CREATE TABLE IF NOT EXISTS music_event (
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            location VARCHAR(100) NOT NULL,
            image VARCHAR(300)
        )
    `
    try {
        await pool.query(sql)
        console.log('🎉 music_event table created!')
    } catch (err) {
        console.error('⚠️ error creating music_event table', err)
    }
}

const seedMusicEventsTable = async () => {
    await createMusicEventsTable()
    const sql = `
        INSERT INTO music_event (title, date, time, location, image)
        VALUES ($1, $2, $3, $4, $5)
    `
    try {
        await Promise.all(MusicData.map(musicEvent => pool.query(sql, [musicEvent.title, musicEvent.date, musicEvent.time, musicEvent.location, musicEvent.image])))
        console.log('🎉 music_event table seeded!')
    } catch (err) {
        console.error('⚠️ error seeding music_event table', err)
    }
}

const createLocationTable = async () => {
    const sql = `
        DROP TABLE IF EXISTS location;

        CREATE TABLE IF NOT EXISTS location (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            address VARCHAR(100) NOT NULL,
            zip VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            image VARCHAR(300)
        )
    `
    try {
        await pool.query(sql)
        console.log('🎉 location table created!')
    } catch (err) {
        console.error('⚠️ error creating location table', err)
    }
}

const seedLocationTable = async () => {
    await createLocationTable()
    const sql = `
        INSERT INTO location (name, address, zip, city, state, image)
        VALUES ($1, $2, $3, $4, $5, $6)
    `
    try {
        await Promise.all(locationData.map(location => pool.query(sql, [location.name, location.address, location.zip, location.city, location.state, location.image])))
        console.log('🎉 location table seeded!')
    } catch (err) {
        console.error('⚠️ error seeding location table', err)
    }
}

seedMusicEventsTable()
seedLocationTable()

// const createGeocachingTable = async () => {
//     const sql = `
//         DROP TABLE IF EXISTS geocaching;

//         CREATE TABLE IF NOT EXISTS geocaching (
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(100) NOT NULL,
//             date DATE NOT NULL,
//             time TIME NOT NULL,
//             location VARCHAR(100) NOT NULL
//         )
//     `
//     try {
//         await pool.query(sql)
//         console.log('🎉 geocaching table created!')
//     } catch (err) {
//         console.error('⚠️ error creating gifts table', err)
//     }
// }

// const seedGeocachingTable = async () => {
//     await createGeocachingTable()
//     const sql = `
//         INSERT INTO geocaching (name, date, time, location)
//         VALUES ($1, $2, $3, $4)
//     `
//     try {
//         await Promise.all(data.map(geocaching => pool.query(sql, [geocaching.name, geocaching.date, geocaching.time, geocaching.location])))
//         console.log('🎉 geocaching table seeded!')
//     } catch (err) {
//         console.error('⚠️ error seeding gifts table', err)
//     }
// }

// const createLocationTable = async () => {
//     const sql = `
//         DROP TABLE IF EXISTS location;

//         CREATE TABLE IF NOT EXISTS location (
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(100) NOT NULL
//         )
//     `
//     try {
//         await pool.query(sql)
//         console.log('🎉 location table created!')
//     } catch (err) {
//         console.error('⚠️ error creating location table', err)
//     }
// }

// const seedLocationTable = async () => {
//     await createLocationTable()
//     const sql = `
//         INSERT INTO location (name)
//         VALUES ($1)
//     `
//     try {
//         await Promise.all(data.map(geocaching => pool.query(sql, [geocaching.location])))
//         console.log('🎉 location table seeded!')
//     } catch (err) {
//         console.error('⚠️ error seeding location table', err)
//     }
// }

// seedGeocachingTable()
// seedLocationTable()
