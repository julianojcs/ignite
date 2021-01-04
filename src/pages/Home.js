import { useEffect } from 'react'
//Redux
import { useDispatch } from 'react-redux'
import { loadGames } from '../actions/gamesAction'

const Home = () => {
  //FETCH GAMES
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadGames())
  })

  return <h1>Home</h1>
}

export default Home
