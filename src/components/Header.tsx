import { Bell, Home, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/vtag-logo.png'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [phoneSettingsOpen, setPhoneSettingsOpen] = useState(false)
  const [pushEnabled, setPushEnabled] = useState(false)
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

  function handlePushNotifications() {
    if (!pushEnabled) {
      setPhoneSettingsOpen(true)
      setPushEnabled(true)
    } else {
      setPushEnabled(false)
    }
  }

  return (
    <>
      <header className="flex items-center justify-between px-5 py-2">
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
          className="h-20 w-auto max-w-[185px] object-contain md:h-24"
        />

        <button
          onClick={() => setNotificationOpen(true)}
          className="theme-card rounded-full p-3 transition"
        >
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
                  lightMode ? 'bg-[#050606] text-white' : 'bg-white text-black'
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

      {notificationOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
          <div className="theme-card w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="theme-subtle text-xs tracking-widest">
                  NOTIFICATIONS
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Notification Centre
                </h2>
              </div>

              <button
                onClick={() => setNotificationOpen(false)}
                className="theme-card-secondary rounded-full p-2"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePushNotifications}
                className="theme-card-secondary w-full rounded-2xl p-4 text-left font-semibold"
              >
                {pushEnabled
                  ? 'Disable Push Notifications'
                  : 'Enable Push Notifications'}
              </button>

              <button className="w-full rounded-2xl bg-red-900/30 p-4 text-left font-semibold text-red-400">
                Mark Vehicle as Stolen
              </button>
            </div>
          </div>
        </div>
      )}

      {phoneSettingsOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
          <div className="theme-card w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl">
            <h2 className="text-xl font-bold">
              Push Notification Settings
            </h2>

            <p className="theme-muted mt-3 text-sm">
              This would normally take you to phone settings.
            </p>

            <button
              onClick={() => setPhoneSettingsOpen(false)}
              className="mt-6 w-full rounded-2xl bg-white py-3 font-bold text-black"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Header