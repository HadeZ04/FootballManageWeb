import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import TeamRegistration from './pages/TeamRegistration'
import MatchSchedule from './pages/MatchSchedule'
import MatchResults from './pages/MatchResults'
import PlayerLookup from './pages/PlayerLookup'
import TournamentReports from './pages/TournamentReports'
import AdminSettings from './pages/AdminSettings'
import LoadingScreen from './components/LoadingScreen'
import { TournamentProvider } from './context/TournamentContext'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <TournamentProvider>
      <Router>
        <AnimatePresence>
          {isLoading && <LoadingScreen />}
        </AnimatePresence>
        
        <div className="min-h-screen professional-bg relative">
          <div className="grass-pattern min-h-screen">
            <Header />
            
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register-team" element={<TeamRegistration />} />
              <Route path="/match-schedule" element={<MatchSchedule />} />
              <Route path="/match-results" element={<MatchResults />} />
              <Route path="/player-lookup" element={<PlayerLookup />} />
              <Route path="/reports" element={<TournamentReports />} />
              <Route path="/admin" element={<AdminSettings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TournamentProvider>
  )
}

export default App
