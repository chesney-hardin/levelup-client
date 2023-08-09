import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { createEvent } from '../../managers/EventManager.js'


export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    const [currentEvent, setCurrentEvent] = useState({
        gameId: 0,
        date: ""
    })

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const changeGameState = (domEvent) => {
         // Create a new object with the same properties and values as currentEvent
        const newEvent = Object.assign({}, currentEvent)
         // Update the property in newEvent based on the input field's name and value
        newEvent[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newEvent)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Game: </label>
                    <select value={currentEvent.gameId} name="gameId"
                        onChange={changeGameState
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
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game: currentEvent.gameId,
                        date: currentEvent.date
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary btn-2 btn-sep">Create</button>
        </form>
    )
}

