import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddItemForm = ({ items, onAddItem }) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);

  const HandleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddItem = () => {
    onAddItem(selectedItem, quantity);
    setSelectedItem('');
    setQuantity(1);
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Selected Item</Form.Label>
        <Form.Control as="select" value={selectedItem} onChange={HandleItemChange}>
          <option value="" disabled>Select items</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
              {item.description}
              {item.price}
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
          min="1"
        />
      </Form.Group>

      <Button type="submit" onClick={handleAddItem}>
        Add Item
      </Button>
    </Form>
  );
};

AddItemForm.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddItem: PropTypes.func.isRequired,
};

export default AddItemForm;
