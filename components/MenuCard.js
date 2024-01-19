import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function MenuCard({ itemObj, handleChoice }) {
  if (!itemObj) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{itemObj.name}</Card.Title>
        <p>Description: {itemObj.description}</p>
        <p>Price: {itemObj.price}</p>
        {handleChoice ? (
          <Button onClick={() => handleChoice(itemObj)}>
            Add Item
          </Button>
        ) : '' }
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
  handleChoice: PropTypes.func.isRequired,
};
