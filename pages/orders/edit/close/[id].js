import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../../utils/data/orderData';
import CloseOrderForm from '../../../../components/CloseOrderForm';

const FinishOrder = () => {
  const router = useRouter();
  const { id: orderId } = router.query;
  const [closedOrder, setClosedOrder] = useState({});

  useEffect(() => {
    getSingleOrder(orderId).then((data) => {
      setClosedOrder(data);
    });
  }, [orderId]);

  if (!orderId || Object.keys(closedOrder).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Close Order {orderId}</h2>
      <CloseOrderForm orderObj={closedOrder} />
    </div>
  );
};

export default FinishOrder;
