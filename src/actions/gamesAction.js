import * as types from './ActionTypes'
import axios from 'axios'
import { popularGamesURL, upcomingGamesURL, newGamesURL } from '../api'

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
  const popuparData = await axios.get(popularGamesURL())
  const newGamesData = await axios.get(newGamesURL())
  const upcomingData = await axios.get(upcomingGamesURL())
  dispatch({
    type: types.FETCH_GAMES,
    payload: {
      popular: popuparData.data.results,
      upcoming: upcomingData.data.results,
      newGames: newGamesData.data.results
    }
  })
}
