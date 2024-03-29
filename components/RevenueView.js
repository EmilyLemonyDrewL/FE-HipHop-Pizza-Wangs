import React, { useState, useEffect } from 'react';
import { getTotalRevenue, getTotalRevenueWithTip } from '../utils/data/orderData';

const TotalRevenueComponent = () => {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [revenueWithTip, setRevenueWithTip] = useState(null);

  useEffect(() => {
    getTotalRevenue()
      .then((data) => {
        // after getting the revenue of each order, I need to get the sum of all totals together
        const total = Object.values(data.total_revenue_per_order).reduce((acc, cur) => acc + cur, 0);
        setTotalRevenue(total);
      })
      .catch((error) => {
        console.error('Error fetching total revenue:', error);
      });
  }, []);

  useEffect(() => {
    getTotalRevenueWithTip()
      .then((data) => {
        const total = Object.values(data.total_revenue_per_order_with_tip).reduce((acc, cur) => acc + cur, 0);
        setRevenueWithTip(total);
      })
      .catch((error) => {
        console.error('Error fetching total revenue with tip:', error);
      });
  }, []);

  return (
    <div>
      <div>
        <h2>Total Revenue without tips</h2>
        {totalRevenue !== null ? (
          <p>Amount: ${totalRevenue.toFixed(2)}</p>
        ) : (
          <p>Loading total revenue...</p>
        )}
      </div>
      <div>
        <h2>Total Revenue with tips</h2>
        {revenueWithTip !== null ? (
          <p>Amount: ${revenueWithTip.toFixed(2)}</p>
        ) : (
          <p>Loading total revenue...</p>
        )}
      </div>
    </div>
  );
};

export default TotalRevenueComponent;
