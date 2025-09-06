import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { 
  Trophy, Users, Calendar, BarChart3, 
  UserPlus, FileText, Target, Play, Star, TrendingUp
} from 'lucide-react'
import { useTournament } from '../context/TournamentContext'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const { teams, matches, results, players } = useTournament()

  const stats = [
    { label: 'Registered Teams', value: teams.length, icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Scheduled Matches', value: matches.length, icon: Calendar, color: 'from-green-500 to-green-600' },
    { label: 'Completed Matches', value: results.length, icon: Trophy, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Total Players', value: players.length, icon: Target, color: 'from-purple-500 to-purple-600' }
  ]

  const quickActions = [
    {
      title: 'Register New Team',
      description: 'Add a new football team to the tournament',
      icon: UserPlus,
      path: '/register-team',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Schedule Match',
      description: 'Create new match schedules',
      icon: Calendar,
      path: '/match-schedule',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Record Results',
      description: 'Enter match results and player statistics',
      icon: FileText,
      path: '/match-results',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'View Reports',
      description: 'Generate tournament reports and rankings',
      icon: BarChart3,
      path: '/reports',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <div className="hero-gradient">
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="absolute inset-0 field-lines opacity-5"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-football-green/20 to-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-black mb-8 font-display">
              <span className="gradient-text-beautiful">TOURNAMENT</span>
              <br />
              <span className="text-white drop-shadow-2xl">MANAGEMENT</span>
              <motion.div 
                className="floating-ball inline-block ml-6"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <div className="football-icon w-20 h-20 glow-effect"></div>
              </motion.div>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Complete football tournament management system with 
              <span className="text-football-green font-semibold"> team registration</span>, 
              <span className="text-white font-semibold"> match scheduling</span>, 
              and <span className="text-football-green font-semibold">comprehensive reporting</span>.
            </p>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="professional-card rounded-xl p-6 professional-hover"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Quick Actions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link key={action.title} to={action.path}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-premier-purple mb-6 font-display">2023/24 Season Statistics</h2>
            <p className="text-xl text-premier-gray max-w-4xl mx-auto leading-relaxed">
              Live data from the current Premier League tournament featuring top clubs like Manchester City, Arsenal, Liverpool, and more
            </p>
          </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="professional-card rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Tournament Overview</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-football-green mb-4">Latest Teams</h3>
                {teams.slice(-3).map((team, index) => (
                  <div key={team.id} className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-football-green rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{team.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{team.name}</p>
                      <p className="text-gray-400 text-sm">{team.stadium}</p>
                    </div>
                  </div>
                ))}
                {teams.length === 0 && (
                  <p className="text-gray-400 text-sm">No teams registered yet</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-football-green mb-4">Upcoming Matches</h3>
                {matches.slice(0, 3).map((match, index) => (
                  <div key={match.id} className="mb-3">
                    <p className="text-white font-medium">{match.team1} vs {match.team2}</p>
                    <p className="text-gray-400 text-sm">{match.date} at {match.time}</p>
                  </div>
                ))}
                {matches.length === 0 && (
                  <p className="text-gray-400 text-sm">No matches scheduled yet</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-football-green mb-4">Recent Results</h3>
                {results.slice(-3).map((result, index) => (
                  <div key={result.id} className="mb-3">
                    <p className="text-white font-medium">
                      {result.team1} {result.score1} - {result.score2} {result.team2}
                    </p>
                    <p className="text-gray-400 text-sm">{result.date}</p>
                  </div>
                ))}
                {results.length === 0 && (
                  <p className="text-gray-400 text-sm">No results recorded yet</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
