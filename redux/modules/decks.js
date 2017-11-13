import uuid from 'uuid';

// Actions

const CREATE_DECK = 'CREATE_DECK'
const UPDATE_DECK = 'UPDATE_DECK'
const DELETE_DECK = 'DELETE_DECK'

const CREATE_QUESTION = 'CREATE_QUESTION'
const DELETE_QUESTION = 'DELETE_QUESTION'
const UPDATE_QUESTION = 'EDIT_QUESTION'

const initialState = {
  decks: [
  {
    title: "React",
    questions: [
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The coolest"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The coolest"
      }
      ]
    }
  ]
}

// Reducer
export default function reducer(state = initialState, action = {}) {

  switch (action.type)
  {
    case CREATE_DECK: {

      let deck = {};
      deck.id = uuid();
      deck.title = action.title
      deck.questions = []



      var decks = state.decks.slice()
      sections.push(deck);

      return {
        ...state,
        decks
      }

    }

    case UPDATE_DECK: {

      const {name, newName} = action.payload
      const deck = {...state[name], title: newName}
      const newState = {...state}

      delete newState[name]
      return {
        ...newState,
        [newName]: deck
      }

    }

    case DELETE_DECK: {

      const {name} = action.payload
      const newState = {...state}
      delete newState[name]
      return newState

    }

    default:
      return state
  }
};

export var createDeck = (title) => {
  return {
    type: CREATE_DECK,
    title
  };
};