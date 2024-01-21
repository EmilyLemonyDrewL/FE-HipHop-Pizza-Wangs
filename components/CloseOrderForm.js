import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { updateOrder } from '../utils/data/orderData';
import { useAuth } from '../utils/context/authContext';

const CloseOrderForm = ({ orderObj }) => {
  const [paymentType, setPaymentType] = useState('');
  const [tipAmount, setTipAmount] = useState(0);
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderUpdate = {
      id: orderObj.id,
      status: 'Closed',
      payment_type: paymentType,
      date_of_order_closure: new Date().toISOString().split('T')[0],
      cashierId: user.uid, // may need to be cashierId
      tip_amount: tipAmount,
      customer_name: orderObj.customer_name,
      customer_phone: orderObj.customer_phone,
      customer_email: orderObj.customer_email,
      order_type: orderObj.order_type,
    };

    updateOrder(orderUpdate)
      .then(() => {
        // write a message that handles succeful update
      })
      .catch((error) => {
        console.error('Error updating order:', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="paymentTypeInput">
        <Form.Label>Payment Type</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter payment type"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="tipAmountInput">
        <Form.Label>Tip Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter tip amount"
          value={tipAmount}
          onChange={(e) => setTipAmount(parseFloat(e.target.value) || 0)}
        />
      </Form.Group>

      <Button variant="btn btn-dark" type="submit">Close Order</Button>
    </Form>
  );
};

CloseOrderForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  orderObj: PropTypes.object.isRequired,
};

export default CloseOrderForm;
