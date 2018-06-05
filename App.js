// 
// App.js
// Topograpphy
// 
// Created by Juan J. Rodríguez López on 19/04/18.
// Copyright 2018 Juan. All rights reserved.
// 

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import BasicFlatList from './components/BasicFlatList'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#1565C0"
          barStyle="light-content"
        />
        <BasicFlatList />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});