import { useState, type ReactNode } from 'react'
import {
  Car,
  ChevronRight,
  FileText,
  Gauge,
  History,
  Pencil,
  SmartphoneNfc,
  TriangleAlert,
  Wrench,
} from 'lucide-react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'

function VehicleSettings() {
  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">VEHICLE SETTINGS</p>
          <h1 className="mt-1 text-3xl font-bold">Vehicle Settings</h1>
          <p className="theme-muted mt-2 text-sm">
            Manage this vehicle, its records and its assigned V-TAG.
          </p>
        </section>

        <section className="mt-6 space-y-5 px-5">
          <SettingsSection title="Vehicle Settings" icon={<Car size={20} />}>
            <SettingsTile title="Vehicle Information" note="Registration, make, model, year, VIN" />
            <SettingsTile title="Assigned V-TAG" note="View the linked V-TAG" />
            <SettingsTile title="Vehicle Nickname" note="Optional friendly name" />
            <SettingsTile icon={<Gauge size={20} />} title="Mileage" note="View and manually amend with audit log if applicable" />
            <SettingsTile icon={<History size={20} />} title="Mileage History" note="View historical mileage records" />
            <SettingsTile icon={<Wrench size={20} />} title="Modifications" note="View and manage modifications" />
            <SettingsTile icon={<FileText size={20} />} title="Documents" note="MOT, insurance, service records, receipts" />
            <SettingsTile title="Service History" note="View completed services" />
            <SettingsTile title="MOT Information" note="View current MOT details" />
            <SettingsTile title="Tax Information" note="View current tax status" />
            <SettingsTile title="Ownership History" note="View ownership timeline if supported" />
            <SettingsTile icon={<Pencil size={20} />} title="Request Record Amendment" note="Submit corrections to vehicle records" />
            <SettingsTile title="Transfer Ownership" note="Begin ownership transfer process" />
            <SettingsTile title="Remove Vehicle" note="Remove vehicle from account" danger />
          </SettingsSection>

          <SettingsSection title="V-TAG Settings" icon={<SmartphoneNfc size={20} />}>
            <SettingsTile title="V-TAG Reference" note="Unique tag ID" />
            <SettingsTile title="Connection Status" note="Check whether the app can communicate with the tag/service" />
            <SettingsTile title="Last Scan" note="Date and time the tag was last successfully read" />
            <SettingsTile title="Pair / Reassign V-TAG" note="Link a different tag to the vehicle" />
            <SettingsTile title="Unpair V-TAG" note="Remove tag association" />
            <SettingsTile title="Replace V-TAG" note="Replace a damaged or lost tag while maintaining the vehicle record" />
            <SettingsTile title="Export Device Logs" note="For troubleshooting" />
            <SettingsTile title="Installation Status" note="Confirm tag has been correctly installed" />
            <SettingsTile title="Test V-TAG" note="Verify the tag is functioning correctly" />
            <SettingsTile title="Report Lost or Damaged V-TAG" note="Begin replacement process" />
            <SettingsTile title="View Linked Vehicle" note="Shows which vehicle this tag belongs to" />
          </SettingsSection>

          <SettingsSection title="Danger Zone" icon={<TriangleAlert size={20} />}>
            <SettingsTile title="Remove Vehicle" note="You cannot transfer a V-TAG from one car to another" danger />
            <SettingsTile title="Transfer Ownership" note="Passing on vehicle to someone else?" danger />
            <SettingsTile title="Mark as Stolen" note="Mark vehicle as stolen so the authorities and buyers are aware to flag this" danger />
            <SettingsTile title="Mark as Scrapped" note="Mark vehicle as scrapped. Sell for parts?" danger />
          </SettingsSection>
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
          className={`theme-muted transition-transform ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>

      {isOpen && <div className="mt-4 space-y-3">{children}</div>}
    </section>
  )
}

type SettingsTileProps = {
  title: string
  note?: string
  icon?: ReactNode
  danger?: boolean
}

function SettingsTile({ title, note, icon, danger }: SettingsTileProps) {
  return (
    <button
      type="button"
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

      <ChevronRight size={18} className="theme-muted" />
    </button>
  )
}

export default VehicleSettings