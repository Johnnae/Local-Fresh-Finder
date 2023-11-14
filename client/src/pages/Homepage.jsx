import { useState, useEffect } from "react";
import {
  Divider,
  Col,
  Form,
  Button,
  Card,
  Row,
  Space, 
  Input,
  Layout,
  InputNumber,
} from 'antd';

const { Header, Content } = Layout;
import Footer from '../components/Footer';

import { useMutation } from '@apollo/client';
import { saveMarketIds, getSavedMarketIds } from '../utils/localStorage';

import Auth from '../utils/auth';
import { searchMarkets } from '../utils/API';
import { SAVE_BOOK } from "../../../../Book-Search-Engine/client/src/utils/mutations";
import { SAVE_market } from "../utils/mutations";


const SavedMarkets = () => {
  // create state for holding returned market data
  const [searchedMarkets, setSearchedMarkets] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create method to search for markets and set state on form submit
  const [savedMarketIds, setSavedMarketIds] = useState(getSavedMarketIds());

  const [savedMarket, { error }] = useMutation(SAVE_market);

  // set up useEffect hook to save `savedMarketIds` list to localStorage on component unmount
  useEffect(() => {
    return () => saveMarketIds(savedMarketIds);
  });

  const [value, setValue] = useState('99');

  // create method to handle saving a market to our database
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchMarkets(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { markets } = await response.json();

      const marketData = markets.map((data) => ({
        farmersMarket: data.listing_name,
        lastUpdated: data.updatetime,
        image: data.listing_image,
        contactEMail: data.contact_email,
        website: data.media_website,
        marketPhone: data.contact_phone,
        streetAddress: data.location_street,
        city: data.location_city,
        state: data.location_state,
        zipCode: data.location_zipcode,
        latitude: data.location_x,
        longitude: data.location_y,
      }));

      setSearchedMarkets(marketData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  }
    // create function to handle saving a market to our database
  const handleSaveMarket = async (marketId) => {
    const marketToSave = searchedMarkets.find((market) => market.marketId === marketId);

    // get token from context
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await savedMarket({
        variables: { marketData: { ...marketToSave } },
      });

      if (error) {
        throw new Error('something went wrong!');
      }

      // if market successfully saves to user's account, save market id to state
      setSavedMarketIds([...savedMarketIds, marketToSave.marketId]);
    } catch (err) {
      console.error(err);
    }
  };

  

  return (
    <>
      <div>
        <Header>
          <h1>Search for Markets in your area!</h1>
          <Form
            name="searchBar"
            initialValues={{ remember: true }}
            width= "md" >
          <Form.Item label="Zipcode" name="Zipcode" width="50px" rules={[{ required: true, message: "Please input your zipcode!" }]}>
              <InputNumber placeholder="Enter your 5 digit Zipcode" min={1} max={99999} width="md" />
            </Form.Item>
          <Form.Item label="Radius" name="Radius" rules={[{ required: true }]} width="md">
              <InputNumber placeholder="Enter your radius" min={1} max={100} value={value} onChange={setValue} />
            </Form.Item>
          </Form>
        </Header>
        <Content>
          <div>
            <div>
              <p> Sample Text 1</p>
              <p> Sample text 2</p>
              <p> Sample Text 3</p>
            </div>
          </div>
        </Content>
      </div> 
        <Footer/>
    </>
  )
  };
export default SavedMarkets;