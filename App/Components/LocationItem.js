import React from 'react';
import { TouchableHighlight } from 'react-native';
import { ListItem, Text, Icon } from 'native-base';

export const LocationItem = (props) => {
  let icon = 'ios-sunny';
  if (props.weather[0].description.includes('cloud')) {
    icon = 'ios-cloudy';
  } else if (props.weather[0].description.includes('rain')) {
    icon = 'ios-rainy';
  }
  let nextRoute = () => {
    props.navigator.push({
    title: props.name,
    component: LocationDetails,
    passProps: {id: props.id},
  })}
  return (
  <ListItem iconRight onPress={props.navigator ? nextRoute : null}>
    <Text>{`${props.name} ${props.main.temp}F   ${props.main.humidity}% Humidity`}</Text>
    <Icon name={icon} />
  </ListItem>);
}

