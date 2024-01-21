import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { deleteOrderItem } from '../utils/data/orderItemData';
import { getItemsByOrderId } from '../utils/data/orderData';

export default function ItemCard({ itemObj, order }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchQuantity = async () => {
      try {
        const orderItems = await getItemsByOrderId(order.id);

        // converted item.item and itemObj.id to strings so they both match
        const itemInOrder = orderItems.find((item) => String(item.item) === String(itemObj.id));

        setQuantity(itemInOrder ? itemInOrder.quantity : 0);
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };

    fetchQuantity();
  }, [order.id, itemObj.id]);

  const deleteThisItem = () => {
    if (window.confirm(`Remove ${quantity} ${quantity === 1 ? 'item' : 'items'} from the order?`)) {
      const payload = { order_item: itemObj.id };
      deleteOrderItem(order.id, payload);
      router.reload();
    }
  };

  return (
    <Card className="text-center" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Header>{itemObj.name}</Card.Header>
        <Card.Text>{itemObj.description}</Card.Text>
        <Card.Text>Price: $ {itemObj.price}</Card.Text>
        <Card.Text>Quantity: {quantity}</Card.Text>
        <Button variant="btn btn-dark" onClick={deleteThisItem}>Delete</Button>
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
