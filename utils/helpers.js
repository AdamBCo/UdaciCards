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

export const saveDecks = async () => {
	try {
		await AsyncStorage.setItem(DATABASE_KEY, JSON.stringify(decks));
	} catch (error) {
		console.warn('Error adding card to deck:', error);
	}
};


export const createDeck = async (title) => {
  try {
    let decks = await getDecks();
    decks[title] = { title, questions: [] };

    console.log("DECKING ", decks)

    await AsyncStorage.setItem(DATABASE_KEY, JSON.stringify(decks));
    return decks[title];
  } catch (error) {
    console.log(error);
  }
  return null;
}
