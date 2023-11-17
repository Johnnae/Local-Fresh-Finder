const MarketList = ({ markets, title }) => {
  if (!markets.length) {
    return <h3>They have not signed up for any farmers markets</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {markets &&
        markets.map((market) => (
          <div key={market._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {market.listingName} <br />
            </h4>
            <div className="card-body bg-light p-2">
              <p>{market.listingAddress}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MarketList;