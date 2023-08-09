import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <h1>EVENTS</h1>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__organizer">Organized by {event?.organizer?.full_name}</div>
                        <div className="event__game"> Playing {event?.game?.name}</div>
                    {     <div className="event__attendees">Gamers attending: {
                        event?.attendees.length !== 0 ?
                        event.attendees.map(gamer => {return gamer.full_name})
                        : `No one is attending this event`}</div> }
                        <div>================================================</div>
                    </section>
                })
            }
        </article>
    )
}