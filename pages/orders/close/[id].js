// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getSingleOrder } from '../../../utils/data/orderData';
// import CloseOrderForm from '../../../components/CloseOrderForm';

// const FinishOrder = () => {
//   const router = useRouter();
//   const { orderId } = router.query;
//   const [closedOrder, setClosedOrder] = useState({});

//   useEffect(() => {
//     getSingleOrder(orderId).then(setClosedOrder);
//   }, [orderId]);

//   return (
//     <div>
//       <h2>Close Order {orderId}</h2>
//       <CloseOrderForm openOrder={closedOrder} />
//     </div>
//   );
// };

// export default FinishOrder;
