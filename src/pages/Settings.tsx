import { useEffect, useState, type ReactNode } from 'react'
import {
  Bell,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  Clock,
  Contact,
  Download,
  Eye,
  FileText,
  Fingerprint,
  Globe,
  Lock,
  Megaphone,
  MessageSquare,
  Monitor,
  Palette,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
  SmartphoneNfc,
  Trash2,
  User,
  Wifi,
} from 'lucide-react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'

type ThemeMode = 'light' | 'dark' | 'purple' | 'novel'
type FontSize = 'S' | 'M' | 'L'

type ToggleState = {
  notifications: boolean
  vehicleAlerts: boolean
  motReminders: boolean
  taxReminders: boolean
  insuranceReminders: boolean
  softwareUpdates: boolean
  marketingNotifications: boolean
  offlineMode: boolean
  analyticsDiagnostics: boolean
  crashReports: boolean
  useSystemTheme: boolean
  highContrast: boolean
  reduceAnimations: boolean
}

function Settings() {
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [fontSize, setFontSize] = useState<FontSize>('M')
  const [toggles, setToggles] = useState<ToggleState>({
    notifications: true,
    vehicleAlerts: true,
    motReminders: true,
    taxReminders: true,
    insuranceReminders: true,
    softwareUpdates: true,
    marketingNotifications: false,
    offlineMode: false,
    analyticsDiagnostics: true,
    crashReports: true,
    useSystemTheme: false,
    highContrast: false,
    reduceAnimations: false,
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem('vtag-theme') as ThemeMode | null
    const savedFontSize = localStorage.getItem('vtag-font-size') as FontSize | null

    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    }

    if (savedFontSize) {
      setFontSize(savedFontSize)
    }
  }, [])

  function applyTheme(nextTheme: ThemeMode) {
    document.documentElement.classList.remove('light', 'dark', 'purple', 'novel')
    document.documentElement.classList.add(nextTheme)
    localStorage.setItem('vtag-theme', nextTheme)
  }

  function handleThemeChange(nextTheme: ThemeMode) {
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }

  function handleFontSizeChange(nextFontSize: FontSize) {
    setFontSize(nextFontSize)
    localStorage.setItem('vtag-font-size', nextFontSize)
  }

  function toggleSetting(setting: keyof ToggleState) {
    setToggles((current) => ({
      ...current,
      [setting]: !current[setting],
    }))
  }

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">SETTINGS</p>
          <h1 className="mt-1 text-3xl font-bold">Profile Settings</h1>
          <p className="theme-muted mt-2 text-sm">
            Manage your account, app preferences, display options and V-TAG setup.
          </p>
        </section>

        <section className="mt-6 space-y-5 px-5">
          <SettingsSection title="User Settings" icon={<User size={20} />}>
            <SettingsTile
              icon={<ShieldCheck size={20} />}
              title="Profile"
              note="Protected behind verification"
              protectedItem
            />
            <SettingsTile title="Username" note="Change username" />
            <SettingsTile title="Email Address" note="Change email" />
            <SettingsTile title="Full Name" note="Edit name" />
            <SettingsTile title="Date of Birth" note="View/Edit DOB" />
            <SettingsTile icon={<Lock size={20} />} title="Change Password" note="Update password" />
            <SettingsTile
              icon={<Trash2 size={20} />}
              title="Delete Account"
              note="Permanently delete account"
              danger
            />
            <SettingsTile
              icon={<ShieldCheck size={20} />}
              title="Two-Factor Authentication"
              note="Additional account security"
            />
            <SettingsTile
              icon={<Fingerprint size={20} />}
              title="Biometric Login"
              note="Face ID / Fingerprint login"
            />
            <SettingsTile
              icon={<Smartphone size={20} />}
              title="Active Devices"
              note="View and remove logged-in devices"
            />
            <SettingsTile icon={<Download size={20} />} title="Download My Data" note="GDPR data export" />
            <SettingsTile icon={<Globe size={20} />} title="Language" note="Change app language" />
            <SettingsTile title="Region" note="UK, US, EU etc." />
            <SettingsTile title="Preferred Units" note="Miles/Kilometres, MPG/L/100km" />
            <SettingsTile icon={<CalendarDays size={20} />} title="Date Format" note="DD/MM/YYYY etc." />
          </SettingsSection>

          <SettingsSection title="Appearance" icon={<Palette size={20} />}>
            <div className="theme-card-secondary rounded-2xl p-4">
              <p className="font-semibold">Theme</p>
              <p className="theme-muted mt-1 text-xs">Light, Dark, Purple or Novel</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {(['light', 'dark', 'purple', 'novel'] as const).map((themeOption) => (
                  <button
                    key={themeOption}
                    onClick={() => handleThemeChange(themeOption)}
                    className={`rounded-xl py-3 text-sm font-bold capitalize ${
                      theme === themeOption ? 'bg-green-900/30 text-green-400' : 'theme-card'
                    }`}
                  >
                    {themeOption}
                  </button>
                ))}
              </div>
            </div>

            <div className="theme-card-secondary rounded-2xl p-4">
              <p className="font-semibold">Font Size</p>
              <p className="theme-muted mt-1 text-xs">Small / Medium / Large</p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {(['S', 'M', 'L'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleFontSizeChange(size)}
                    className={`rounded-xl py-3 font-bold ${
                      fontSize === size ? 'bg-green-900/30 text-green-400' : 'theme-card'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <ToggleTile
              icon={<Monitor size={20} />}
              title="Use System Theme"
              note="Optional"
              enabled={toggles.useSystemTheme}
              onClick={() => toggleSetting('useSystemTheme')}
            />
            <ToggleTile
              icon={<Eye size={20} />}
              title="High Contrast"
              note="Optional"
              enabled={toggles.highContrast}
              onClick={() => toggleSetting('highContrast')}
            />
            <ToggleTile
              title="Reduce Animations"
              note="Optional"
              enabled={toggles.reduceAnimations}
              onClick={() => toggleSetting('reduceAnimations')}
            />
          </SettingsSection>

          <SettingsSection title="App Preferences" icon={<Bell size={20} />}>
            <ToggleTile
              icon={<Bell size={20} />}
              title="Notifications"
              note="Master notification switch"
              enabled={toggles.notifications}
              onClick={() => toggleSetting('notifications')}
            />
            <SettingsTile icon={<Clock size={20} />} title="Quiet Hours" note="Silence notifications overnight" />
            <SettingsTile title="Reminder Frequency" note="Daily / Weekly / Monthly" />
            <ToggleTile
              title="Vehicle Alerts"
              note="On/Off"
              enabled={toggles.vehicleAlerts}
              onClick={() => toggleSetting('vehicleAlerts')}
            />
            <ToggleTile
              title="MOT Reminders"
              note="On/Off"
              enabled={toggles.motReminders}
              onClick={() => toggleSetting('motReminders')}
            />
            <ToggleTile
              title="Tax Reminders"
              note="On/Off"
              enabled={toggles.taxReminders}
              onClick={() => toggleSetting('taxReminders')}
            />
            <ToggleTile
              title="Insurance Reminders"
              note="On/Off"
              enabled={toggles.insuranceReminders}
              onClick={() => toggleSetting('insuranceReminders')}
            />
            <ToggleTile
              title="Software Updates/New Features"
              note="On/Off"
              enabled={toggles.softwareUpdates}
              onClick={() => toggleSetting('softwareUpdates')}
            />
            <ToggleTile
              icon={<Megaphone size={20} />}
              title="Marketing Notifications"
              note="On/Off"
              enabled={toggles.marketingNotifications}
              onClick={() => toggleSetting('marketingNotifications')}
            />
            <ToggleTile
              title="Offline Mode"
              note="Store data locally"
              enabled={toggles.offlineMode}
              onClick={() => toggleSetting('offlineMode')}
            />
            <SettingsTile icon={<Wifi size={20} />} title="Wi-Fi & Cellular Usage" note="Control data usage" />
            <ToggleTile
              title="Analytics & Diagnostics"
              note="On/Off"
              enabled={toggles.analyticsDiagnostics}
              onClick={() => toggleSetting('analyticsDiagnostics')}
            />
            <ToggleTile
              title="Crash Reports"
              note="On/Off"
              enabled={toggles.crashReports}
              onClick={() => toggleSetting('crashReports')}
            />
            <SettingsTile
              icon={<RefreshCcw size={20} />}
              title="Reset App Settings"
              note="Restore defaults"
              danger
            />
          </SettingsSection>

          <SettingsSection title="V-TAG Settings" icon={<SmartphoneNfc size={20} />}>
            <SettingsTile
              icon={<SmartphoneNfc size={20} />}
              title="Pair New V-TAG"
              note="Connect another V-TAG"
            />
          </SettingsSection>

          <SettingsSection title="Help & Support" icon={<CircleHelp size={20} />}>
            <SettingsTile icon={<CircleHelp size={20} />} title="FAQs" note="Frequently asked questions" />
            <SettingsTile icon={<Contact size={20} />} title="Contact Us" note="Contact support" />
            <SettingsTile
              icon={<MessageSquare size={20} />}
              title="Submit Feedback"
              note="Submit feature requests"
            />
            <SettingsTile title="Report a Problem" note="Submit bug report" />
            <SettingsTile icon={<FileText size={20} />} title="Privacy Policy" note="View policy" />
            <SettingsTile icon={<FileText size={20} />} title="Terms & Conditions" note="View terms" />
            <SettingsTile title="App Version" note="Version number" />
          </SettingsSection>

          <button className="w-full rounded-2xl bg-red-900/30 p-4 text-left font-bold text-red-400">
            Sign Out
          </button>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

type SettingsSectionProps = {
  title: string
  icon: ReactNode
  children: ReactNode
}

function SettingsSection({ title, icon, children }: SettingsSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="theme-card rounded-3xl p-5">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-3">
          <span className="theme-card-secondary rounded-xl p-3">{icon}</span>
          <span className="text-lg font-bold">{title}</span>
        </span>

        <ChevronRight
          size={22}
          className={`theme-muted transition-transform ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-4 space-y-3">
          {children}
        </div>
      )}
    </section>
  )
}

