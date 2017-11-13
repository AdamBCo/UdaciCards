import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { gray, blue } from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'

import Question from './Question'



class DeckView extends Component {

  constructor(props, context) {
    super(props, context);
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: MyScene,
      title: 'Scene ' + nextIndex,
      passProps: {index: nextIndex}
    });
  }
  
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.deck
    return {
        title,
        headerRight: (
        <Button
          onPress={this.addQuestion}
          title="Add"
        />
      )
    }
  }

  render() {

    console.log(this.props)

    const { navigation } = this.props

    if (navigation.state.params.deck == null) 
      return null

    const {title, questions} = navigation.state.params.deck

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
  deckDetails: {
    padding: 30
  },
  titleView: {
    marginBottom: 15
  },
  titleText: {
    fontSize: 28,
    color: gray
  },
  cardCountView: {
    marginBottom: 15
  },
  cardCountText: {
    fontSize: 18,
    color: gray
  },
  cardCountNumber: {
    fontSize: 20,
    fontWeight: '600'
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  }
})

export default connect()(DeckView)
