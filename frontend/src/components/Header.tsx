import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "ASZMart" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { name: "Home", path: "/home", ariaLabel: "Go to Home Page" },
    { name: "About", path: "/about", ariaLabel: "Learn About Us" },
    { name: "Signup", path: "/signup", ariaLabel: "Signup for an Account" },
    { name: "Contact", path: "/contact", ariaLabel: "Contact Dashboard" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={`
        bg-[#232f3e] 
        ${isScrolled ? 'shadow-2xl py-3' : 'py-2'} 
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="container mx-auto flex justify-between items-center max-w-6xl px-4">
        {/* Brand */}
        <NavLink 
          to="/home" 
          className="text-2xl font-bold text-white tracking-wider hover:text-[#febd69] transition-colors"
        >
          {title}
        </NavLink>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <nav 
          className={`
            ${isMenuOpen ? 'block' : 'hidden'} 
            md:block 
            fixed md:relative 
            top-0 left-0 md:top-auto md:left-auto 
            w-full md:w-auto 
            h-screen md:h-auto 
            bg-[#232f3e]/95 md:bg-transparent 
            backdrop-blur-lg md:backdrop-blur-none
            overflow-hidden
          `}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 p-6 md:p-0 mt-16 md:mt-0">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) => `
                    text-white hover:text-[#febd69] 
                    block px-3 py-2 rounded-lg 
                    transition-all duration-300
                    ${isActive 
                      ? 'bg-white/20 font-semibold' 
                      : 'hover:bg-white/10'
                    }
                  `}
                  aria-label={item.ariaLabel}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;