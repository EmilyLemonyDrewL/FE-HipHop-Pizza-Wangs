import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import OrderCard from '../components/OrderCard';
import { getOrders } from '../utils/data/orderData';
import { useAuth } from '../utils/context/authContext';

function Orders() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getOrders(user.uid).then((data) => setOrders(data));
  }, [user]);
  const showOrders = () => {
    getOrders(user.uid).then((data) => setOrders(data));
  };

  return (
    <article className="orders">
      <Button
        onClick={() => {
          router.push('/orders/new');
        }}
      >
        New Order
      </Button>
      <h1>Orders</h1>
      {orders.map((order) => (
        <section key={`order--${order.id}`} className="order">
          <OrderCard id={order.id} customer_name={order.customer_name} status={order.status} onUpdate={showOrders} />
        </section>
      ))}
    </article>
  );
}

export default Orders;
