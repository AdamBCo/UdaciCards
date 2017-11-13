import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { gray, blue, white } from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'

import { createQuestion } from '../redux/modules/decks'


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

    const {question, answer} = this.props.navigation.state.params.question

    this.setState({
      question,
      answer
    })

  }

  onSave() {

    const {navigation, dispatch} = this.props
    const {deckID} = this.props.navigation.state.params
    const { question, answer} = this.state

    // if (question.id !== null) {

    // } else {
      dispatch(createQuestion(deckID, question, answer))
    // }

    navigation.goBack(null);

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
    backgroundColor: blue,
    padding: 5,
  },
  saveButton: {
    flex: 1,
    backgroundColor: blue,
    padding: 5,
    alignItems: 'stretch'
  },
})

export default connect()(EditQuestionView)
