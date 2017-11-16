import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { gray, blue, white } from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'

import { createQuestionForDeck } from '../utils/helpers'



class CreateQuestionView extends Component {

  state = {
    question: "",
    answer: ""
  }

  constructor(props, context) {
    super(props, context);
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const { title } = this.props.navigation.state.params
    const { navigation } = this.props
    const { question, answer } = this.state

    let card = { 
      question, 
      answer
    }

    createQuestionForDeck(title, card)
    navigation.goBack(null);

  }

  render() {

    const { question, answer } = this.state

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

export default connect()(CreateQuestionView)
