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

const LiteCoin = () => (
  <View style={styles.container}>
    <Text>This is the LiteCoin page</Text>
  </View>
);

export default LiteCoin;
