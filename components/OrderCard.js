import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { deleteOrder } from '../utils/data/orderData';

const OrderCard = ({
  id,
  // eslint-disable-next-line camelcase
  customer_name,
  status,
  onUpdate,
}) => {
  const deleteThisOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      deleteOrder(id).then(() => onUpdate());
    }
  };

  const router = useRouter();

  function editOrder() {
    router.push(`/orders/edit/${id}`);
  }

  function endOrder() {
    router.push(`orders/close/${id}`);
  }

  return (
    <Card className="text-center" style={{ width: '18rem', margin: '10px' }}>
      <h4>Order Status: {status}</h4>
      <Card.Body>
        {/* eslint-disable-next-line camelcase */}
        <Card.Text>Customer name: {customer_name}</Card.Text>
      </Card.Body>
      <Link href={`/orders/${id}`} passHref>
        <Button variant="btn btn-dark">Details</Button>
      </Link>
      {status === 'Open' && (
        <>
          <Button variant="btn btn-dark" onClick={deleteThisOrder}>Cancel Order</Button>
          <Button variant="btn btn-dark" type="edit" onClick={() => editOrder(id)}> Edit Order Details</Button>
          <Button variant="btn btn-dark" type="close" onClick={() => endOrder(id)}> Close</Button>
        </>
      )}
    </Card>
  );
};

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  customer_name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderCard;
