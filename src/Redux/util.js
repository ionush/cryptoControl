import moment from 'moment';

export const promisePending = (state, action) => {
  const { coin } = action.meta;
  return {
    ...state,
    [coin]: { fetchingData: true, ...state[coin] },
  };
};

export const promiseRejected = (state, action) => {
  const { coin } = action.meta;
  return {
    ...state,
    [coin]: { error: true, ...state[coin] },
  };
};

const sortTradeData = tradeData =>
  tradeData.map((trade, i) => {
    const singleTradeObj = {};
    singleTradeObj.time = trade.time.split('T')[0];
    singleTradeObj.date = trade.time.split('T')[1];
    const price = parseFloat(trade.price, 10);
    singleTradeObj.price = price;
    const size = parseFloat(trade.size, 10);
    singleTradeObj.size = size;
    return singleTradeObj;
  });

export const transDataPromiseFulfilled = (state, action) => {
  const newresult = {
    ...state,
    [action.meta.coin]: {
      data: [action.payload, ...state[action.meta.coin].data],
    },
  };
  console.log('new transData results are in', newresult);
  return newresult;
};

export const tradeDataPromiseFulfilled = (state, action) => {
  if (action.payload.data.length !== 0) {
    const result = sortTradeData(action.payload.data);
    const newresult = {
      ...state,
      [action.meta.coin]: {
        ...state[action.meta.coin],
        fetchingData: false,
        data: [result, ...state[action.meta.coin].data],
      },
    };
    console.log('new tradeData results are in', newresult);
    return newresult;
  }
  return state;
};
