import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

export default function MenuCard({ itemObj }) {
  if (!itemObj) {
    return null;
  }

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{itemObj.name}</Card.Title>
        <p>Description: {itemObj.description}</p>
        <p>Price: {itemObj.price}</p>
      </Card.Body>
    </Card>
  );
}

MenuCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
