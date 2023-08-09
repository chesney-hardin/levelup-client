import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateGame, getGameTypes, getGameById } from '../../managers/GameManager.js'


export const UpdateGame = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()

    const [currentGame, setCurrentGame] = useState({})

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    useEffect(() => {
        if(gameId) {
            getGameById(gameId).then((res) => {
                setCurrentGame(res)
            })
        }
    }, [gameId])

    const changeGameState = (domEvent) => {
         // Create a new object with the same properties and values as currentGame
        const updatedGame = Object.assign({}, currentGame)
         // Update the property in updatedGame based on the input field's name and value
        updatedGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(updatedGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Type: </label>
                    <select value={currentGame.game_type} name="game_type"
                        onChange={changeGameState
                        } >
                        <option value="0">Select Type</option>
                        {gameTypes.map((type) =>
                            <option key={`type--${type.id}`} value={type.id}>{type.label}</option>
                        )}

                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="number_of_players" required className="form-control"
                        defaultValue={currentGame.number_of_players}
                        
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skill_level" required className="form-control"
                        defaultValue={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: currentGame.id,
                        name: currentGame.name,
                        game_type: parseInt(currentGame.game_type),
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: currentGame.skill_level
                    }

                    // Send POST request to your API
                    updateGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}
