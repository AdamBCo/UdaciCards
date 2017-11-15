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
import QuizView from './components/QuizView'

import { purple, white } from './utils/colors'



const Tabs = TabNavigator({
  DeckListView: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'DeckListView',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    headerTintColor: white,
    headerStyle: {
      backgroundColor: purple
    }
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

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