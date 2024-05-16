// pages/landingpage.js

import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Project Management Tool</h1>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
