import uuid from 'uuid';

// Actions

const SET_DECKS = 'SET_DECKS'

const CREATE_DECK = 'CREATE_DECK'
const UPDATE_DECK = 'UPDATE_DECK'
const DELETE_DECK = 'DELETE_DECK'

const CREATE_QUESTION = 'CREATE_QUESTION'
const DELETE_QUESTION = 'DELETE_QUESTION'
const UPDATE_QUESTION = 'EDIT_QUESTION'


// Reducer
export default function reducer(state = {}, action = {}) {

  switch (action.type)
  {

    case SET_DECKS: {

      let deck = action.decks;

      return {
        ...state,
        decks
      }

    }

    case CREATE_DECK: {

      let deck = {};
      deck.id = uuid();
      deck.title = action.title
      deck.questions = []

      var decks = state.decks.slice()
      decks.push(deck);

      return {
        ...state,
        decks
      }

    }

    // Question

    case CREATE_QUESTION: {

      let question = {};
      question.id  = uuid();
      question.question = action.question
      question.answer = action.answer

      let decks = state.decks.map((deck) => {
        if (deck.id === action.deckID) {
          deck.questions.push(question)
          return deck;
        } else {
          return deck;
        }
      });

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
  return {
    type: SET_DECKS,
    decks
  };
};

export var createDeck = (title) => {
  return {
    type: CREATE_DECK,
    title
  };
};

export var createQuestion = (deckID, question, answer) => {
  return {
    type: CREATE_QUESTION,
    deckID,
    question,
    answer
  };
};