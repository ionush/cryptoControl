import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: '#4ABDAC',
  },
});

const Welcome = () => (
  <View style={styles.container}>
    {/* <StatusBar backgroundColor="green" currentHeight="40" /> */}
    <Text>Open up App.js to start working on your app!</Text>
    <Text>Changes you make will automatically reload.</Text>
    <Text>Shake your phone to open the developer menu.</Text>
  </View>
);

export default Welcome;
