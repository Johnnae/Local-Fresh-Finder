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

import MarketList from '../components/MarketList';
import { useMutation, useLazyQuery, useQuery } from '@apollo/client';

import Auth from '../utils/auth';
import { SAVE_MARKET } from "../utils/mutations";
import { QUERY_MARKETS} from "../utils/queries";
import { getSavedMarketIds, saveMarketIds } from "../utils/localStorage";


const queryMarkets = () => {

  // const [userImputData, setUserInputData] = useState({ marketID: '' });

  // const [validated] = useState(false);

  // const [showAlert, setShowAlert] = useState(false);
  // // create state for holding returned form data
  // const [form] = Form.useForm();

  // const [ { loading, data, error }] = useQuery(QUERY_MARKETS);

  // // create state for holding returned query data 
  // const [searchQuery, setSearchQuery] = useState([]);

  // // create state for holding our marketId values
  // const [savedMarketIds, setSavedMarketIds] = useState(getSavedMarketIds());

  // useEffect(() => {
  //   return () => saveMarketIds(savedMarketIds);
  // });

  // create method to search for markets and set state on form submit

  const handleFormSubmit = async (values, event) => {
    event.preventDefault();
    console.log(values);
    if (!values) {
      return false;
    }
    try {
      const { data } = await marketList({
        variables: { ...values }
      });

      const markets = data?.markets || [];
      console.log(markets);
      return data;

    } catch (err) {
      console.error(err);
    }
  };
  

  // // show markets based on farmer name
  // const showMarkets = async (values) => {
  //   console.log(values);

  //   try {
  //     const { data } = await getMarket({
  //       variables: { ...values },
  //     });
  //     setData(data);
  //   } catch {
  //     setError(error);
  //   }
  // }
  
  return (
    <>
      <div>
        <Layout>
          <Header style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "medium",
            padding : "3em",
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
                padding: "2em",
              }}>
              <Form.Item 
                label="Markets" 
                name="Markets" 
                width="50px" 
                rules={[{ required: true, message: "Please search for a market!" }]}
                >
                <Input onPressEnter={handleFormSubmit} placeholder="Search for a market" width="md"  />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Search now!
              </Button>
            </Form>
          </Sider>

          <Content>
            
          </Content>
        </Layout>
      </div> 
        <Footer/>
    </>
  )
  };
export default queryMarkets;
