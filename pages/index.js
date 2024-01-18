import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { signOut } from '../utils/auth';
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
      <p1>Logo image will go here</p1>
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
      <Link href="/orders" passHref>
        <Button>View Orders</Button>
      </Link>
      <Link href="/orders/new" passHref>
        <Button>Create Order</Button>
      </Link>
      <Link href="/revenue" passHref>
        <Button>View Revenue</Button>
      </Link>
    </div>
  );
}

export default Home;
