import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/rick-and-morty-logo.svg'

/**
 * Header component with navigation
 */
const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Rick and Morty Logo"
              className="h-16 w-auto"
              onError={(e) => {
                // Fallback in case the logo image doesn't load
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.style.display = 'none';
              }}
            />
          </Link>
          <nav>
            <section className="mobile-menu flex lg:hidden">
              <div
                className="hamburguer-icon space-y-2"
                onClick={() => setIsNavOpen((prevState) => !prevState)}
              >
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              </div>
              <div className={isNavOpen ? 'flex absolute w-full h-screen top-0 left-0 z-10 flex-col justify-evenly items-center bg-primary' : 'hidden'}>
                <div
                  className="absolute top-0 right-0 px-8 py-8 bg-primary"
                  onClick={() => setIsNavOpen(false)}
                >
                  <svg
                    className="h-8 w-8 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <ul className="flex flex-col items-center justify-between min-h-[250px]">
                  <li className="border-b border-gray-900 my-8 text-neutral-700">
                    <Link to="/" className="hover:underline">
                      Characters
                    </Link>
                  </li>
                  <li className="border-b border-gray-900 my-8 text-neutral-700">
                    <Link to="/locations" className="hover:underline">
                      Locations
                    </Link>
                  </li>
                  <li className="border-b border-gray-900 my-8 text-neutral-700">
                    <Link to="/episodes" className="hover:underline">
                      Episodes
                    </Link>
                  </li>
                </ul>
              </div>
            </section>
            <ul className="desktop-menu hidden space-x-8 lg:flex">
              <li>
                <Link to="/" className="hover:underline">
                  Characters
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:underline">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/episodes" className="hover:underline">
                  Episodes
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;