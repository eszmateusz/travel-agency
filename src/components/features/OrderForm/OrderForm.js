import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';

const OrderForm = () => (
  <Row>
    <Col xs={12}>
      <OrderSummary />
    </Col>
  </Row>
);

OrderForm.propTypes = {
};

export default OrderForm; 