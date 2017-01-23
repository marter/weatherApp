import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
export const LocationItem = (props) =>
  <TouchableHighlight>
    <Text>{`${props.name} ${props.main.temp}`}</Text>
  </TouchableHighlight>;

