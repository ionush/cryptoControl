import axios from 'axios';
import { addBTCValue, addETHValue, addLTCValue } from './actionCreators';

// const url = '';
const tradeURL = {
  BTC: 'https://api-public.sandbox.gdax.com/products/BTC-USD/trades',
  ETH: 'https://api-public.sandbox.gdax.com/products/ETH-USD/trades',
  LTC: 'https://api-public.sandbox.gdax.com/products/LTC-USD/trades',
};
// gets historical data of trades from the past hour
// export const getHistData = () => (dispatch) => {
//   dispatch({
//     type: 'GET_HIST_BTC_DATA',
//     payload: axios.get(url),
//     meta: { coin: 'BTC' },
//   });
//   dispatch({
//     type: 'GET_HIST_ETH_DATA',
//     payload: axios.get(url),
//     meta: { coin: 'ETH' },
//   });
//   dispatch({
//     type: 'GET_HIST_LTC_DATA',
//     payload: axios.get(url),
//     meta: { coin: 'LTC' },
//   });
// };

export function getTradeData() {
  return (dispatch) => {
    dispatch({
      type: 'GET_TRADE_BTC_DATA',
      payload: axios.get(tradeURL.BTC),
      meta: { coin: 'BTC' },
    });
    dispatch({
      type: 'GET_TRADE_ETH_DATA',
      payload: axios.get(tradeURL.ETH),
      meta: { coin: 'ETH' },
    });
    dispatch({
      type: 'GET_TRADE_LTC_DATA',
      payload: axios.get(tradeURL.LTC),
      meta: { coin: 'LTC' },
    });
  };
}
const SOCKET_URL = 'wss://ws-feed.gdax.com';

export function connectSocket() {
  const ws = new WebSocket(SOCKET_URL);

  return (dispatch) => {
    ws.onopen = () => {
      const productIds = ['BTC-USD', 'ETH-USD', 'LTC-USD'];

      ws.send(JSON.stringify({
        type: 'subscribe',
        channels: [{ name: 'matches', product_ids: productIds }],
      }));
    };

    ws.onmessage = (msg) => {
      // console.log('msg', msg.data);

      const {
        type, price, product_id, size, side,
      } = JSON.parse(msg.data);
      const data = {
        productId: product_id,
        time: new Date(),
        price: Number(price),
        size,
        side,
      };

      if (type === 'match' && price && product_id === 'BTC-USD') {
        dispatch(addBTCValue(data));
      } else if (type === 'match' && price && product_id === 'ETH-USD') {
        dispatch(addETHValue(data));
      } else if (type === 'match' && price && product_id === 'LTC-USD') {
        dispatch(addLTCValue(data));
      }
    };

    ws.onerror = (e) => {
      console.log(e.message);
    };

    ws.onclose = (e) => {
      console.log(e.code, e.reason);
    };
  };
}
// gets current data and updates data every 5 seconds
// export const getData = (dispatch) => {};
