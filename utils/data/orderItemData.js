import { clientCredentials } from '../client';

const getOrderItems = (orderId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_items?orderId=${orderId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was no good');
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
});

const deleteOrderItem = (order, payload) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/orders/${order}/delete_order_item`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createOrderItem = (orderItem) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderItem),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateOrderItem = (orderItem) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/oreder_items`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderItem),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getOrderItems, deleteOrderItem, createOrderItem, updateOrderItem,
};
