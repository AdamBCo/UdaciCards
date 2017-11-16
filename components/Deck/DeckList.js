import React, { Component, PropTypes } from 'react'
import { FlatList, StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { connect } from 'react-redux'

import Deck from './Deck'

import { blue, white } from '../../utils/colors'
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
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateDeck')}>
          <Entypo name='plus' size={30} color={white} />
        </TouchableOpacity>
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
  addButton: {
    backgroundColor: blue,
    paddingTop: 10.0,
    paddingRight: 16.0
  }
})


DeckList.propTypes = {
  decks: PropTypes.Object
};

const mapStateToProps = state => ({
  decks: state.decks.decks,
});


export default connect(mapStateToProps)(DeckList)

