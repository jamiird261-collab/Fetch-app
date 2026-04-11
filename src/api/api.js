const [game, setGame] = useState(null)
const [loading, setLoading] = useState(false)

const fetchGame = async () => {
  setLoading(true)

  const res = await fetch("https://www.gamerpower.com/api/giveaways")
  const data = await res.json()

  // pick random game
  const randomGame = data[Math.floor(Math.random() * data.length)]

  setGame(randomGame)
  setLoading(false)
}
useEffect(() => {
  fetchGame()
}, [])
{loading ? (
  <p>Loading...</p>
) : game ? (
  <div>...</div>
) : (
  <p>No data yet</p>
)}
{loading ? (
  <p>Loading...</p>
) : (
  game && (
    <div className="card">
      <h2>{game.title}</h2>
      <img src={game.thumbnail} alt={game.title} />
      <p> Worth: {game.worth}</p>
      <p>Platforms: {game.platforms}</p>
      <a href={game.open_giveaway_url} target="_blank">
        Get Deal
      </a>
    </div>
  )
)}
<button onClick={fetchGame}>Get Another Game</button>
https://www.gamerpower.com/api/giveaways