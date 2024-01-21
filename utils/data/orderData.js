import { clientCredentials } from '../client';

const getOrders = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders?uid=${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleOrderItems = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}/items`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createOrder = (order) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrder = (payload) => new Promise((resolve, reject) => {
  if (!payload.id) {
    reject(new Error('Order ID is undefined'));
    return;
  }

  fetch(`${clientCredentials.databaseURL}/orders/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update order: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

const closeOutOrder = (order) => fetch(`${clientCredentials.databaseURL}/orders/${order.id}/close`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(order),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to close order. Status: ${response.status}`);
    }
    return response.json(); // Parse the JSON response
  });

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getAllClosedOrders = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders?status=Closed`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getItemsByOrderId = async (orderId) => {
  try {
    const response = await fetch(`${clientCredentials.databaseURL}/order_items`);
    const orderItems = await response.json();

    const itemsForOrder = orderItems.filter((item) => item.order === orderId);

    return itemsForOrder;
  } catch (error) {
    console.error('Error fetching order items:', error);
    throw error;
  }
};

// eslint-disable-next-line import/prefer-default-export
export {
  getOrders, getSingleOrder, createOrder, updateOrder, deleteOrder, getSingleOrderItems, closeOutOrder, getAllClosedOrders, getItemsByOrderId,
};
