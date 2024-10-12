import React, { useState, useEffect } from 'react'
import '../css/Event.css'
import EventsAPI from '../services/EventsAPI'
import dates from '../services/dates'

const Event = (props) => {

    const [event, setEvent] = useState([])
    const [time, setTime] = useState([])
    const [date, setDate] = useState([])
    const [remaining, setRemaining] = useState([])
    const [daysRemaining, setDaysRemaining] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getMusicEventById(props.id)
                setEvent(eventData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const result = await dates.formatTime(event.time)
                setTime(result)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [event])

    useEffect(() => {
        (async () => {
            try {
                const result = await dates.formatDate(event.date)
                setDate(result)
            }
            catch (error) {
                throw error
            }
        }) ()
    })

    useEffect(() => {
        (async () => {
            try {
                const daysRemaining = await dates.daysRemaining(event.date)
                setDaysRemaining(daysRemaining)
                const timeRemaining = await dates.formatRemainingTime(event.date)
                setRemaining(timeRemaining)
                // dates.formatNegativeTimeRemaining(remaining, event.id)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [event])

    return (
        <article className='event-information'>
            <img src={event.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h4>{event.title}</h4>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {date} <br /> {time}</p>
                    {daysRemaining >= 0 ? 
                        <p id={`remaining-${event.id}`}>{remaining}</p>
                        :
                        <p id={`remaining-${event.id}`} className='negative'>{remaining}</p>
                    }
                </div>
            </div>
        </article>
    )
}

export default Event