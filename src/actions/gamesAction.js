import * as types from './ActionTypes'
import axios from 'axios'
import {
  popularGamesURL,
  upcomingGamesURL,
  newGamesURL,
  searchGameURL
} from '../api'

//Action Creator
// export const loadGames = () => (dispatch) => {
//   //FETCH AXIOS
//   axios.get(popuparGamesURL())
//   .then(data => {
//     dispatch({
//       type: 'FETCH_GAMES',
//       payload: {
//         popular: data.data.results
//       }
//     })
//   })
// }

export const loadGames = () => async (dispatch) => {
  //FETCH AXIOS
  // const popuparData = await axios.get(popularGamesURL())
  // const newGamesData = await axios.get(newGamesURL())
  // const upcomingData = await axios.get(upcomingGamesURL())

  //FETCH AXIOS
  const response = await axios.all([
    axios.get(popularGamesURL()),
    axios.get(newGamesURL()),
    axios.get(upcomingGamesURL())
  ])
  const [popuparData, upcomingData, newGamesData] = response

  dispatch({
    type: types.FETCH_GAMES,
    payload: {
      popular: popuparData.data.results,
      upcoming: upcomingData.data.results,
      newGames: newGamesData.data.results
    }
  })
}

export const fetchSearch = (game_name) => async (dispatch) => {
  const searchGames = await axios.get(searchGameURL(game_name))

  dispatch({
    type: types.FETCH_SEARCHED,
    payload: {
      searched: searchGames.data.results
    }
  })
}