import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"
import { Link, useNavigate } from "react-router-dom"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <h1>EVENTS</h1>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Game</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__organizer">Organized by {event?.organizer?.full_name}</div>
                        <div className="event__game"> Playing {event?.game?.name}</div>
                    {     <div className="event__attendees">Gamers attending: {
                        event?.attendees.length !== 0 ?
                        event.attendees.map(gamer => {return gamer.full_name})
                        : `No one is attending this event`}</div> }
                        <Link to={`/update-event/${event.id}`}>Update this event</Link>
                        <div>================================================</div>
                    </section>
                })
            }
        </article>
    )
}