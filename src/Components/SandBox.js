import React, { Component } from 'react';
import { ART, StyleSheet, View, Text } from 'react-native';

const { Group, Shape, Surface } = ART;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class SandBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Surface width={400} height={400}>
          <Group x={0} y={0}>
            <Shape
              d="M300,0.1111111111111111L287.42888943853575,0.1164021164021164C274.8577788770715,0.12169312169312169,249.71555775414296,0.13227513227513227,213.2018303240168,0.15079365079365079C176.68810289389066,0.1693121693121693,128.8028691565669,0.19576719576719573,91.37397971803118,0.19576719576719573C53.945090279495425,0.19576719576719573,26.972545139747712,0.1693121693121693,13.486272569873856,0.15608465608465608L0,0.14285714285714285L0,0L13.486272569873856,0C26.972545139747712,0,53.945090279495425,0,91.37397971803118,0C128.8028691565669,0,176.68810289389066,0,213.2018303240168,0C249.71555775414296,0,274.8577788770715,0,287.42888943853575,0L300,0Z"
              stroke="#000"
              strokeWidth={1}
            />
          </Group>
        </Surface>
      </View>
    );
  }
}
export default SandBox;
