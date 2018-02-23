import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryWrapper from './PrimaryWrapper';
import SecondaryWrapper from './SecondaryWrapper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Bitcoin = () => (
  <View style={styles.container}>
    <PrimaryWrapper speed={3000} coin="BTC" />
    <SecondaryWrapper coin="BTC" />
  </View>
);

export default Bitcoin;
