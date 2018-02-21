import React, { Component } from 'react';
import { ART, StyleSheet, Text, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
// import Spinner from 'react-native-spinkit';
import * as d3shape from 'd3-shape';
import * as d3scale from 'd3-scale';
import * as d3array from 'd3-array';
import * as d3scalechromatic from 'd3-scale-chromatic';
import AnimateStack from './AnimateStack';

// const d3 = { shape, scale, array };
const { Group, Shape, Surface } = ART;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class PrimaryWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: { width: undefined, height: undefined },
      interperetedData: undefined,
      keys: undefined,
      series: undefined,
      width: 400,
      height: 250,
    };
    this.onLayout = this.onLayout.bind(this);
    this.interperetData = this.interperetData.bind(this);
    this.createD3Data = this.createD3Data.bind(this);
    this.scaleX = this.scaleX.bind(this);
    this.scaleY = this.scaleY.bind(this);
    this.stackArea = this.stackArea.bind(this);
  }
  componentDidMount() {
    const { coin } = this.props;
    setInterval(() => {
      const { data } = this.props.transactionData[coin];
      if (data.length !== 0) {
        this.createD3Data(coin, 3000);
      }
    }, 3000);
  }
  onLayout(event) {
    if (this.state.dimensions) return;
    const { width, height } = event.nativeEvent.layout;
    this.setState({ dimensions: { width, height } });
  }

  getLatestData(coin, time) {
    // need to get data to update
    const { data } = this.props.transactionData[coin];
    console.log('data', data);
    const timeStamp = Date.now();
    const latestData = [];
    for (let i = 0; i < data.length; i += 1) {
      console.log('timeStamp', timeStamp, timeStamp - data[i].time.getTime());
      if (timeStamp - data[i].time.getTime() > time) {
        break;
      } else if (timeStamp - data[i].time.getTime() <= time) {
        latestData.push(data[i]);
      }
    }
    console.log('getLatestData', latestData);
    return latestData;
  }
  interperetData(data) {
    this.interpereted = {
      '<0.01': 0,
      '0.01<0.05': 0,
      '0.05<0.2': 0,
      '0.2<0.5': 0,
      '0.5<0.8': 0,
      '0.8<1.5': 0,
      '>1.5': 0,
    };
    this.setState({ keys: Object.keys(this.interpereted) });

    if (data.length === undefined || data.length === 0) {
      this.interpereted.time = new Date();
    }
    for (let i = 0; i < data.length; i += 1) {
      if (!this.interpereted.time && data.length > 0) {
        this.interpereted.time = data[i].time;
      }
      if (data[i].size < 0.01) {
        this.interpereted['<0.01'] += 1;
      } else if (data[i].size < 0.05) {
        this.interpereted['0.01<0.05'] += 1;
      } else if (data[i].size < 0.2) {
        this.interpereted['0.05<0.2'] += 1;
      } else if (data[i].size < 0.5) {
        this.interpereted['0.2<0.5'] += 1;
      } else if (data[i].size < 0.8) {
        this.interpereted['0.5<0.8'] += 1;
      } else if (data[i].size < 1.5) {
        this.interpereted['0.8<1.5'] += 1;
      } else {
        this.interpereted['>1.5'] += 1;
      }
    }
    return this.interpereted;
  }
  createD3Data(coin, time) {
    const { interperetedData } = this.state;
    const d3Data = this.interperetData(this.getLatestData(coin, time));
    if (this.state.interperetedData) {
      if (this.state.interperetedData.length > 50) {
        const shortInterperetedData = interperetedData.slice(0, 50);
        this.setState({ interperetedData: [d3Data, ...shortInterperetedData] }, () =>
          this.createD3Stack());
      }
      this.setState({ interperetedData: [d3Data, ...interperetedData] }, () =>
        this.createD3Stack());
    } else {
      this.setState({ interperetedData: [d3Data] }, () => this.createD3Stack());
    }
    console.log('state interperetedData', this.state.interperetedData);
  }
  createD3Stack() {
    const stack = d3shape
      .stack()
      .keys(this.state.keys)
      .order(d3shape.stackOrderNone)
      .offset(d3shape.stackOffsetSilhouette);

    const series = stack(this.state.interperetedData);
    this.setState({ series });
    console.log('series', series);
  }
  colors() {
    this.result = d3scale.scaleOrdinal(d3scalechromatic.schemeCategory10);
    console.log('colors', this.result);
    return this.result;
  }

  scaleY(data) {
    const { series } = this.state;
    // const getAllY = series.reduce((acc, element) => {
    //   const slice = element.slice(0, element.length - 1);
    //   acc.push(slice.reduce((accc, elementt) => {
    //     accc.push(elementt[0], elementt[1]);
    //     return accc;
    //   }, []));
    //   return acc;
    // }, []);
    // const flatten = list => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
    // const result = flatten(getAllY);
    // console.log('fucking please', result);

    this.result = d3scale
      .scaleLinear()
      .domain([
        d3array.min(series[0].map(([y0, y1]) => y0)),
        d3array.max(series[series.length - 1].map(([y0, y1]) => y1)),
        // d3array.max(result),
      ])
      .range([0, this.state.height]);
    return this.result(data);
  }
  scaleX(data) {
    this.result = d3scale
      .scaleLinear()
      .domain(d3array.extent(this.state.interperetedData.map(v => v.time)))
      .range([0, this.state.width]);
    return this.result(data);
  }
  stackArea(data) {
    this.area = d3shape
      .area()
      .x(({ data }) => this.scaleX(data.time))
      .y0(([y0, y1]) => this.scaleY(y0))
      .y1(([y0, y1]) => y1);
    return this.area(data);
  }
  render() {
    console.log('rendering');
    const { width, height } = this.state.dimensions;
    const { coin, interperetedData } = this.props;

    if (
      this.props.transactionData[coin].data.length === undefined ||
      this.props.transactionData[coin].data.length === 0 ||
      this.state.series === undefined
    ) {
      return (
        <View style={styles.container}>
          <Text>Currently No Data Available</Text>
          {/* <Spinner type="Wave" isVisible color="#fff" size={10} /> */}
        </View>
      );
    }
    console.log('this.state.series', this.state.series);

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <Text>This is the Primary Data Wrapper</Text>
        <Surface width={400} height={250}>
          <Group x={10} y={10}>
            {this.state.series
              ? this.state.series.map((datum, i) =>
                    (this.stackArea(datum) ? (
                      <Shape
                        d={this.stackArea(datum)}
                        // fill={d3scalechromatic.schemeCategory10[i]}
                        key={this.state.keys[i]}
                        stroke="black"
                        strokeWidth={1}
                      />
                    ) : null))
              : null}
          </Group>
        </Surface>
      </View>
    );
  }
}
const mapStatetoProps = state => ({
  transactionData: state.transactionData,
});

export default connect(mapStatetoProps, null)(PrimaryWrapper);
