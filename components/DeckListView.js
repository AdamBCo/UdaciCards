import React, { Component, PropTypes } from 'react'
import { FlatList, StyleSheet, View, Text, StatusBar, Button } from 'react-native';

import { connect } from 'react-redux'
import { blue } from '../utils/colors'

import Deck from './Deck'

class DeckListView extends Component {

  constructor(props, context) {
    super(props, context);
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion() {

    console.log("Hello")

  }

    static navigationOptions = ({ navigation }) => {
    return {
        title: 'Decks',
        headerRight: (
          <Button
          onPress={() => navigation.navigate('CreateDeckView')}
          title="Add"
        />
      )
    }
  }


  render() {

    const {decks, navigation} = this.props
    const {navigate} = navigation

    return (
      <View style={styles.container} >
        <FlatList
          data={decks}
          renderItem={({item}) => (
            <Deck
              deck={item}
              onPress={() => navigate(
                'DeckView', 
                {deck: item}
                )}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: blue,
    paddingVertical: 30,
    paddingHorizontal: 15
  }
})

const mapStateToProps = (state) => ({
  decks: state.decks.decks
});


DeckListView.propTypes = {
  decks: PropTypes.array
};

export default connect(
  mapStateToProps
)(DeckListView)

