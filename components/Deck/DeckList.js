import React, { Component, PropTypes } from 'react'
import { FlatList, StyleSheet, View, Text, StatusBar, Button } from 'react-native';

import { connect } from 'react-redux'

import Deck from './Deck'

import { blue } from '../../utils/colors'
import { getDecks } from '../../utils/helpers'
import { setDecks } from '../../redux/modules/decks'


class DeckList extends Component {

  constructor(props, context) {
    super(props, context);
  }

  static navigationOptions = ({ navigation }) => {
    return {
        title: 'Decks',
        headerRight: (
          <Button
          onPress={() => navigation.navigate('CreateDeck')}
          title="Add"
        />
      )
    }
  }

  componentDidMount() {

    const { dispatch } = this.props;

    getDecks().then(decks => {
      dispatch(setDecks(decks))
    })

  }

  renderItem = ({item}) => {
    const { navigation, decks} = this.props;
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
    const decks = this.props.decks ? this.props.decks : {}

    return (
      <View>
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


DeckList.propTypes = {
  decks: PropTypes.Object
};

const mapStateToProps = state => ({
  decks: state.decks.decks,
});


export default connect(mapStateToProps)(DeckList)

