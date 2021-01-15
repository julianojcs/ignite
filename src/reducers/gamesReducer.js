import * as types from '../actions/ActionTypes'

const initState = {
  popular: [],
  newGames: [],
  upcoming: [],
  searched: []
}

const gamesReducer = (state = initState, action) => {
  switch (action.type) {
    case types.FETCH_GAMES:
      return {
        ...state,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        newGames: action.payload.newGames
      }
    case types.FETCH_SEARCHED:
      return {
        ...state,
        searched: action.payload.searched
      }
    case types.CLEAR_SEARCHED:
      return {
        ...state,
        searched: []
      }
    default:
      return { ...state }
  }
}

export default gamesReducer
