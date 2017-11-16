import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { gray, blue, white } from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'

import { updateQuestionForDeck } from '../utils/helpers'
import { setDecks } from '../redux/modules/decks'


class EditQuestionView extends Component {

  state = {
    question: "",
    answer: ""
  }

  constructor(props, context) {
    super(props, context);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {

    const { question } = this.props.navigation.state.params

    this.setState({
      question: question.question,
      answer: question.answer
    })

  }


  onSave() {

    const { navigation } = this.props
    const { question, answer } = this.state

    const title = navigation.state.params.deck.title
    const originalText = navigation.state.params.question.question

    let card = { 
      question, 
      answer
    }

    updateQuestionForDeck(title, originalText, card).then(decks => {
      dispatch(setDecks(decks))
      navigation.goBack(null);
    })

  }

  render() {

    const question = this.state.question ? this.state.question : ""
    const answer = this.state.answer ? this.state.answer : ""

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          value={question}
          placeholder="Question"
          onChangeText={(question) => this.setState({question})}
        />
        <TextInput
          style={styles.textinput}
          value={answer}
          placeholder="Answer"
          onChangeText={(answer) => this.setState({answer})}
        />
        <Button
          onPress={this.onSave}
          title="Save"
        />
      </View>
    )
  }
}

// EditQuestionView.propTypes = {
//   question: PropTypes.object.isRequired,
// };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 5,
    alignItems: 'stretch'
  },
  textinput: {
    height: 44, 
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: white,
    padding: 5,
  },
  saveButton: {
    flex: 1,
    padding: 5,
    alignItems: 'stretch'
  },
})

export default connect()(EditQuestionView)
