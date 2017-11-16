import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './redux/reducer'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'

import DeckListView from './components/DeckListView'
import CreateDeckView from './components/CreateDeckView'
import NewDeckView from './components/NewDeckView'
import DeckView from './components/DeckView'
import EditQuestionView from './components/EditQuestionView'
import CreateQuestionView from './components/CreateQuestionView'
import QuizView from './components/QuizView'

import { purple, white } from './utils/colors'

const MainNavigator = StackNavigator(
{
  DeckList: {
    screen: DeckListView,
    path: 'decks',
    navigationOptions: () => ({
      title: 'All Decks'
    })
  },
  DeckView: {
    screen: DeckView,
    path: 'decks/:title',
    navigationOptions: ({navigation, deck}) => ({
      deck
    })
  },
  CreateQuestionView: {
    screen: CreateQuestionView
  },
  EditQuestionView: {
    screen: EditQuestionView
  },
  CreateDeckView: {
    screen: CreateDeckView
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: 'Quiz'
    }
  },
}, 
{
  navigationOptions: {
    headerTintColor: white,
    headerStyle: {
      backgroundColor: purple
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