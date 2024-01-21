import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createOrder, updateOrder } from '../utils/data/orderData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  customer_name: '',
  customer_phone: 0,
  customer_email: '',
  order_type: '',
  cashier: 0,
  status: '',
  date_of_order_closure: '',
  tip_amount: 0,
  payment_type: '',
};

const OrderForm = ({ obj }) => {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  useEffect(() => {
    if (obj) {
      setFormInput((prevState) => ({
        ...prevState,
        id: obj.id,
        customer_name: obj.customer_name,
        customer_email: obj.customer_email,
        customer_phone: obj.customer_phone,
        order_type: obj.order_type,
        cashierId: user.uid,
      }));
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const orderUpdate = {
        id: obj.id,
        customer_name: formInput.customer_name,
        customer_email: formInput.customer_email,
        customer_phone: formInput.customer_phone,
        order_type: formInput.order_type,
        status: 'Open',
        payment_type: '',
        date_of_order_closure: '2024-01-01',
        tip_amount: 0,
        cashierId: user.uid,
      };
      updateOrder(orderUpdate)
        .then(() => router.push('/orders'))
        .catch((error) => {
          console.error('Error updating order:', error);
        });
    } else {
      const order = {
        customer_name: formInput.customer_name,
        customer_email: formInput.customer_email,
        customer_phone: formInput.customer_phone,
        order_type: formInput.order_type,
        cashierId: user.uid,
        status: 'Open',
        payment_type: '',
        // default date '2024-01-01'
        date_of_order_closure: '2024-01-01',
        tip_amount: 0,
      };
      createOrder(order).then(() => router.push('/orders'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Orders</h2>

      <FloatingLabel controlId="floatingInput1" label="Customer Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the customer name"
          name="customer_name"
          value={formInput.customer_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Customer Phone" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter customer's phone number"
          name="customer_phone"
          value={formInput.customer_phone}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Customer Email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter customer's email address"
          name="customer_email"
          value={formInput.customer_email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Order Type" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Walk-In or Call-In?"
          name="order_type"
          value={formInput.order_type}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button variant="btn btn-dark" type="Submit">{obj.id ? 'Update' : 'Create'} Order</Button>
    </Form>
  );
};

OrderForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    customer_name: PropTypes.string,
    customer_email: PropTypes.string,
    customer_phone: PropTypes.number,
    order_type: PropTypes.string,
    cashier: PropTypes.number,
  }),
};

OrderForm.defaultProps = {
  obj: initialState,
};

export default OrderForm;
