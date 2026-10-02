import { ArrowLeft, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import logo from '../assets/vtag-logo.svg'
import Profile from '../assets/icons/dm_profile.svg'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightMode, setLightMode] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const isHomePage = location.pathname === '/home'

  useEffect(() => {
    const savedTheme = localStorage.getItem('vtag-theme')

    if (savedTheme === 'light') {
      document.documentElement.classList.add('light')
      setLightMode(true)
    }
  }, [])

  function toggleTheme() {
    const nextLightMode = !lightMode

    setLightMode(nextLightMode)

    if (nextLightMode) {
      document.documentElement.classList.add('light')
      localStorage.setItem('vtag-theme', 'light')
    } else {
      document.documentElement.classList.remove('light')
      localStorage.setItem('vtag-theme', 'dark')
    }
  }

  function handleBack() {
    navigate(-1)
  }

  function handleProfile() {
    navigate('/profile')
  }

  return (
    <>
      <header className="flex items-center justify-between px-5 py-2">
        {/* LEFT NAVIGATION */}
        {isHomePage ? (
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="theme-card rounded-full p-3 transition active:scale-[0.95]"
          >
            <Menu size={22} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="theme-card rounded-full p-3 transition active:scale-[0.95]"
          >
            <ArrowLeft size={22} />
          </button>
        )}

        {/* V-TAG LOGO */}
        <img
          src={logo}
          alt="V-TAG"
          className="h-20 w-auto max-w-[185px] object-contain md:h-24"
        />

        {/* PROFILE */}
        <button
          type="button"
          onClick={handleProfile}
          aria-label="Open profile"
          className="theme-card rounded-full p-3 transition active:scale-[0.95]"
        >
          <img
            src={Profile}
            alt=""
            aria-hidden="true"
            className="h-6 w-6 scale-300 object-contain"
          />
        </button>
      </header>

      {/* HOME MENU */}
      {menuOpen && isHomePage && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm">
          <div className="theme-panel mr-auto h-full w-[82%] max-w-sm p-6 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <img
                src={logo}
                alt="V-TAG"
                className="h-24 w-auto max-w-[200px] object-contain"
              />

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="theme-card rounded-full p-3 transition active:scale-[0.95]"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="space-y-4">
              <button
                type="button"
                className="theme-card w-full rounded-2xl p-5 text-left font-semibold transition active:scale-[0.98]"
              >
                About
              </button>

              <button
                type="button"
                className="theme-card w-full rounded-2xl p-5 text-left font-semibold transition active:scale-[0.98]"
              >
                Community
              </button>

              <button
                type="button"
                className="theme-card w-full rounded-2xl p-5 text-left font-semibold transition active:scale-[0.98]"
              >
                Subscription
              </button>
            </nav>

            {/* APPEARANCE */}
            <div className="theme-card mt-8 rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">Appearance</p>

                  <p className="theme-muted mt-1 text-sm">
                    Switch between light and dark mode.
                  </p>
                </div>

                {lightMode ? <Sun size={22} /> : <Moon size={22} />}
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className={`w-full rounded-xl py-3 font-bold transition active:scale-[0.98] ${
                  lightMode ? 'bg-[#050606] text-white' : 'bg-white text-black'
                }`}
              >
                {lightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </button>
            </div>

            {/* V-TAG INFO */}
            <div className="theme-card mt-8 rounded-2xl p-5">
              <p className="theme-subtle text-xs tracking-widest">V-TAG</p>

              <p className="theme-muted mt-2 text-sm">
                Vehicle identity, history and document management.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
