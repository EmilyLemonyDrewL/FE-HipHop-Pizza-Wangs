import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import getItems from '../../utils/data/itemData';
import MenuCard from '../../components/MenuCard';
import AddToOrderForm from '../../components/AddItemForm';

const MenuList = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [items, setItems] = useState([]);

  const handleChoice = (itemObj) => {
    // eslint-disable-next-line no-console
    console.log('Chosen item:', itemObj);
  };

  if (!orderId) {
    return <p>Loading...</p>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await getItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching menu items:', error.message);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="menu-list">
      <div>
        <h2>Add Item to Order</h2>
        <AddToOrderForm orderId={orderId} />
      </div>
      <h2>Menu</h2>
      <div className="d-flex flex-wrap">
        {items.map((item) => (
          <MenuCard key={item.id} itemObj={item} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
