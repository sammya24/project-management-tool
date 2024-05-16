// components/LandingPage.js
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to the Project Management Tool</h1>
      <p>Choose an option below:</p>
      <Link href="/login">
        Login
      </Link>
      <br />
      <Link href="/signup">
        Signup
      </Link>
    </div>
  );
};

export default LandingPage;
