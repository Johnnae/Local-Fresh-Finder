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

const { Header, Content, Sider } = Layout;
import Footer from '../components/Footer';

import { useMutation } from '@apollo/client';
import { saveMarketIds, getSavedMarketIds } from '../utils/localStorage';

import Auth from '../utils/auth';
import { SAVE_MARKET } from "../utils/mutations";
import { QUERY_MARKETS } from "../utils/queries";


const SavedMarkets = () => {

  // create state for holding returned market data
  const [searchedMarkets, setSearchedMarkets] = useState([]);
  // create state for holding our search field data
  const [zipCode, setSearchInput] = useState('');

  // create method to search for markets and set state on form submit
  const [savedMarketIds, setSavedMarketIds] = useState(getSavedMarketIds());

  const [savedMarket, { error }] = useMutation(SAVE_MARKET);

  // set up useEffect hook to save `savedMarketIds` list to localStorage on component unmount
  useEffect(() => {
    return () => saveMarketIds(savedMarketIds);
  });

  const [radius, setValue] = useState('99');

  // create method to handle saving a market to our database
  const handleFormSubmit = async (values) => {
    // event.preventDefault();
    console.log(values.Radius, values.Zipcode);

    const SearchZipCode = values.Zipcode
    const SearchRadius = values.Radius
    if (!SearchZipCode && !SearchRadius) {
      return false;
    }

    try {
      const { loading, data } = useQuery(QUERY_MARKETS);
      
      const response = await searchMarkets(SearchZipCode, SearchRadius);

      console.log(response);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { markets } = await response.json();

      const marketData = markets.map((data) => ({
        marketId: data.id,
        farmersMarket: data.listingName,
        address: data.listingAddress,
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
        <Layout>
          <Header style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            fontSize: "30px",
            }}>
            <h1>Search for markets in your area!</h1>
          </Header>
        </Layout>
        <Layout hasSider>
          <Sider>
            <Form
              name="searchBar"
              initialValues={{ remember: true }}
              width="md" 
              onFinish={handleFormSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: "white",
                padding: "20px",
              }}>
              <Form.Item 
                label="Zipcode" 
                name="Zipcode" 
                width="50px" 
                rules={[{ required: true, message: "Please input your zipcode!" }]}
                >
                <InputNumber value={zipCode} placeholder="Enter your 5 digit Zipcode" min={1} max={99999} width="md"  />
              </Form.Item>
              <Form.Item 
                label="Radius" 
                name="Radius" 
                rules={[{ required: true }]} width="md"
                >
                <InputNumber placeholder="Enter your radius" min={1} max={100} value={radius}/>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Search now!
              </Button>
            </Form>
            <Divider>
              <Space
                direction="vertical"
                size="middle"
                style={{
                  display: 'flex',
                }}
              >
                {searchedMarkets.map((market) => {
                  return(
                    <Card title={market.farmersMarket} bordered={false} size="small" key={market.marketId}>
                      <p>{market.streetAddress}</p>
                      <p>{market.city}, {market.state} {market.zipCode}</p>
                      <p>{market.marketPhone ? market.marketPhone : "No phone number listed"}</p>
                      <p>{market.contact_email ? market.contact_email : "No email available"}</p>
                      <p>{market.website === null ? "No website available" : market.website}</p>
                    </Card>
                  )})}
              </Space>
            </Divider>
          </Sider>
          <Content>Map</Content>
        </Layout>
      </div> 
        <Footer/>
    </>
  )
  };
export default SavedMarkets;
