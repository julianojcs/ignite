import axios from 'axios'
import { gameDetailsURL, gameScreenshotURL } from '../api'
import * as types from './ActionTypes'

export const loadDetail = (id) => async (dispatch) => {
  const detailData = await axios.get(gameDetailsURL(id))
  const screenShotData = await axios.get(gameScreenshotURL(id))

  dispatch({
    type: types.GET_DETAIL,
    payload: {
      game: detailData.data,
      screen: screenShotData.data
    }
  })
}
