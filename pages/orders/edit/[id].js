import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleOrder } from '../../../utils/data/orderData';
import OrderForm from '../../../components/OrderForm';

export default function EditOrder() {
  const [editOrder, setEditOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setEditOrder);
  }, [id]);

  return (
    <>
      <h2>Edit Order</h2>
      <div>
        <OrderForm obj={editOrder} />
      </div>
    </>
  );
}
