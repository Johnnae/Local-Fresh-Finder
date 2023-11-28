import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, List, Input, notification} from 'antd';
import {PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { SAVE_MARKET } from '../utils/mutations';
import Auth from '../utils/auth';

const MarketList = ({ markets }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();


  const [userFormData, setUserFormData] = useState({ itemOne: '', itemTwo: '', itemThree: ''});

  const [saveMarket, { data }] = useMutation(SAVE_MARKET);

  const list = Array.from(markets); 
  
  if (!markets.length) {
    return <h3>There are currently no markets in your area!</h3>;
  }

  const showModal = () => {
    setIsModalOpen(true);
};
  const handleOk = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const onFinish = async (values) => {
    console.log('________Received values:____', values);

    const marketID = values._id;
    console.log(marketID);

    const token = Auth.getProfile()
    console.log(token.data._id)

    try{
      const { data } = await saveMarket ({
        variables: {
          marketId: values._id,
          farmerId: token.data._id,
        }
      });

      if(data.saveMarket) {
        notification.success({
          message: 'Market Saved',
          description: 'The market has been successfully saved.',
        });
      }

    } catch (err) {
      console.log(err);
    }
      setUserFormData({
        itemOne: '',
        itemTwo: '',
        itemThree: ''
      });
  };


  return (
    <div>
    <List
      itemLayout="vertical"
      size="large"
      dataSource={list}
      pagination={{
        pageSize: pageSize,

      }}
      renderItem={(item) => (
        <List.Item 
          form={form}
          key={item._id}
        >
          <List.Item.Meta
            title={item.listingName}
            description={item.locationAddress}
          />
          <Button icon={<PlusOutlined />} type="link" key="list-vertical-star-o" onClick={() => { onFinish(item) }}> Add to your list </Button>
        </List.Item>
      )}
    />
    </div>
  );
}

export default MarketList;