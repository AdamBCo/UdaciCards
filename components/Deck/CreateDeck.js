import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {FontAwesome} from '@expo/vector-icons'

import { gray, blue, white } from '../../utils/colors'
import { createDeck } from '../../utils/helpers'

import { setDecks } from '../../redux/modules/decks'


class CreateDeck extends Component {

  state = {
    text: ""
  }

  constructor(props, context) {
    super(props, context);
    this.onSaveButtonPressed = this.onSaveButtonPressed.bind(this);
  }

  onSaveButtonPressed() {

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
      <View>
        <TextInput
          placeholder="New Deck Name"
          style={styles.textinput}
          value={title}
          onChangeText={(text) => this.setState({text})}
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

export default connect()(CreateDeck)
