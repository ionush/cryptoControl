export const addBTCValue = data => ({
  type: 'GET_HIST_BTC_DATA',
  payload: data,
  meta: { coin: 'BTC' },
});

export const addETHValue = data => ({
  type: 'GET_HIST_ETH_DATA',
  payload: data,
  meta: { coin: 'ETH' },
});

export const addLTCValue = data => ({
  type: 'GET_HIST_LTC_DATA',
  payload: data,
  meta: { coin: 'LTC' },
});
