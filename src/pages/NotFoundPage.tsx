import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

/**
 * NotFoundPage Component
 * Displayed when a user navigates to a non-existent route
 */
const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        Oops! The page you're looking for seems to have been teleported to another dimension.
      </p>
      <Link to="/">
        <Button variant="primary">
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;