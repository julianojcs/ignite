import axios from 'axios'
import { popularGamesURL } from '../api'

//Action Creator
// export const loadGames = () => (dispatch) => {
//   //FETCH AXIOS
//   axios.get(popuparGamesURL())
//   .then(data => {
//     dispatch({
//       type: 'FETCH_GAMES',
//       payload: {
//         popular: data
//       }
//     })
//   })
// }

export const loadGames = () => async (dispatch) => {
  //FETCH AXIOS
  const popuparData = await axios.get(popularGamesURL())
  dispatch({
    type: 'FETCH_GAMES',
    payload: {
      popular: popuparData.data.results
    }
  })
}
