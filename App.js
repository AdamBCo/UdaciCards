import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux/reducer'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

import { blue, white } from './utils/colors'

// Decks
import DeckList from './components/Deck/DeckList'
import CreateDeck from './components/Deck/CreateDeck'
import DeckDetail from './components/Deck/DeckDetail'

// Questions
import CreateQuestion from './components/Question/CreateQuestion'
import EditQuestion from './components/Question/EditQuestion'

// Quiz
import Quiz from './components/Quiz/Quiz'


const MainNavigator = StackNavigator(
{
  DeckList: {
    screen: DeckList,
    path: 'decks',
    navigationOptions: {
      title: 'All Decks'
    }
  },
  DeckDetail: {
    screen: DeckDetail
  },
  CreateQuestion: {
    screen: CreateQuestion,
    navigationOptions: {
      title: 'Create'
    }
  },
  EditQuestion: {
    screen: EditQuestion,
    navigationOptions: {
      title: 'Edit'
    }
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      title: 'Create Deck'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  },
}, 
{
  navigationOptions: {
    headerTintColor: white,
    headerStyle: {
      backgroundColor: blue
    }
  }
})

export default class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}