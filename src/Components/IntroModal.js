import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4ABDAC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 100,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});

const IntroModal = props => (
  <View style={styles.container}>
    <Modal
      style={styles.container}
      visible={props.modalVisible}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <Text style={styles.text}>C T R L</Text>
      </View>
    </Modal>
  </View>
);

export default IntroModal;
