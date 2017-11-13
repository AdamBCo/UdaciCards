import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'

class NewDeckView extends Component {

  render() {
    return (
      <View style={styles.container} >
        <Text>What is the title of your new deck?</Text>
        <TextInput
          placeholder = {"Nice"}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

export default connect()(NewDeckView)