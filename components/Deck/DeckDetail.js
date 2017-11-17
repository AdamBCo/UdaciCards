import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons';


import { gray, green, white, blue } from '../../utils/colors'
import { getDeck } from '../../utils/helpers'


import Question from '../Question/Question'


class DeckDetail extends Component {

  constructor(props, context) {
    super(props, context);
    this.onQuizButtonPressed = this.onQuizButtonPressed.bind(this);
  }
  
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return {
      title: deck.title,
      headerRight: (
        <TouchableOpacity style={styles.addButton} onPress={
          () => navigation.navigate(
          'CreateQuestion',
          {
            title: deck.title
          }
          )}>
          <Entypo name='plus' size={30} color={white} />
        </TouchableOpacity>
    )
    }
  }

  // Actions

  onQuizButtonPressed() {

    const {title} = this.props.navigation.state.params.deck
    const { navigation, decks } = this.props

    const deck = decks[title]

    navigation.navigate(
      'Quiz',
      { 
        questions: deck.questions 
      }
    )

  }

  keyExtractor = item => item.question;

  render() {

    const {title} = this.props.navigation.state.params.deck
    const { navigation, decks } = this.props

    const deck = decks[title]

    if (deck == null) 
      return null

    const {questions} = deck

    return (
      <View>
        <Text style={styles.numberOfQuestions}>{questions.length} Questions</Text>
        <FlatList
          data={questions}
          keyExtractor={this.keyExtractor}
          renderItem={({item}) => (
            <Question 
            navigation={navigation}
            question={item}
            deck={deck}/>
          )}
        />

        {questions.length > 0 &&
          <TouchableOpacity style={styles.quizButton} onPress={this.onQuizButtonPressed}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        }

      </View>
    )
  }
}

DeckDetail.propTypes = {
  navigation: PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
  numberOfQuestions: {
    textAlign: 'center',
    fontSize: 18,
    color: gray,
    margin: 0,
    height: 32
  },
  addButton: {
    backgroundColor: blue,
    paddingTop: 10.0,
    paddingRight: 16.0
  },
  quizButton: {
    padding: 12,
    backgroundColor: green,
    borderRadius: 12,
    margin: 16
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

export default connect(mapStateToProps)(DeckDetail)