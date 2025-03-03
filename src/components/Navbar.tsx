
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "T&C", path: "/terms" },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[#260446]">
            Virtual<span className="text-[#7e61e9]">Lab</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`text-sm font-medium transition-colors hover:text-[#7e61e9] ${
                  location.pathname === route.path ? 'text-[#7e61e9]' : 'text-gray-600'
                }`}
              >
                {route.name}
              </Link>
            ))}
            <Button className="glow-button purple ml-4">
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 py-2"
          >
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`block py-2 px-4 text-sm font-medium ${
                  location.pathname === route.path ? 'text-[#7e61e9]' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.name}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-gray-200">
              <Button className="glow-button purple w-full">
                Sign Up
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
