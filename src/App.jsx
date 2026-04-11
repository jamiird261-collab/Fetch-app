import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchGame = async () => {
    try {
      setLoading(true)

      const res = await fetch("https://www.gamerpower.com/api/giveaways")
      const data = await res.json()
      console.log(data)


      const randomGame =
        data[Math.floor(Math.random() * data.length)]

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
      <h1> Free Game Finder</h1>

      {loading && <p>Loading...</p>}
{!loading && !game && <p>No data yet</p>}
{game && (
  <div className="card">
    <h2>{game.title}</h2>
    <img src={game.thumbnail} alt={game.title} />
    <p>{game.worth}</p>
  </div>
)}
      ) : (
        <p>No data yet</p>
      )

      <button onClick={fetchGame}>Get Another Game</button>
   </div>
  )
}

export default App