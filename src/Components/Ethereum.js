import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Ethereum = () => (
  <View style={styles.container}>
    <Text>This is the Ethereum page</Text>
  </View>
);

export default Ethereum;
