import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { gray, red, white } from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'

import { getDeck } from '../utils/helpers'


import Question from './Question'



class DeckView extends Component {

  state = {
    deck: null
  };

  constructor(props, context) {
    super(props, context);
    this.onQuizButtonPressed = this.onQuizButtonPressed.bind(this);
  }

  componentDidMount() {

    const {title} = this.props.navigation.state.params.deck

    getDeck(title).then(deck => {

      this.setState({
        deck
      });

    })

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

    const { navigate } = this.props.navigation
    const { deck } = this.state

    navigate(
      'QuizView',
      { questions: deck.questions }
    )

  }


  render() {

    const { navigation } = this.props
    const { deck } = this.state

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
        <Button
          style={styles.quizButton}
          title="START QUIZ"
          onPress={this.onQuizButtonPressed}
        />
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
    flex: 1,
    height: 44,
    backgroundColor: red,
  }
})

export default connect()(DeckView)
