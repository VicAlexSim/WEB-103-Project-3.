import express from 'express'
import MusicControllers from '../controllers/musicEvents.js'
import LocationControllers from '../controllers/location.js'

const router = express.Router()

// define routes to get events and locations
router.get('/music_events', MusicControllers.getMusicEvents)
router.get('/music_events/:id', MusicControllers.getMusicEventsById)
router.get('/music_events/location/:location', MusicControllers.getMusicEventsByLocation)
router.get('/music_events/location_id/:id', MusicControllers.getMusicEventsByLocationId)
router.get('/locations', LocationControllers.getLocations)
router.get('/locations/:id', LocationControllers.getLocationById)

export default router
