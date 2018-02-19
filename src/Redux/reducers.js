import { combineReducers } from 'redux';
import {
  promisePending,
  promiseRejected,
  tradeDataPromiseFulfilled,
  transDataPromiseFulfilled,
} from './util';

const dataLayout = {
  BTC: { fetchingData: true, data: [] },
  ETH: { fetchingData: true, data: [] },
  LTC: { fetchingData: true, data: [] },
};

const transactionLayout = {
  BTC: { data: [] },
  ETH: { data: [] },
  LTC: { data: [] },
};

const transactionData = (state = transactionLayout, action) => {
  switch (action.type) {
    case 'GET_HIST_BTC_DATA':
      return transDataPromiseFulfilled(state, action);

    case 'GET_HIST_ETH_DATA':
      return transDataPromiseFulfilled(state, action);

    case 'GET_HIST_LTC_DATA':
      return transDataPromiseFulfilled(state, action);

    default:
      return state;
  }
};

const tradeData = (state = dataLayout, action) => {
  switch (action.type) {
    case 'GET_TRADE_BTC_DATA_PENDING':
      return promisePending(state, action);

    case 'GET_TRADE_BTC_DATA_FULFILLED':
      return tradeDataPromiseFulfilled(state, action);

    case 'GET_TRADE_BTC_DATA_REJECTED':
      return promiseRejected(state, action);

    case 'GET_TRADE_ETH_DATA_PENDING':
      return promisePending(state, action);

    case 'GET_TRADE_ETH_DATA_FULFILLED':
      return tradeDataPromiseFulfilled(state, action);

    case 'GET_TRADE_ETH_DATA_REJECTED':
      return promiseRejected(state, action);

    case 'GET_TRADE_LTC_DATA_PENDING':
      return promisePending(state, action);

    case 'GET_TRADE_LTC_DATA_FULFILLED':
      return tradeDataPromiseFulfilled(state, action);

    case 'GET_TRADE_LTC_DATA_REJECTED':
      return promiseRejected(state, action);
    default:
      return state;
  }
};

const rootReducer = combineReducers({ transactionData, tradeData });

export default rootReducer;
