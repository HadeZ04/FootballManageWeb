import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const navigate = useNavigate()
  const { login } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsLoading(true)
      
      // Simulate API call delay
      setTimeout(() => {
        const result = login(formData.email, formData.password)
        
        if (result.success) {
          navigate('/')
        } else {
          setErrors({ general: result.error })
        }
        
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear errors when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  return (
    <div className="section-light">
      <section className="min-h-screen flex items-center justify-center py-20 pt-40">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-8">
                <div className="spinning-ball mr-4">
                  <div className="w-16 h-16 bg-premier-purple rounded-full shadow-xl"></div>
                </div>
                <h1 className="text-4xl font-bold text-premier-purple font-display">LOGIN</h1>
              </div>
              <p className="text-xl text-premier-gray">
                Access your Premier League Tournament Manager account. Use demo credentials: pep@mancity.com / password123
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="premier-card p-10">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-premier-purple to-premier-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <LogIn className="text-white" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-premier-purple font-display">Welcome Back</h2>
                  <p className="text-premier-gray">Enter your credentials to continue</p>
                </div>

                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <p className="text-red-600 text-sm font-medium">{errors.general}</p>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-premier-purple font-semibold mb-3 text-lg">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-premier-gray" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="premier-input w-full pl-12 text-lg"
                        placeholder="manager@premierleague.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-2 font-medium">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-premier-purple font-semibold mb-3 text-lg">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-premier-gray" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="premier-input w-full pl-12 pr-12 text-lg"
                        placeholder="Your secure password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-premier-gray hover:text-premier-purple transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-2 font-medium">{errors.password}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-premier-purple bg-gray-100 border-gray-300 rounded focus:ring-premier-purple focus:ring-2"
                      />
                      <span className="ml-2 text-premier-gray">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-premier-purple hover:text-premier-cyan transition-colors font-medium">
                      Forgot password?
                    </Link>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="premier-button w-full flex items-center justify-center space-x-3 text-xl py-5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <LogIn size={24} />
                        <span>Sign In</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-premier-gray mb-4">Don't have an account?</p>
                  <Link to="/register">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center space-x-3 px-8 py-4 border-2 border-premier-purple text-premier-purple rounded-xl font-bold text-lg hover:bg-premier-purple hover:text-white transition-all duration-300"
                    >
                      <UserPlus size={20} />
                      <span>Create Account</span>
                    </motion.button>
                  </Link>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
