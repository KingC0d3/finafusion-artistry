import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Instagram, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Works', path: '/works' },
  { name: 'Book Appointment', path: '/book' },
  { name: 'Training', path: '/training' },
  { name: 'About', path: '/about' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
      <div className="max-w-5xl mx-auto">
        <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
          {/* Mobile: Menu + Logo */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleMenu}
              className="text-text-light p-2 hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <Link to="/" className="text-xl font-semibold text-text-light tracking-wider">
              Finafusion
            </Link>
          </div>

          {/* Desktop: Logo */}
          <Link to="/" className="hidden md:block text-xl font-semibold text-text-light tracking-wider">
            Finafusion
          </Link>

          {/* Desktop: Nav Links */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 border border-border rounded-full px-2 py-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-[15px] rounded-full transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-gold text-white'
                      : 'text-text-light hover:text-gold'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="tel:08061791997"
              className="text-text-light hover:text-gold transition-colors p-2"
              aria-label="Call us"
            >
              <Phone size={20} />
            </a>
            <a
              href="https://instagram.com/finafusion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light hover:text-gold transition-colors p-2"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="md:hidden mt-4"
            >
              <div className="glass rounded-2xl border border-border p-4">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 text-[15px] rounded-lg transition-all duration-300 ${
                          location.pathname === link.path
                            ? 'bg-gold text-white'
                            : 'text-text-light hover:bg-muted hover:text-gold'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
