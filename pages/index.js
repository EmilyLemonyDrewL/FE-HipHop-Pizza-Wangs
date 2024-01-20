import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Image src="https://user-images.githubusercontent.com/29741570/205346767-a182560c-64a6-4cfa-80b3-0d64cf998242.png" roundedCircle />
      <h1>Hello {user.fbUser.displayName}! </h1>
      <Link href="/orders" passHref>
        <Button variant="btn btn-dark">View Orders</Button>
      </Link>
      <Link href="/orders/new" passHref>
        <Button variant="btn btn-dark">Create Order</Button>
      </Link>
      <Link href="/revenue" passHref>
        <Button variant="btn btn-dark">View Revenue</Button>
      </Link>
    </div>
  );
}

export default Home;
