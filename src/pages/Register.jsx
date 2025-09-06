import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { Mail, Lock, Eye, EyeOff, User, Phone, MapPin, UserPlus, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import confetti from 'canvas-confetti'

const Register = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const navigate = useNavigate()
  const { register } = useAuth()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    password: '',
    confirmPassword: '',
    role: 'Manager',
    agreeToTerms: false
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization/Club name is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
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
        const result = register(formData)
        
        if (result.success) {
          // Success animation
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#37003c', '#00ff85']
          })

          alert('Account created successfully! Please login to continue.')
          navigate('/login')
        } else {
          setErrors({ general: result.error })
        }
        
        setIsLoading(false)
      }, 1500)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  return (
    <div className="section-light">
      <section className="min-h-screen py-20 pt-40">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
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
                <h1 className="text-4xl font-bold text-premier-purple font-display">CREATE ACCOUNT</h1>
              </div>
              <p className="text-xl text-premier-gray">
                Join the Premier League Tournament Manager community and manage your club like Pep Guardiola, Mikel Arteta, and Jurgen Klopp
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="premier-card p-12">
                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-premier-purple to-premier-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <UserPlus className="text-white" size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-premier-purple font-display">Join Our Community</h2>
                  <p className="text-premier-gray">Create your tournament manager account</p>
                </div>

                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
                    <p className="text-red-600 text-sm font-medium">{errors.general}</p>
                  </div>
                )}

                <div className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-bold text-premier-purple mb-6 font-display">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-premier-purple font-semibold mb-3">First Name *</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-premier-gray" size={20} />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="premier-input w-full pl-12"
                            placeholder="e.g., Pep"
                          />
                        </div>
                        {errors.firstName && <p className="text-red-500 text-sm mt-2 font-medium">{errors.firstName}</p>}
                      </div>

                      <div>
                        <label className="block text-premier-purple font-semibold mb-3">Last Name *</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-premier-gray" size={20} />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="premier-input w-full pl-12"
                            placeholder="e.g., Guardiola"
                          />
                        </div>
                        {errors.lastName && <p className="text-red-500 text-sm mt-2 font-medium">{errors.lastName}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-xl font-bold text-premier-purple mb-6 font-display">Contact Information</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-premier-purple font-semibold mb-3">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-premier-gray" size={20} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="premier-input w-full pl-12"
                            placeholder="manager@premierleague.com"
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-2 font-medium">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-premier-purple font-semibold mb-3">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-premier-gray" size={20} />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="premier-input w-full pl-12"
                            placeholder="+44 207 864 9000"
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm mt-2 font-medium">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-premier-purple font-semibold mb-3">Organization/Club *</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-premier-gray" size={20} />
                          <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            className="premier-input w-full pl-12"
                            placeholder="e.g., Manchester City FC"
                          />
                        </div>
                        {errors.organization && <p className="text-red-500 text-sm mt-2 font-medium">{errors.organization}</p>}
                      </div>

                      <div>
                        <label className="block text-premier-purple font-semibold mb-3">Role</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="premier-select w-full"
                        >
                          <option value="Manager">Tournament Manager</option>
                          <option value="Coach">Team Coach</option>
                          <option value="Administrator">Administrator</option>
                          <option value="Referee">Referee</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Security */}
                  <div>
                    <h3 className="text-xl font-bold text-premier-purple mb-6 font-display">Security</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-premier-purple font-semibold mb-3">Password *</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-premier-gray" size={20} />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="premier-input w-full pl-12 pr-12"
                            placeholder="Create password"
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

                      <div>
                        <label className="block text-premier-purple font-semibold mb-3">Confirm Password *</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-premier-gray" size={20} />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="premier-input w-full pl-12 pr-12"
                            placeholder="Confirm password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-premier-gray hover:text-premier-purple transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-2 font-medium">{errors.confirmPassword}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="w-5 h-5 text-premier-purple bg-gray-100 border-gray-300 rounded focus:ring-premier-purple focus:ring-2 mt-1"
                      />
                      <span className="text-premier-gray leading-relaxed">
                        I agree to the{' '}
                        <Link to="/terms" className="text-premier-purple hover:text-premier-cyan transition-colors font-medium underline">
                          Terms and Conditions
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-premier-purple hover:text-premier-cyan transition-colors font-medium underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    {errors.agreeToTerms && <p className="text-red-500 text-sm mt-2 font-medium">{errors.agreeToTerms}</p>}
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
                        <UserPlus size={24} />
                        <span>Create Account</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                  <p className="text-premier-gray mb-4">Already have an account?</p>
                  <Link to="/login">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center space-x-3 px-8 py-4 border-2 border-premier-purple text-premier-purple rounded-xl font-bold text-lg hover:bg-premier-purple hover:text-white transition-all duration-300"
                    >
                      <LogIn size={20} />
                      <span>Sign In</span>
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

export default Register
