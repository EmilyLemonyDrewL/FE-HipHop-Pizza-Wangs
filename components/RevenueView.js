/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { getAllClosedOrders } from '../utils/data/orderData';
import { getItemsBasedOnOrder } from '../utils/data/orderItemData';

const RevenueView = () => {
  const [closedOrders, setClosedOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchClosedOrders = async () => {
      try {
        const orders = await getAllClosedOrders();
        setClosedOrders(orders);
      } catch (error) {
        console.error('Error fetching closed orders:', error);
      }
    };

    fetchClosedOrders();
  }, []); // This useEffect runs once on component mount to fetch closed orders

  useEffect(() => {
    const calculateTotalRevenue = async () => {
      try {
        const calculatedTotal = await Promise.all(
          closedOrders.map(async (order) => {
            const orderItems = await getItemsBasedOnOrder(order.id);
            console.log('Order ID:', order.id);
            console.log('Order Items:', orderItems);

            const orderTotal = orderItems.reduce((itemTotal, item) => {
              console.log('Item:', item);
              const itemPrice = parseFloat(item.price);
              const itemQuantity = parseFloat(item.quantity);

              console.log('Item Price:', itemPrice);
              console.log('Item Quantity:', itemQuantity);

              if (!Number.isNaN(itemPrice) && !Number.isNaN(itemQuantity)) {
                const parsedPrice = parseFloat(itemPrice);
                const parsedQuantity = parseFloat(itemQuantity);

                console.log('Parsed Price:', parsedPrice);
                console.log('Parsed Quantity:', parsedQuantity);

                return itemTotal + parsedQuantity * parsedPrice;
              }

              return itemTotal;
            }, 0);

            console.log('Order Total:', orderTotal);
            return orderTotal;
          }),
        );

        console.log('Calculated Total:', calculatedTotal);

        const totalRevenueResult = calculatedTotal.reduce((acc, value) => acc + value, 0).toFixed(2);
        console.log('Total Revenue:', totalRevenueResult);
        setTotalRevenue(totalRevenueResult);
      } catch (error) {
        console.error('Error calculating total revenue:', error);
      }
    };

    calculateTotalRevenue();
  }, [closedOrders]); // This useEffect recalculates total revenue whenever closedOrders changes

  return (
    <div>
      <h1>Total Revenue from Closed Orders</h1>
      <p>Total Revenue: ${totalRevenue}</p>
    </div>
  );
};

export default RevenueView;
