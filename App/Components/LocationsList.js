import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import {LocationItem} from './LocationItem';

class Locations extends Component {
  renderLocations() {
    return this.props.mine.map((location) => <LocationItem navigator={this.props.navigator} key={location} {...this.props.locations[location]} />);
  }
  render() {
    return(
    <ScrollView>
      {this.renderLocations()}
    </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  locations: state.locations,
  mine: state.mine,
})
const LocationsList = connect( mapStateToProps )(Locations)
export default LocationsList;
