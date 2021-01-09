import * as types from '../actions/ActionTypes'

const initialState = {
  game: {},
  screen: {}
}

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DETAIL:
      return {
        ...state,
        game: action.payload.game,
        screen: action.payload.screen
      }
    default:
      return { ...state }
  }
}

export default detailReducer
