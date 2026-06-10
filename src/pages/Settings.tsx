import { useEffect, useState } from 'react'
import {
  Bell,
  Car,
  CircleHelp,
  Contact,
  Lock,
  Moon,
  RefreshCcw,
  Settings as SettingsIcon,
  SmartphoneNfc,
  Sun,
  Trash2,
  User,
  Wifi,
} from 'lucide-react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'

function Settings() {
  const [lightMode, setLightMode] = useState(false)
  const [fontSize, setFontSize] = useState<'S' | 'M' | 'L'>('M')
  const [connectionPopup, setConnectionPopup] = useState(false)
  const [notificationsPopup, setNotificationsPopup] = useState(false)

  const [showMileage, setShowMileage] = useState(true)
  const [showModifications, setShowModifications] = useState(true)
  const [showReference, setShowReference] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('vtag-theme')

    if (savedTheme === 'light') {
      setLightMode(true)
    }
  }, [])

  function toggleTheme() {
    const nextMode = !lightMode
    setLightMode(nextMode)

    if (nextMode) {
      document.documentElement.classList.add('light')
      localStorage.setItem('vtag-theme', 'light')
    } else {
      document.documentElement.classList.remove('light')
      localStorage.setItem('vtag-theme', 'dark')
    }
  }

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">SETTINGS</p>
          <h1 className="mt-1 text-3xl font-bold">APP SETTINGS</h1>
          <p className="theme-muted mt-2 text-sm">
            Manage your V-TAG, vehicle, account and display preferences.
          </p>
        </section>

        <section className="mt-6 space-y-5 px-5">
          <SettingsSection title="V-Tag Settings" icon={<SmartphoneNfc size={20} />}>
            <button
              onClick={() => setConnectionPopup(true)}
              className="theme-card-secondary w-full rounded-2xl p-4 text-left font-semibold"
            >
              Check for connection
            </button>
          </SettingsSection>

          <SettingsSection title="App Settings" icon={<SettingsIcon size={20} />}>
            <div className="theme-card-secondary rounded-2xl p-4">
              <p className="font-semibold">Display Settings</p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Preferred Mode</p>
                  <p className="theme-muted text-xs">Light / Dark</p>
                </div>

                <button
                  onClick={toggleTheme}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                    lightMode ? 'bg-[#050606] text-white' : 'bg-white text-black'
                  }`}
                >
                  {lightMode ? <Moon size={16} /> : <Sun size={16} />}
                  {lightMode ? 'Dark' : 'Light'}
                </button>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold">Font Size</p>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {(['S', 'M', 'L'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`rounded-xl py-3 font-bold ${
                        fontSize === size
                          ? 'bg-green-900/30 text-green-400'
                          : 'theme-card'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setNotificationsPopup(true)}
              className="theme-card-secondary flex w-full items-center gap-3 rounded-2xl p-4 text-left font-semibold"
            >
              <Bell size={20} />
              Notification Centre
            </button>

            <SettingsTile icon={<Wifi size={20} />} title="WiFi / Cellular Usage" />
            <SettingsTile icon={<RefreshCcw size={20} />} title="Reset to default settings" />
          </SettingsSection>

          <SettingsSection title="Profile Settings" icon={<User size={20} />}>
            <TextField label="Username" value="DaGilDad1235i" />
            <TextField label="Email" value="David.Gilligan1997@gmail.com" />
            <TextField label="Name" value="David Gilligan" />
            <TextField label="DOB" value="28/08/1997" />

            <SettingsTile icon={<Lock size={20} />} title="Reset Password" />
            <SettingsTile icon={<Trash2 size={20} />} title="Delete Account" danger />
          </SettingsSection>

          <SettingsSection title="Show Mode" icon={<Car size={20} />}>
            <ToggleTile
              title="Show mileage history"
              enabled={showMileage}
              onClick={() => setShowMileage(!showMileage)}
            />

            <ToggleTile
              title="Show modifications"
              enabled={showModifications}
              onClick={() => setShowModifications(!showModifications)}
            />

            <ToggleTile
              title="Show V-Tag reference"
              enabled={showReference}
              onClick={() => setShowReference(!showReference)}
            />
          </SettingsSection>

          <SettingsSection title="My Fleet" icon={<Car size={20} />}>
            <SettingsTile title="Remove Vehicle" danger />
            <SettingsTile title="Adjust Vehicle" />
            <SettingsTile title="Request Vehicle Record Amendment" />
          </SettingsSection>

          <SettingsSection title="Help" icon={<CircleHelp size={20} />}>
            <SettingsTile icon={<CircleHelp size={20} />} title="FAQs" />
            <SettingsTile icon={<Contact size={20} />} title="Contact Us" />
          </SettingsSection>

          <button className="w-full rounded-2xl bg-red-900/30 p-4 text-left font-bold text-red-400">
            Sign Out
          </button>
        </section>

        {connectionPopup && (
          <Popup title="Check V-Tag Connection" onClose={() => setConnectionPopup(false)}>
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-green-900/30 text-green-400">
              <SmartphoneNfc size={48} />
            </div>

            <p className="theme-muted text-center text-sm">
              Hold the top of your phone against the V-TAG case to check the connection.
            </p>
          </Popup>
        )}

        {notificationsPopup && (
          <Popup title="Notification Centre" onClose={() => setNotificationsPopup(false)}>
            <p className="theme-muted text-sm">
              This would open the shared notification centre from the bell icon.
            </p>
          </Popup>
        )}

        <BottomNav />
      </main>
    </AppShell>
  )
}

