import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { updateEvent, getEventById } from '../../managers/EventManager.js'


export const UpdateEvent = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const { eventId } = useParams()

    const [currentEvent, setCurrentEvent] = useState({})

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])
    useEffect(() => {
        if(eventId) {
            getEventById(eventId).then((res) => {
                setCurrentEvent(res)
            })
        }
    }, [eventId])

    const changeEventState = (domEvent) => {
         // Create a new object with the same properties and values as currentEvent
        const newEvent = Object.assign({}, currentEvent)
         // Update the property in newEvent based on the input field's name and value
        newEvent[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Game: </label>
                    <select value={currentEvent?.game?.id} name="game"
                        onChange={changeEventState
                        } >
                        <option value="0">Select Game</option>
                        {games.map((game) =>
                            <option key={`game--${game.id}`} value={game.id}>{game.name}</option>
                        )}

                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Event Date: </label>
                    <input type="date" name="date" required className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        id:currentEvent.id,
                        game: parseInt(currentEvent.game),
                        date: currentEvent.date
                    }

                    // Send POST request to your API
                    updateEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary btn-2 btn-sep">Update</button>
        </form>
    )
}