import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { gray, blue } from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'

import { getDeck } from '../utils/helpers'


import Question from './Question'



class DeckView extends Component {

  state = {
    deck: null
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

    const {title} = this.props.navigation.state.params.deck

          console.log("ID ", title )

    getDeck(title).then(deck => {

      console.log("RESGS ", deck)

      this.setState({
        deck
      });

      console.log("ST ", this.state)
    })

  }
  
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return {
      title: deck.title,
        headerRight: (
          <Button
          onPress={() => navigation.navigate(
            'EditQuestionView'
          )}
          title="Add"
        />
      )
    }
  }

    render() {
      return <View></View>
    }


  render() {

    const { navigation } = this.props
    const { deck } = this.state

    console.log("DECKCK ", deck)

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
            question={item}/>
          )}
        />
        <Button
          style={styles.quizButton}
          title="START QUIZ"
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
    backgroundColor: blue,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  quizButton: {
    flex: 1,
    height: 44,
    backgroundColor: blue,
  }
})

export default connect()(DeckView)