type SettingsSectionProps = {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

function SettingsSection({ title, icon, children }: SettingsSectionProps) {
  return (
    <section className="theme-card rounded-3xl p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="theme-card-secondary rounded-xl p-3">
          {icon}
        </div>

        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div className="space-y-3">{children}</div>
    </section>
  )
}

type SettingsTileProps = {
  title: string
  icon?: React.ReactNode
  danger?: boolean
}

function SettingsTile({ title, icon, danger }: SettingsTileProps) {
  return (
    <button
      className={`theme-card-secondary flex w-full items-center gap-3 rounded-2xl p-4 text-left font-semibold ${
        danger ? 'text-red-400' : ''
      }`}
    >
      {icon}
      {title}
    </button>
  )
}

type TextFieldProps = {
  label: string
  value: string
}

function TextField({ label, value }: TextFieldProps) {
  return (
    <label className="theme-card-secondary block rounded-2xl p-4">
      <p className="theme-subtle text-xs tracking-widest">{label}</p>

      <input
        value={value}
        readOnly
        className="mt-2 w-full bg-transparent font-semibold outline-none"
      />
    </label>
  )
}

type ToggleTileProps = {
  title: string
  enabled: boolean
  onClick: () => void
}

function ToggleTile({ title, enabled, onClick }: ToggleTileProps) {
  return (
    <button
      onClick={onClick}
      className="theme-card-secondary flex w-full items-center justify-between rounded-2xl p-4 text-left font-semibold"
    >
      <span>{title}</span>

      <span
        className={`rounded-full px-3 py-1 text-xs font-bold ${
          enabled
            ? 'bg-green-900/30 text-green-400'
            : 'bg-red-900/30 text-red-400'
        }`}
      >
        {enabled ? 'ON' : 'OFF'}
      </span>
    </button>
  )
}

type PopupProps = {
  title: string
  children: React.ReactNode
  onClose: () => void
}

function Popup({ title, children, onClose }: PopupProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
      <div className="theme-card w-full max-w-sm rounded-3xl p-6 shadow-2xl">
        <h2 className="text-center text-2xl font-bold">{title}</h2>

        <div className="mt-5">{children}</div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-white py-3 font-bold text-black"
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default Settings