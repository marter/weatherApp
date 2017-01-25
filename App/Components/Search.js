import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import { List, ListItem, Icon } from 'native-base';

import { getLocation, getForecast } from '../ducks/location';
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
  checkMine(id) {
    return this.props.mine.indexOf(id) > -1;
  }
  searchForCity(term) {
    if (term.length >= 2) {
      this.setState({cities: cities.filter(city => city.nm.toLowerCase().includes(term.toLowerCase()))});
    } else {
      this.setState({cities: []});
    }
  }
  handlePress(city) {
    let nextRoute = {
      title: city.nm,
      component: LocationDetails,
      passProps: {id: city.id},
    };
    if (!this.checkMine(city.id)) {
      nextRoute.onRightButtonPress = () => this.props.addLocation(city.id);
      nextRoute.rightButtonTitle = 'Add';
      this.props.onPress(city.id);
      this.props.getForecast(city.id);
    }
    this.props.navigator.push(nextRoute);
  }
  renderResults() {
    return this.state.cities.map(city =>
      <ListItem iconRight key={city.id} onPress={() => this.handlePress(city)} >
        <Text>{city.nm}</Text>
        {this.checkMine(city.id) ? <Icon name="ios-heart" /> : <Icon name="ios-heart-outline" /> }
      </ListItem>)
  }
  render() {
    return(
        <View style={{paddingTop: 74, flexGrow: 1, backgroundColor: '#efefef'}}>
          <View
            style={{marginRight: 15, marginLeft: 15, borderWidth: 1, borderColor: 'black', backgroundColor: 'white' }}>
          <TextInput
            style={{height: 40}}
            onChangeText={(text) => this.searchForCity(text)}
          />
        </View>
          <ScrollView automaticallyAdjustContentInsets={false}>
            <List>
              {this.state.cities.length > 0 ? this.renderResults() :
                <Text style={{textAlign: 'center', marginTop: 50}}>
                  To begin searching for a city please enter at least 3 characters.
                </Text>}
            </List>
          </ScrollView>
        </View>
    );
  }
}
const mapDispatchtoActions = (dispatch) => {
  return {
    onPress: (id) => { return dispatch(getLocation(id))},
    addLocation: (id) => { return dispatch(addLocation(id))},
    getForecast: (id) => { return dispatch(getForecast(id))},
  }
}

const mapStateToProps = (state) => ({
  mine: state.mine,
})


export default SearchList = connect(mapStateToProps, mapDispatchtoActions)(Search);
