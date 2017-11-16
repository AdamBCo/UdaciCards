import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'
import { gray, red, white } from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'

import { getDeck } from '../utils/helpers'


import Question from './Question'



class DeckView extends Component {

  constructor(props, context) {
    super(props, context);
    this.onQuizButtonPressed = this.onQuizButtonPressed.bind(this);
  }

  
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return {
      title: deck.title,
      headerRight: (
        <Button
        onPress={() => navigation.navigate(
          'CreateQuestionView',
          { title: deck.title }
        )}
        title="Add"
      />
    )
    }
  }

  // Actions

  onQuizButtonPressed() {

    const {title} = this.props.navigation.state.params.deck
    const { navigation, decks } = this.props

    const deck = decks[title]

    navigate(
      'QuizView',
      { questions: deck.questions }
    )

  }


  render() {

    const {title} = this.props.navigation.state.params.deck
    const { navigation, decks } = this.props

    const deck = decks[title]

    if (deck == null) 
      return null

    const {questions} = deck

    return (
      <View style={styles.container}>
        <FlatList
          data={questions}
          renderItem={({item}) => (
            <Question 
            navigation={navigation}
            question={item}
            deck={deck}/>
          )}
        />
        <TouchableOpacity style={styles.quizButton} onPress={this.onQuizButtonPressed}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

DeckView.propTypes = {
  navigation: PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  quizButton: {
    padding: 20,
    backgroundColor: red,
    borderRadius: 12,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 40
  },
  buttonText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
})

const mapStateToProps = state => ({
  decks: state.decks.decks
});

export default connect(mapStateToProps)(DeckView)