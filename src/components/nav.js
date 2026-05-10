import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faPills, 
  faInfoCircle, 
  faPhone, 
  faShoppingCart,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/', icon: faHome },
    { name: 'Produits', path: '/produit', icon: faPills },
    { name: 'A propos', path: '/apropos', icon: faInfoCircle },
    { name: 'Contact', path: '/contact', icon: faPhone },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-blue-950 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/images/logopfe.png" 
                alt="Logo Pharmacie" 
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-white rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">
              Pharmacie
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group ${
                  isActive(link.path)
                    ? 'text-white bg-blue-800/50'
                    : 'text-blue-100 hover:text-white hover:bg-blue-800/30'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={link.icon} className="text-lg" />
                  <span>{link.name}</span>
                </span>
                {isActive(link.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-400 rounded-full"></div>
                )}
              </Link>
            ))}
            
            {/* Cart Button */}
            <Link
              to="/panier"
              className="ml-4 relative group"
            >
              <div className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300">
                <FontAwesomeIcon icon={faShoppingCart} className="text-white text-xl" />
                <span className="text-white font-medium">Panier</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon 
              icon={isMenuOpen ? faTimes : faBars} 
              className="text-2xl transition-transform duration-300"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-blue-800">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-white bg-blue-800/50'
                    : 'text-blue-100 hover:text-white hover:bg-blue-800/30'
                }`}
              >
                <span className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={link.icon} className="text-xl" />
                  <span>{link.name}</span>
                </span>
              </Link>
            ))}
            
            {/* Mobile Cart */}
            <Link
              to="/panier"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-lg text-blue-100 hover:text-white hover:bg-blue-800/30 transition-all duration-300"
            >
              <span className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                <span>Panier</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}