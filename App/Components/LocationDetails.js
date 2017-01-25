import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardItem, Content, Row, Text } from 'native-base';
import { Image, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import { getLocation } from '../ducks/location';
import { LocationItem } from './LocationItem';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'date'
    };
  }
  setSortBy(sortBy) {
    this.setState ({
      sortBy,
    });
  }
  renderButtons() {
    let { sortBy } = this.state;
    let buttons = (<Row><Text>Sort By:</Text><Button onPress={() => this.setSortBy('temp')}>Temp</Button><Button onPress={() => this.setSortBy('humidity')}>Humidity</Button></Row>);
    if (sortBy === 'temp') {
      buttons = (<Row><Text>Sort By:</Text><Button onPress={() => this.setSortBy('day')}>Day</Button><Button onPress={() => this.setSortBy('humidity')}>Humidity</Button></Row>);
    } else if (sortBy === 'humidity') {
      buttons = (<Row><Text>Sort By:</Text><Button onPress={() => this.setSortBy('day')}>Day</Button><Button onPress={() => this.setSortBy('temp')}>Temp</Button></Row>);
    }
    return buttons;

  }
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
        {this.props.location.list ? this.renderButtons() : null}
        {this.props.location.list ? this.renderForecast() : this.renderLoading()}
      </Card>
    </Content>
    );
  }
  renderForecast() {
    const reportTimes = [0, 3, 6, 9, 12, 15, 18, 21];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date();
    const currentHour = d.getHours();
    let min = 24;
    let minIndex = 0;
    reportTimes.forEach((time, index) => {
      let diff = Math.abs(currentHour - time);
      if (diff < min) {
        min = diff;
        minIndex = index;
      }
    });
    const forecastTime = `${reportTimes[minIndex]}:00`;
    let forecast = this.props.location.list.filter((item, index) => {
      if (item.dt_txt.includes(forecastTime)) {
        return item;
      }
    });
    forecast = forecast.map((day, index) => ({...day, name: (days[(d.getDay() + (index + 1))%7])}))
    if (this.state.sortBy !== 'date') {
      forecast.sort((a, b) => {
        return parseFloat(b.main[this.state.sortBy]) - parseFloat(a.main[this.state.sortBy])
      });
    }
    const forecastComponents = forecast.map((day, index) => (
      <LocationItem key={index} {...day} />
    ));
    return forecastComponents;
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
