import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createOrderItem } from '../utils/data/orderItemData';
import getItems from '../utils/data/itemData';

const AddToOrderForm = ({ orderId }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await getItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };

    fetchItems();
  }, []);

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedItem) {
      try {
        await createOrderItem({
          order: orderId,
          item: selectedItem,
          quantity,
        });
        router.push(`/orders/${orderId}`);
      } catch (error) {
        console.error('Error creating order item', error);
      }

      // This clears the form's state after submitting
      setSelectedItem('');
      setQuantity(1);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Select Item</Form.Label>
        <Form.Control as="select" value={selectedItem} onChange={handleItemChange}>
          <option value="" disabled>Select an item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - ${item.price}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
        />
      </Form.Group>

      <Button variant="btn btn-dark" type="submit">Add Item to Order</Button>
    </Form>
  );
};

AddToOrderForm.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default AddToOrderForm;
