import { useState, useEffect } from 'react';
import {
  Divider,
  Col,
  Form,
  Button,
  Card,
  Row,
  Space
} from 'antd';

import Auth from '../utils/auth';
import { searchMarkets } from '../utils/API';
import { saveMarketIds, getSavedMarketIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import {  SAVE_market } from '../utils/mutations';

const SavedMarkets = () => {
  // create state for holding returned google api data
  const [searchedMarkets, setSearchedMarkets] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved marketId values
  const [savedMarketIds, setSavedMarketIds] = useState(getSavedMarketIds());

  const [saveMarket, { error }] = useMutation(SAVE_MARKET);

  // set up useEffect hook to save `savedmarketIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveMarketIds(savedMarketIds);
  });

  // create method to search for markets and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchMarket(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const marketData = items.map((market) => ({
        marketId: market.id,
        authors: market.volumeInfo.authors || ['No author to display'],
        title: market.volumeInfo.title,
        description: market.volumeInfo.description,
        image: market.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedMarkets(marketData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Divider>
          <h1>Search for food items in your area!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for food items in your area'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Divider>
      </div>

      <Divider>
        <h2 className='pt-5'>
          {searchedMarkets.length
            ? `Viewing ${searchedMarkets.length} results:`
            : 'Search for food to begin'}
        </h2>
        <Row>
          {searchedMarkets.map((markets) => {
            return (
              <Col md="4" key={markets.marketsID}>
                <Space direction="vertical" size={16}>
                <Card border='dark'>
                    <Card title={markets.title} style={{ width: 300 }}>
                      <p className='small'>Market: {markets.authors}</p>
                      <p>Description: {markets.description} </p>
                      <p>Vendors Items: {markets.Farmers}</p>
                      <p>TBD Content</p>
                    </Card>
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

export default SavedMarkets;
