/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {  
  return (
    <View style={styles.container}>
        <AppNavigator />
    </View>
  );

}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#000',
},
});
