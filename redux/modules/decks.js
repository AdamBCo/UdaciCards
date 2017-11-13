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
    id: "1234567",
    title: "React",
    questions: [
      {
        id: "513513461",
        question: "Where do you make Ajax requests in React?",
        answer: "The coolest"
      },
      {
        id: "15313461",
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