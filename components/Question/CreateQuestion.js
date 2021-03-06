import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {FontAwesome} from '@expo/vector-icons'

import { gray, blue, white } from '../../utils/colors'

import { createQuestionForDeck } from '../../utils/helpers'
import { setDecks } from '../../redux/modules/decks'


class CreateQuestion extends Component {

  state = {
    question: "",
    answer: ""
  }

  constructor(props, context) {
    super(props, context);
    this.onSaveButtonPressed = this.onSaveButtonPressed.bind(this);
  }

  onSaveButtonPressed() {
    const { title } = this.props.navigation.state.params
    const { navigation, dispatch } = this.props
    const { question, answer } = this.state

    let card = { 
      question, 
      answer
    }

    createQuestionForDeck(title, card).then(decks => {
      dispatch(setDecks(decks))
      navigation.goBack(null);
    })

  }

  render() {

    const { question, answer } = this.state

    return (
      <View>
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
        <TouchableOpacity style={styles.saveButton} onPress={this.onSaveButtonPressed}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textinput: {
    height: 44,
    borderColor: 'gray', 
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 16
  },
  saveButton: {
    padding: 12,
    backgroundColor: blue,
    borderRadius: 12,
    margin: 16
  },
  buttonText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  }
})

export default connect()(CreateQuestion)
