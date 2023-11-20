export const getSavedMarketIds = () => {
  const savedMarketIds = localStorage.getItem('saved_markets')
    ? JSON.parse(localStorage.getItem('saved_markets'))
    : [];

  return savedMarketIds;
};

export const saveMarketIds = (marketIdArr) => {
  if (marketIdArr.length) {
    localStorage.setItem('saved_markets', JSON.stringify(marketIdArr));
  } else {
    localStorage.removeItem('saved_markets');
  }
};

export const removeMarketId = (marketId) => {
  const savedMarketIds = localStorage.getItem('saved_markets')
    ? JSON.parse(localStorage.getItem('saved_markets'))
    : null;

  if (!savedMarketIds) {
    return false;
  }

  const updatedSavedMarketIds = savedMarketIds?.filter((savedMarketId) => savedMarketId !== marketId);
  localStorage.setItem('saved_markets', JSON.stringify(updatedSavedMarketIds));

  return true;
};
