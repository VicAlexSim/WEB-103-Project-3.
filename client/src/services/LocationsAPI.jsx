import { request } from "../utilities/api"

const locationUrl = "/api/locations"

const getAllLocations = () => request('get', locationUrl)
const getLocationById = (id) => request('get', `${locationUrl}/${id}`)

export default {
  getAllLocations,
  getLocationById
}