import { useState, useEffect } from "react";
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_MARKETS } from '../utils/queries'

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

import MarketListFarmer from '../components/MarketListFarmer';

const FarmerPage = () => {

  const { loading, data } = useQuery(QUERY_MARKETS);
  const markets = data?.markets || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!markets.length || !markets.length === 0) {
    return <h3>No Markets Found</h3>;
  }


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
            padding: "3em",
          }}>
            <h1>Search for markets in your area!</h1>
          </Header>
        </Layout>
        <Content>
          <MarketListFarmer markets={markets} />
        </Content>
      </div>
    </>
  );
};

export default FarmerPage;
