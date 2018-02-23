import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ART, StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import * as shape from 'd3-shape';
import PropTypes from 'prop-types';
import Loading from './Loading';
import AnimatePie from './AnimatePie';

const d3 = { shape };
const { Group, Shape, Surface } = ART;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class SecondaryWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: { width: undefined, height: undefined },
      pressed: undefined,
    };
    this.onLayout = this.onLayout.bind(this);
    this.createPath = this.createPath.bind(this);
    this.interperetData = this.interperetData.bind(this);
    this.getColor = this.getColor.bind(this);
  }
  // shouldComponentUpdate(nextProps) {
  //   console.log('nextProps', nextProps);
  //   console.log('this.props', this.props);
  //
  //   if (this.props == nextProps) {
  //     return false;
  //   }
  //   return true;
  // }
  onLayout(event) {
    if (this.state.dimensions.width) return;
    const { width, height } = event.nativeEvent.layout;
    this.setState({ dimensions: { width, height } });
  }

  getColor(index) {
    this.colors = ['#3C1053', '#4E1B5C', '#612665', '#74316e', '#873c77', '#9a4780', '#ad5389'];

    return this.colors[index];
  }
  createPath(dataset, index) {
    this.arcs = d3.shape.pie().value(d => d.value)(dataset);
    const outerVal = this.state.pressed === index ? 140 : 120;
    this.singleArc = this.arcs[index];
    return d3.shape
      .arc()
      .outerRadius(outerVal)
      .innerRadius(60)(this.singleArc);
  }
  // create a function that groups transactions into different sizes
  interperetData(data) {
    this.interpereted = [
      { name: '<0.01', value: 0 },
      { name: '0.01<0.05', value: 0 },
      { name: '0.05<0.2', value: 0 },
      { name: '0.2<0.5', value: 0 },
      { name: '0.5<0.8', value: 0 },
      { name: '0.8<1.5', value: 0 },
      { name: '>1.5', value: 0 },
    ];

    for (const i = 0; i < data.length; i += 1) {
      if (data[i].size < 0.01) {
        this.interpereted[0].value += 1;
      } else if (data[i].size < 0.05) {
        this.interpereted[1].value += 1;
      } else if (data[i].size < 0.2) {
        this.interpereted[2].value += 1;
      } else if (data[i].size < 0.5) {
        this.interpereted[3].value += 1;
      } else if (data[i].size < 0.8) {
        this.interpereted[4].value += 1;
      } else if (data[i].size < 1.5) {
        this.interpereted[5].value += 1;
      } else {
        this.interpereted[6].value += 1;
      }
    }
    return this.interpereted;
  }

  render() {
    console.log('rendering');
    const { width, height } = this.state.dimensions;
    const { coin } = this.props;
    const latestData = this.props.tradeData[coin].data[0];
    // console.log('yo', this.state.dimensions, width, height);

    if (this.props.tradeData[coin].error) {
      return (
        <View style={styles.container}>
          <Text>Network Error</Text>
        </View>
      );
    } else if (latestData) {
      // check api response is not empty
      if (latestData.length === 0) {
        return (
          <View style={styles.container}>
            <Text>No Data Available</Text>
          </View>
        );
      }
      // this.createWholePie(latestData);
      const data = this.interperetData(latestData);

      return (
        <View style={styles.container} onLayout={this.onLayout}>
          <Text>Deeper Colour == Larger Transaction</Text>
          <Text>LAST 100 TRADES</Text>
          <Surface width={400} height={300}>
            <Group x={200} y={150}>
              {data.map((datum, i) => (
                <TouchableWithoutFeedback
                  key={`touchable${datum.name}`}
                  // onPress={this.state.pressed !== i ? this.setState({ pressed: { i } }) : null}
                >
                  <AnimatePie
                    animationMs={5000}
                    stroke="white"
                    strokeWidth={4}
                    fill={this.getColor(i)}
                    key={`key${datum.name}`}
                    d={() => this.createPath(data, i)}
                  />
                </TouchableWithoutFeedback>
              ))}
            </Group>
          </Surface>
        </View>
      );
    }

    return <Loading />;
  }
}

const mapStatetoProps = state => ({
  tradeData: state.tradeData,
});
SecondaryWrapper.defaultProps = {
  coin: 'BTC',
};

SecondaryWrapper.propTypes = {
  coin: PropTypes.string,
};

export default connect(mapStatetoProps, null)(SecondaryWrapper);
