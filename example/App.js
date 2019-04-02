import React from 'react';
import { Platform } from 'react-native';
import AndroidExample from './AndroidExample';
import IOSExample from './IOSExample';

export default class App extends React.Component {
  render() {
    if (Platform.OS === 'ios') {
      return (<IOSExample />);
    }
    return (<AndroidExample />);
  }
}
