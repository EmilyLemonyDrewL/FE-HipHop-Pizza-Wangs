import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { deleteOrderItem } from '../utils/data/orderItemData';

export default function ItemCard({ itemObj, order }) {
  const router = useRouter();
  const deleteThisItem = () => {
    if (window.confirm('Remove this item from the order?')) {
      const payload = { order_item: itemObj.id };
      deleteOrderItem(order.id, payload);
      router.reload();
    }
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Header>{itemObj.name}</Card.Header>
        <Card.Text>{itemObj.description}</Card.Text>
        <Card.Text>Price: $ {itemObj.price}</Card.Text>
        <Button onClick={deleteThisItem}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
