import React, { Component } from 'react';

import { NavigatorIOS } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { location } from '../ducks/location';
import mySaga from '../sagas/getWeather';
import SearchList from './Search';
import LocationList from './LocationsList';
import reducer from '../ducks/index';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it to the store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
// then run the saga
sagaMiddleware.run(mySaga)
export default class Main extends Component {
  showMine() {
    this.refs.nav.push({
      title: 'Mine Stuff',
      component: LocationList,
    });
  }
  render() {
    return(
      <Provider store={store}>
        <NavigatorIOS
          ref='nav'
          initialRoute={{
          title: 'Search',
          component: SearchList,
          rightButtonTitle: 'My Spotz',
          onRightButtonPress: () => this.showMine(),
        }}

          style={{flex: 1}}
        />
      </Provider>
    );
  }
}

