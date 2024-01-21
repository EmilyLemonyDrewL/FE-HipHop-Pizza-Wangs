import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleOrder } from '../../utils/data/orderData';
import ItemCard from '../../components/ItemCard';

function SingleOrder() {
  const [singleOrder, setSingleOrder] = useState({});
  const router = useRouter();
  const orderId = router.query.id; // Change variable name to orderId
  useEffect(() => {
    getSingleOrder(orderId).then((data) => setSingleOrder(data));
  }, [orderId]);

  return (
    <article className="single-order">
      <div>
        <h1>Order Details</h1>
        <p>Name: {singleOrder.customer_name}</p>
        <p>Phone: {singleOrder.customer_phone}</p>
        <p>Email: {singleOrder.customer_email}</p>
        <p>Order type: {singleOrder.order_type}</p>
      </div>
      <div>
        <div className="d-flex flex-wrap">
          {singleOrder.items && singleOrder.items.length > 0 ? (
            singleOrder.items.map((item) => (
              <ItemCard key={item.id} itemObj={item} order={singleOrder} />
            ))
          ) : (
            <p>No items found</p>
          )}
        </div>
        <Link href={`/items/new?orderId=${orderId}`} passHref>
          <Button variant="btn btn-dark">Add Item</Button>
        </Link>
      </div>
    </article>
  );
}

export default SingleOrder;
