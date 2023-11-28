import {Card, Row, Col, Button, Modal, Space} from 'antd';
import React, { useState } from 'react';

const MarketList = ({ markets }) => {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  if (!markets.length) {
    return <h3>There are currently no markets in your area!</h3>;
  }

  const gridStyle = {
    width: 'med',
    textAlign: 'left',
    padding: '8px 0',
  };


  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };


  return (
    <div>
      <Row gutter={[8,8]}>
          {markets &&
            markets.map((market) => (
              <Col span={8} className="gutter-row" key={market.listing_id}>
                <Card
                  title={market.listingName}
                  key={market._id}
                  bordered
                  style={gridStyle}>
                  <p><b>Location:</b></p>
                  <p>{market.locationAddress}</p>
                  <Button type="primary" onClick={showModal}>
                    More Info
                  </Button>
                  <Modal
                    open={open}
                    title="More Info"
                    onOk={handleOk}
                    onCancel={handleCancel}>
                    <h4>Address:</h4>
                    <p>{market.locationAddress}</p>
                    <h4> Farms Attending:</h4>
                  </Modal>
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
};

export default MarketList;