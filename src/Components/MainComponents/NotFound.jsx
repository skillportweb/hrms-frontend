import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700 p-6">
      <h1 className="text-6xl font-bold text-[#2c3e50]">404</h1>
      <p className="text-2xl mt-4 font-semibold">Oops! Page not found.</p>
      <p className="mt-2 text-gray-500 text-center max-w-md">
        The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-[#2c3e50] text-white px-6 py-2 rounded hover:bg-[#3f566d] transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
