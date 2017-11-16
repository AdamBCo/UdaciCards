import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { gray, blue, white } from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'

import { createDeck } from '../utils/helpers'
import { setDecks } from '../redux/modules/decks'


class CreateDeckView extends Component {

  state = {
    text: ""
  }

  constructor(props, context) {
    super(props, context);
    this.onSave = this.onSave.bind(this);
  }

  onSave() {

    const {navigation, dispatch} = this.props
    const {text} = this.state

    createDeck(text).then(decks => {
      dispatch(setDecks(decks)) 
      navigation.goBack(null);
    })

  }

  render() {

    const { title } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          value={title}
          onChangeText={(text) => this.setState({text})}
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
  },
  saveButton: {
    flex: 1,
    backgroundColor: blue,
    padding: 5,
    alignItems: 'stretch'
  },
})

export default connect()(CreateDeckView)
