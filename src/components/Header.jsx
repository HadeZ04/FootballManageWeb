import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Menu, X, Trophy, Calendar, Users, BarChart3, 
  UserPlus, FileText, Settings, Home, Phone, Mail
} from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Teams', path: '/register-team' },
    { name: 'Fixtures', path: '/match-schedule' },
    { name: 'Results', path: '/match-results' },
    { name: 'Players', path: '/player-lookup' },
    { name: 'Reports', path: '/reports' },
    { name: 'Admin', path: '/admin' }
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-premier-purple text-white py-3 text-sm">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span className="font-medium">+44 (0) 207 864 9000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span className="font-medium">info@premierleague.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="font-medium">Follow Premier League:</span>
              <div className="flex space-x-3">
                <a href="#" className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform">f</a>
                <a href="#" className="w-7 h-7 bg-blue-400 rounded-full flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform">t</a>
                <a href="#" className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform">y</a>
                <a href="#" className="w-7 h-7 bg-pink-600 rounded-full flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform">i</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'striker-nav shadow-lg' : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-striker-green rounded-lg flex items-center justify-center">
                  <Trophy className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-striker-dark font-display">STRIKER</h1>
                  <p className="text-xs text-striker-green font-medium uppercase">Football Club</p>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navItems.map((item, index) => (
                <Link key={item.name} to={item.path}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                      location.pathname === item.path 
                        ? 'bg-striker-green text-white' 
                        : 'text-striker-dark hover:text-striker-green'
                    }`}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/register-team">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="striker-button"
                >
                  Join Tournament
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-striker-dark"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-6 space-y-2 pb-4"
            >
              {navItems.map((item) => (
                <Link key={item.name} to={item.path}>
                  <motion.div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path 
                        ? 'bg-striker-green text-white' 
                        : 'text-striker-dark hover:text-striker-green hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </motion.nav>
          )}
        </div>
      </motion.header>
    </>
  )
}

export default Header
