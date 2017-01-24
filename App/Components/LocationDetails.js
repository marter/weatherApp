import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardItem, Content, Text } from 'native-base';
import { Image, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import { getLocation } from '../ducks/location';

class Location extends Component {
  renderDetails() {
    const d = new Date();
    const date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    let image = ( <Image style={{ resizeMode: 'cover' }} source={require('../img/sunny.png')} />);
    if (this.props.location.weather[0].description.includes('cloud')) {
      image = ( <Image style={{ resizeMode: 'cover' }} source={require('../img/cloudy.png')} />);
    } else if (this.props.location.weather[0].description.includes('rain')) {
      image = ( <Image style={{ resizeMode: 'cover' }} source={require('../img/rain.png')} />);
    }
    return(
    <Content>
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Text>{this.props.location.main.temp}F</Text>
          <Text note>{date}</Text>
        </CardItem>
        <CardItem >
          {image}
          <Text>
            {this.props.location.weather.map((item, index) => <Text key={index}>{item.description}</Text>)}
          </Text>
        </CardItem>
      </Card>
    </Content>
    );
  }
  renderLoading() {
    return(
        <Text>Loading....</Text>
    );
  }
  render() {
    return(
    <ScrollView>
      {this.props.location != undefined ? this.renderDetails() : this.renderLoading()}
    </ScrollView>
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
