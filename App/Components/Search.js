import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Text, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import { getLocation } from '../ducks/location';
import { addLocation } from '../ducks/mine';
import { cities } from '../lib/cities';
import LocationDetails from './LocationDetails';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
    }
  }
  searchForCity(term) {
    if (term.length !== 0) {
      this.setState({cities: cities.filter(city => city.nm.includes(term))});
    } else {
      this.setState({cities: []});
    }
  }
  handlePress(city) {
    this.props.onPress(city.id);
    this.props.navigator.push({
      title: city.nm,
      component: LocationDetails,
      rightButtonTitle: 'Add',
      onRightButtonPress: () => this.props.addLocation(city.id),
      passProps: {id: city.id},
    });
  }
  renderResults() {
    return this.state.cities.map(city =>
      <TouchableHighlight key={city.id} onPress={() => this.handlePress(city)}>
        <Text>{city.nm}</Text>
      </TouchableHighlight>)
  }
  render() {
    return(
        <View style={{paddingTop: 74, flexGrow: 1, backgroundColor: 'red'}}>
          <View
            style={{marginRight: 15, marginLeft: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}>
          <TextInput
            style={{height: 40}}
            onChangeText={(text) => this.searchForCity(text)}
          />
        </View>
          <ScrollView automaticallyAdjustContentInsets={false}>
            {this.renderResults()}
          </ScrollView>
        </View>
    );
  }
}
const mapDispatchtoActions = (dispatch) => {
  return {
    onPress: (id) => { return dispatch(getLocation(id))},
    addLocation: (id) => { return dispatch(addLocation(id))}
  }
}

export default SearchList = connect(null, mapDispatchtoActions)(Search);
