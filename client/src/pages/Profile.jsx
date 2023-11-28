import { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { removeMarketId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { REMOVE_MARKET } from '../utils/mutations';

import {
  Card,
  Divider,
  Button,
  Row,
  Col,
  Space,
} from 'antd';


const Profile = () => {

  // get toke from Auth.js
  const token = Auth.getProfile();
  // create variable to hold token data
  const farmerId = {farmerId: token.data._id}

  // create state to hold saved market data
  const { loading, data } = useQuery(GET_ME, {
    variables: farmerId,
  });

  const markets = data?.farmer.savedMarkets;

  // create function to remove saved market on button click
  const [removeMarket, { error }] = useMutation(REMOVE_MARKET);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // create function that accepts the market's mongo _id value as param and deletes the market from the database
  const handleDeleteMarket = async (marketId) => {
    const token = Auth.getProfile();
    const farmerId = token.data._id;
    const marketIdToRemove = marketId;

    if (!token) {
      return false;
    }

    try {
     const { data } = await removeMarket({
        variables: { marketId: marketIdToRemove, farmerId: farmerId }
      });
      console.log(data);
      // upon success, remove market's id from localStorage

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
      </div>
      <Divider>
        <h3 className='pt-5'>
          {markets.length
            ? `Viewing ${markets.length} saved ${markets.length === 1 ? 'market' : 'markets'}:`
            : 'Go to the search page to find markets to save!'}
        </h3>
        <Row gutter={[8,8]}>
          {markets.map((markets, index) => {
            return (
              <Col key={index}>
                <Space direction="vertical" size={16}>
                  <Card
                    title={markets.listingName}
                    bordered
                    style={{
                      width: 400,
                      backgroundColor: '#f0f2f5',
                      padding: '10px 0',
                    }}
                  >
                    <p className='flex-container'>{markets.locationAddress}</p>
                    <Button
                      type="primary"
                      onClick={() => handleDeleteMarket(markets._id)}
                    >
                      Delete this Market!
                    </Button>
                  </Card>
                </Space>
              </Col>
            );
          })}
        </Row>
      </Divider>
    </>
  );
};

export default Profile