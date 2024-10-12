import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import Event from '../components/Event'
import '../css/Events.css'

const Events = () => {
    const [locations, setLocations] = useState([])
    const [location, setLocation] = useState('')
    const [events, setEvents] = useState([])

    useEffect(() => {
        const getLocations = async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations()
                setLocations(locationsData)
            }
            catch (error) {
                throw error
            }
        }
        getLocations()
    }, [])

    useEffect(() => {
        const getEvents = async () => {
            try {
                const eventsData = await EventsAPI.getAllMusicEvents()
                setEvents(eventsData)
            }
            catch (error) {
                throw error
            }
        }
        const getEventsByLocation = async () => {
            try {
                const eventsData = await EventsAPI.getMusicEventsByLocationId(location)
                setEvents(eventsData)
            }
            catch (error) {
                throw error
            }
        }

        if (location === '') {
            getEvents()
        } else {
            getEventsByLocation()
        }

    }, [location])

    return (
        <div className='events'>
            <h1>Events</h1>
            <header>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value={''}>All Events</option>
                    {
                        locations && locations.length > 0 ? locations.map((location) =>
                            <option key={location.id} value={location.id}>{location.name}</option>
                        ) : <option value=''>No locations found</option>
                    }
                </select>
            </header>

            <div className='events-container'>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled yet!'}</h2>
                }
            </div>
        </div>
    )
}

export default Events