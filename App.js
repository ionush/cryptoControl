import React from 'react';
import { Provider } from 'react-redux';
import Main from './src/Components/Main';
import store from './src/Redux/store';
import IntroModal from './src/Components/IntroModal';
import SandBox from './src/Components/SandBox';

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <Main />
        {/* <SandBox /> */}
      </Provider>
    );
  }
}
