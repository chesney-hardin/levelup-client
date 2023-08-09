import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"
import { Link, Navigate, useNavigate } from "react-router-dom"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate= useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <h1>List of Games</h1>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <Link to={`/update-game/${game.id}`}>
                        <div className="game__name">{game.name}</div></Link>
                        <div className="game__name">Posted by {game?.creator?.full_name}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                    </section>
                })
            }
        </article>
    )
}

