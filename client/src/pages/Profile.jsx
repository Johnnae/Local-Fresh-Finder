import { useState, useEffect } from 'react';
import {
  Card,
  Divider,
  Button,
  Row,
  Col,
  Space,
} from 'antd';

import Auth from '../utils/auth';
import { removeMarketId } from '../utils/localStorage';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_MARKET } from '../utils/mutations';


const saveMarket = () => {
  // create state to hold saved market data
  const { loading, data } = useQuery(GET_ME);
  const [removeMarket, { error }] = useMutation(REMOVE_MARKET);

  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // create function that accepts the market's mongo _id value as param and deletes the market from the database
  const handleDeleteMarket = async (marketId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
     const { data } = await removeMarket({
        variables: { marketId }
      });
      console.error(err);
      // upon success, remove market's id from localStorage
      removeMarketId(marketId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Divider>
          <h1>Viewing Farmers Markets!</h1>
        </Divider>
      </div>
      <Divider>
        <h2 className='pt-5'>
          {userData.savedMarkets.length
            ? `Viewing ${userData.saveMarket.length} saved ${userData.saveMarket.length === 1 ? 'market' : 'markets'}:`
            : 'You have no saved farmers markets!'}
        </h2>
        <Row>
          {userData.saveMarket.map((markets) => {
            return (
              <Col>
                <Space direction="vertical" size={16}>
                  <Card
                    key={markets.marketId}
                    title="{Market}"
                    style={{
                      width: 300,
                    }}
                  >
                    <p>Date:</p>
                    <p>Time: </p>
                    <p>Location: </p>
                    <p>Items committed to: </p>
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

export default saveMarket