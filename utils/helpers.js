import { AsyncStorage } from 'react-native'

const DATABASE_KEY = "Decks";

export const getDecks = async () => {
	try {
	    let response = await AsyncStorage.getItem(DATABASE_KEY);
	    let decks = (await JSON.parse(response)) || {};
	    return decks;
	} catch (error) {
      	console.log(error);
      return {};
    }
};

export const getDeck = async (deckID) => {
  try {
    let decks = await getDecks();
    return decks[deckID];
  } catch (error) {
    console.log(error);
  }
}

export const createDeck = async (title) => {
  try {
    let decks = await getDecks();
    decks[title] = { 
    	title, 
    	questions: [] 
    };
    await AsyncStorage.setItem(DATABASE_KEY, JSON.stringify(decks));
    return decks[title];
  } catch (error) {
    console.log(error);
  }
  return null;
}

export const createQuestionForDeck = async (title, card) => {
  try {
    let decks = await getDecks();
    decks[title] = { 
    	title, 
        questions: decks[title].questions.concat(card)
    };
    await AsyncStorage.setItem(DATABASE_KEY, JSON.stringify(decks));
    return decks[title];
  } catch (error) {
    console.log(error);
  }
  return null;
}

