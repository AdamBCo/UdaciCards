import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, Platform, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { white, gray, orange } from '../utils/colors'


class Question extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {

    const {question, navigation, deck} = this.props
    const {navigate} = navigation

    navigate(
      'EditQuestionView',
      {
        question: question,
        deck: deck
      }
    )
  }

  render () {

    const {question} = this.props

    return (
      <TouchableHighlight onPress={this.onPress} style={styles.touchableHighlight}>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.title}>{question.question}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

Question.propTypes = {
  navigation: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired
};


export default Question

const styles = StyleSheet.create({
  touchableHighlight: {
    marginBottom: 15,
    borderRadius: 5
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: white
  },
  title: {
    fontSize: 30,
    color: gray,
    marginBottom: 5
  },
  cardCount: {
    color: gray
  },
  icon: {
    color: orange,
    fontSize: 28
  }
})