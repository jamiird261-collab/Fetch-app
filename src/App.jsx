import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchGame = async () => {
    try {
      setLoading(true)

      // Use CORS proxy for development
      const proxyUrl = "https://cors-anywhere.herokuapp.com/"
      const apiUrl = "https://www.gamerpower.com/api/giveaways"
      const res = await fetch(proxyUrl + apiUrl)
      const data = await res.json()
      console.log(data)

      const randomGame = data[Math.floor(Math.random() * data.length)]

      setGame(randomGame)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGame()
  }, [])

  return (
    <div className="app">
          <h1>Free Game Finder</h1>

      {loading ? (
        <p>Loading...</p>
      ) : game ? (
        <div className="card">
          <h2>{game.title}</h2>
          <img src={game.thumbnail} alt={game.title} />
          <p>Worth: {game.worth}</p>
          <p>Platforms: {game.platforms}</p>
          <a href={game.open_giveaway_url} target="_blank" rel="noopener noreferrer">
            Get Deal
          </a>
        </div>
      ) : (
        <p>No data yet</p>
      )}

      <button onClick={fetchGame}>Get Another Game</button>
    </div>
  )
}

export default App