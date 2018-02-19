import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import IntroModal from './IntroModal';
import Tab from './Tab';
// import Welcome from './Welcome';
import { getTradeData, connectSocket } from '../Redux/asyncActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Main extends React.Component {
  constructor() {
    super();
    this.state = { introScreen: true };
  }
  componentDidMount() {
    this.props.getTradeData();
    this.props.connectSocket();

    this.interval = setInterval(this.props.getTradeData, 30000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log('rendering');
    const { introScreen } = this.state;
    setTimeout(() => {
      this.setState({ introScreen: false });
    }, 1000);

    return introScreen ? <IntroModal /> : <Tab />;
  }
}

const mapStatetoProps = state => ({
  tradeData: state.tradeData,
});
const mapDispatchtoProps = dispatch => ({
  getTradeData() {
    console.log('getting Trade data');
    return dispatch(getTradeData());
  },
  connectSocket() {
    return dispatch(connectSocket());
  },
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Main);
