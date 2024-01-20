// import React, { useState, useEffect } from 'react';
// import Form from 'react-bootstrap/Form';
// import { useRouter } from 'next/router';
// import { Button, FloatingLabel } from 'react-bootstrap';
// import { useAuth } from '../utils/context/authContext';
// import { updateOrder, getSingleOrder, closeOutOrder } from '../utils/data/orderData';

// const initialState = {
//   payment_type: '',
//   tip_amount: 0,
//   date_of_order_closure: '2024-01-01',
// };

// function CloseOrderForm({ orderObj }) {
//   const [closeOrderInput, setCloseOrderInput] = useState(initialState);
//   const [orderDetails, setOrderDetails] = useState({});
//   const router = useRouter();
//   const { user } = useAuth();
//   const { id } = router.query;
//   const currentdate = new Date().toISOString().split('T')[0];

//   useEffect(() => {
//     if (id) {
//       getSingleOrder(id).then(setOrderDetails);
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCloseOrderInput((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     closeOutOrder({ ...closeOrderInput, date_of_order_closure: currentdate, id });
//     updateOrder({ ...orderDetails, open: false, id });
//     router.push(`/orders/${id}`);
//   };

//   return (
//     <div>
//       <Form onSubmit={handleSubmit}>
//         <h2 className="text-white mt-5">Close Order</h2>

//         <FloatingLabel controlId="paymentTypeSelect" label="Payment Type" className="mb-3">
//           <Form.Select name="payment_type" onChange={handleChange} value={closeOrderInput.payment_type}>
//             <option value="">Select Payment Type</option>
//             <option value="Credit/Debit">Credit/Debit</option>
//             <option value="Cash">Cash</option>
//           </Form.Select>
//         </FloatingLabel>

//         <FloatingLabel controlId="FloatingInput1" label="Enter Tip Amount" className="mb-3">
//           <Form.Control type="number" placeholder="Enter Tip Amount" name="tip_amount" value={closeOrderInput.tip_amount || ''} onChange={handleChange} required />
//         </FloatingLabel>

//         <Button type="submit">Close</Button>
//       </Form>
//     </div>
//   );
// }

// export default CloseOrderForm;
