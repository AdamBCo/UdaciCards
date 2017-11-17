import uuid from 'uuid';

// Actions

const SET_DECKS = 'SET_DECKS'

// Reducer
export default function reducer(state = {}, action = {}) {

  switch (action.type)
  {

    case SET_DECKS: {

      let decks = action.decks

      return {
        ...state,
        decks
      }

    }

    default:
      return state
  }
};

export var setDecks = (decks) => {

  console.log(decks)

  return {
    type: SET_DECKS,
    decks
  };
};
