import React, { Component, PropTypes } from 'react'
import { FlatList, StyleSheet, View, Text, StatusBar, Button } from 'react-native';

import { connect } from 'react-redux'
import { blue } from '../utils/colors'

import Deck from './Deck'
import { getDecks } from '../utils/helpers'
import { setDecks } from '../redux/modules/decks'


class DeckListView extends Component {

  state = {
    decks: {}
  };

  constructor(props, context) {
    super(props, context);
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

  componentDidMount() {

    getDecks().then(decks => {

      this.setState({
        decks
      }); 

      console.log('STATE ', this.state)
    })

  }

  renderItem = ({item}) => {
    const { navigation } = this.props;
    const { decks } = this.state

    const deck = decks[item]

    return (
      <Deck
        navigation={navigation}
        deck={deck}
      />
    );
  }


  render() {

    const {navigation} = this.props
    const {decks} = this.state

    return (
      <View style={styles.container} >
        <FlatList
          data={Object.keys(decks)}
          renderItem={this.renderItem}
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


DeckListView.propTypes = {
  decks: PropTypes.Object
};

export default connect()(DeckListView)

