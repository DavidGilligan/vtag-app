import { Bell, Home, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/vtag-logo.png'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightMode, setLightMode] = useState(false)

  const location = useLocation()
  const isHomePage = location.pathname === '/'

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

  return (
    <>
      <header className="flex items-center justify-between px-5 py-4">
        {isHomePage ? (
          <button
            onClick={() => setMenuOpen(true)}
            className="theme-card rounded-full p-3 transition"
          >
            <Menu size={22} />
          </button>
        ) : (
          <Link to="/" className="theme-card rounded-full p-3 transition">
            <Home size={22} />
          </Link>
        )}

        <img
          src={logo}
          alt="V-TAG"
          className="h-28 w-auto max-w-[210px] object-contain md:h-32"
        />

        <button className="theme-card rounded-full p-3 transition">
          <Bell size={22} />
        </button>
      </header>

      {menuOpen && isHomePage && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm">
          <div className="theme-panel ml-auto h-full w-[82%] max-w-sm p-6 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <img
                src={logo}
                alt="V-TAG"
                className="h-24 w-auto max-w-[200px] object-contain"
              />

              <button
                onClick={() => setMenuOpen(false)}
                className="theme-card rounded-full p-3 transition"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="space-y-4">
              <button className="theme-card w-full rounded-2xl p-5 text-left font-semibold transition">
                About
              </button>

              <button className="theme-card w-full rounded-2xl p-5 text-left font-semibold transition">
                Community
              </button>

              <button className="theme-card w-full rounded-2xl p-5 text-left font-semibold transition">
                Subscription
              </button>
            </nav>

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
                onClick={toggleTheme}
                className={`w-full rounded-xl py-3 font-bold transition ${
                  lightMode
                    ? 'bg-[#050606] text-white'
                    : 'bg-white text-black'
                }`}
              >
                {lightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </button>
            </div>

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