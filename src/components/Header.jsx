import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLenis } from '../lib/lenis.jsx'
import { gsap } from '../lib/gsap'
import ThemeToggle from './ThemeToggle'
import SignatureLogo from './SignatureLogo'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const lenis = useLenis()
  const indicatorRef = useRef(null)

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('')
      return
    }

    const handleScroll = () => {
      const sections = ['home', 'about', 'contact']
      const scrollPosition = window.scrollY + 150
      
      for (const section of sections) {
        const element = document.querySelector(`#${section}`)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const scrollTo = (target) => {
    // If we're on projects page and trying to navigate to home sections
    if (location.pathname !== '/') {
      // Navigate to home first, then scroll
      window.location.href = `/${target}`
      return
    }
    
    const element = document.querySelector(target)
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80, duration: 1.2 })
    } else if (element) {
      // Fallback if lenis is not available
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsOpen(false)
  }

  const handleProjectsClick = () => {
    setIsOpen(false)
    // Let React Router handle the navigation
  }

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gray-950/80 backdrop-blur-2xl shadow-2xl shadow-primary-500/10 border-b border-white/5' 
          : 'bg-transparent backdrop-blur-sm border-b border-white/0'
      }`}
    >
      {/* Premium gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent opacity-50" />
      
      <nav className="container mx-auto px-6 py-5" aria-label="Main navigation">
        <div className="flex justify-between items-center">
          {/* Logo with signature animation */}
          <Link 
            to="/" 
            className="relative flex items-center group z-10"
            aria-label="Portfolio home"
          >
            <SignatureLogo className="h-12 w-auto transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(102,126,234,0.6)]" />
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2" role="list">
            {/* Navigation Links with Premium Styling */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
              <NavLink 
                onClick={() => scrollTo('#home')} 
                active={activeSection === 'home'}
                label="Home"
              />
              <NavLink 
                onClick={() => scrollTo('#about')} 
                active={activeSection === 'about'}
                label="About"
              />
              <NavLink 
                to="/projects"
                onClick={handleProjectsClick}
                active={location.pathname === '/projects'}
                label="Projects"
              />
              <NavLink 
                onClick={() => scrollTo('#contact')} 
                active={activeSection === 'contact'}
                label="Contact"
              />
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-2" />
            
            {/* Theme Toggle with Enhanced Container */}
            <div className="flex items-center px-2 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
              <ThemeToggle />
            </div>
          </div>

          {/* Premium Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-primary-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg group"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <div className={`w-6 h-6 flex flex-col justify-center items-center ${isOpen ? 'gap-0' : 'gap-1.5'}`} aria-hidden="true">
              <span className={`w-5 h-0.5 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : ''}`} />
              <span className={`w-5 h-0.5 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-0.5' : ''}`} />
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl -z-10" />
            
            <span className="sr-only">{isOpen ? 'Close navigation menu' : 'Open navigation menu'}</span>
          </button>
        </div>

        {/* Premium Mobile Menu */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden mt-6 pb-6"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* Glass container for mobile menu */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <ul className="flex flex-col space-y-3" role="list">
                <li>
                  <button 
                    onClick={() => scrollTo('#home')} 
                    className={`text-left w-full font-heading font-semibold px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeSection === 'home'
                        ? 'bg-gradient-to-r from-primary-500/20 to-purple-500/20 text-primary-300 border border-primary-500/30'
                        : 'hover:bg-white/5 text-gray-300 hover:text-white border border-transparent'
                    }`}
                    aria-label="Navigate to home section"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">🏠</span>
                      Home
                    </span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollTo('#about')} 
                    className={`text-left w-full font-heading font-semibold px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeSection === 'about'
                        ? 'bg-gradient-to-r from-primary-500/20 to-purple-500/20 text-primary-300 border border-primary-500/30'
                        : 'hover:bg-white/5 text-gray-300 hover:text-white border border-transparent'
                    }`}
                    aria-label="Navigate to about section"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">👨‍💻</span>
                      About
                    </span>
                  </button>
                </li>
                <li>
                  <Link 
                    to="/projects" 
                    onClick={handleProjectsClick}
                    className={`block font-heading font-semibold px-4 py-3 rounded-xl transition-all duration-300 ${
                      location.pathname === '/projects'
                        ? 'bg-gradient-to-r from-primary-500/20 to-purple-500/20 text-primary-300 border border-primary-500/30'
                        : 'hover:bg-white/5 text-gray-300 hover:text-white border border-transparent'
                    }`}
                    aria-label="Navigate to projects page"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">💼</span>
                      Projects
                    </span>
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => scrollTo('#contact')} 
                    className={`text-left w-full font-heading font-semibold px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeSection === 'contact'
                        ? 'bg-gradient-to-r from-primary-500/20 to-purple-500/20 text-primary-300 border border-primary-500/30'
                        : 'hover:bg-white/5 text-gray-300 hover:text-white border border-transparent'
                    }`}
                    aria-label="Navigate to contact section"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">📧</span>
                      Contact
                    </span>
                  </button>
                </li>
              </ul>

              {/* Theme toggle in mobile menu */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-semibold text-gray-300">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

// Premium NavLink Component
function NavLink({ onClick, to, active, label }) {
  const content = (
    <span className="relative px-4 py-2 block">
      <span className={`font-heading font-semibold text-sm transition-all duration-300 ${
        active 
          ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400' 
          : 'text-gray-300 group-hover:text-white'
      }`}>
        {label}
      </span>
      
      {/* Active indicator */}
      {active && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full shadow-[0_0_8px_rgba(102,126,234,0.8)]" />
      )}
      
      {/* Hover effect */}
      <span className={`absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-purple-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
    </span>
  )

  if (to) {
    return (
      <Link 
        to={to} 
        className="relative group"
        onClick={onClick}
      >
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className="relative group">
      {content}
    </button>
  )
}