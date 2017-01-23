import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Text, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import { getLocation } from '../ducks/location';

class Location extends Component {
  renderDetails() {
    return(
      <View>
        <Text>{`Current: ${this.props.location.main.temp}F`}</Text>
        {this.props.location.weather.map((item) => <Text>{item.description}</Text>)}
        <Text>{`${JSON.stringify(this.props.location)}`}</Text>
      </View>
    );
  }
  renderLoading() {
    return(
        <Text>Loading....</Text>
    );
  }
  render() {
    return(
    <View style={{paddingTop: 74, flexGrow: 1}}>
      {this.props.location ? this.renderDetails() : this.renderLoading()}
    </View>
    );
  }
}
const mapDispatchtoActions = (dispatch) => {
  return {
    onPress: (id) => { return dispatch(getLocation(id))},
  }
}
const mapStateToProps = (state, ownProps) => ({
  location: state.locations[ownProps.id],
})

export default LocationDetails = connect(mapStateToProps, mapDispatchtoActions)(Location);