type SettingsTileProps = {
  title: string
  note?: string
  icon?: ReactNode
  danger?: boolean
  protectedItem?: boolean
}

function SettingsTile({ title, note, icon, danger, protectedItem }: SettingsTileProps) {
  return (
    <button
      className={`theme-card-secondary flex w-full items-center justify-between gap-3 rounded-2xl p-4 text-left font-semibold ${
        danger ? 'text-red-400' : ''
      }`}
    >
      <span className="flex items-center gap-3">
        {icon}
        <span>
          <span className="block">{title}</span>
          {note && <span className="theme-muted mt-1 block text-xs font-normal">{note}</span>}
        </span>
      </span>

      <span className="flex items-center gap-2">
        {protectedItem && (
          <span className="rounded-full bg-green-900/30 px-3 py-1 text-xs font-bold text-green-400">
            VERIFY
          </span>
        )}
        <ChevronRight size={18} className="theme-muted" />
      </span>
    </button>
  )
}

type ToggleTileProps = {
  title: string
  note?: string
  icon?: ReactNode
  enabled: boolean
  onClick: () => void
}

function ToggleTile({ title, note, icon, enabled, onClick }: ToggleTileProps) {
  return (
    <button
      onClick={onClick}
      className="theme-card-secondary flex w-full items-center justify-between gap-3 rounded-2xl p-4 text-left font-semibold"
    >
      <span className="flex items-center gap-3">
        {icon}
        <span>
          <span className="block">{title}</span>
          {note && <span className="theme-muted mt-1 block text-xs font-normal">{note}</span>}
        </span>
      </span>

      <span
        className={`rounded-full px-3 py-1 text-xs font-bold ${
          enabled ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
        }`}
      >
        {enabled ? 'ON' : 'OFF'}
      </span>
    </button>
  )
}

export default Settings
