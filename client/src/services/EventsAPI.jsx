import { request } from "../utilities/api"

const musicEventUrl = "/api/music_events"

const getAllMusicEvents = () => request('get', musicEventUrl)
const getMusicEventById = (id) => request('get', `${musicEventUrl}/${id}`)
const getMusicEventByLocation = (location) => request('get', `${musicEventUrl}/location/${location}`)
const getMusicEventsByLocationId = (id) => request('get', `${musicEventUrl}/location_id/${id}`)

export default {
  getAllMusicEvents,
  getMusicEventById,
  getMusicEventByLocation,
  getMusicEventsByLocationId
}