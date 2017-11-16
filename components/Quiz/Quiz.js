import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'

import { white, red, green, gray, blue } from '../../utils/colors'

import { clearLocalNotification } from '../../utils/notifications'


class QuizView extends Component {

  state = {
    answer: false,
    num: 0,
    score: 0,
    completed: false
  }

  constructor(props, context) {
    super(props, context);
    this.onRestartButtonPressed = this.onRestartButtonPressed.bind(this);
  }

  onRestartButtonPressed() {

    this.setState({
      answer: false,
      num: 0,
      score: 0,
      completed: false
     })

  }

  handleButtonPress = (correct) => {

    const { questions } = this.props.navigation.state.params

    this.setState ({
      num: this.state.num + 1
    })

    if (questions.length - this.state.num === 1) {

      this.setState({
        completed: true 
     })

      clearLocalNotification()
    }
    correct === 'correct' && this.setState({ 
      score: this.state.score + 1 
    })
  }

  render () {
    const { questions } = this.props.navigation.state.params
    const { answer, num, score, completed } = this.state

    return (
      <View>
        {!completed ?
          <View>

            <Text style={styles.numberRemaining}>{num+1}/{questions.length}</Text>

            <View style={styles.textContainer}>
              <Text style={styles.mainText}>{answer ? questions[num].answer : questions[num].question}</Text>
            </View>

            <Button title={answer ? "Question" : "Answer"} onPress={() => this.setState ({answer: !answer})} />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.correctButton} onPress={() => this.handleButtonPress('correct')}>
                <Text style={styles.buttonText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.incorrectButton} onPress={this.handleButtonPress}>
                <Text style={styles.buttonText}>Incorrect</Text>
              </TouchableOpacity>
            </View>

          </View>

        :<View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>You Scored:</Text>
            <Text style={styles.score}>{(score/questions.length) * 100}%</Text>
          </View>

          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.restartButton} onPress={this.onRestartButtonPressed}>
              <Text style={styles.buttonText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.goBackButton} onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>

        </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  numberRemaining: {
    textAlign: 'center',
    fontSize: 18,
    color: gray,
    margin: 0,
    height: 32
  },
  textContainer: {
    height: 300
  },
  buttonContainer: {
    height: 200,
    margin: 0
  },
  correctButton: {
    padding: 10,
    backgroundColor: green,
    borderRadius: 12,
    margin: 20,
  },
  incorrectButton: {
    padding: 10,
    backgroundColor: red,
    borderRadius: 12,
    margin: 20,
  },
  restartButton: {
    padding: 10,
    backgroundColor: green,
    borderRadius: 12,
    margin: 20,
  },
  goBackButton: {
    padding: 10,
    backgroundColor: red,
    borderRadius: 12,
    margin: 20
  },
  buttonText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },

  scoreContainer: {
    textAlign: 'center',
    height: 300,
    margin: 0,
    marginTop: 32.0
  },
  scoreText: {
    fontSize: 35,
    marginBottom: 20,
    textAlign: 'center',
  },
  score: {
    fontSize: 30,
    color: gray,
    textAlign: 'center',
  },

  mainText: {
    textAlign: 'center',
    fontSize: 50
  },
})

export default QuizView
