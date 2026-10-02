import type { ReactNode } from 'react'
import {
  AlertCircle,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileText,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'

type WarrantyStatus = 'active' | 'expired' | 'unknown'

type WarrantyRecord = {
  id: string
  provider: string
  name: string
  type: string
  startDate?: string
  expiryDate?: string
  status: WarrantyStatus
  mileageLimit?: string
  documentAvailable: boolean
}

const warranty: WarrantyRecord = {
  id: 'warranty-1',
  provider: 'BMW',
  name: 'BMW New Vehicle Warranty',
  type: 'Manufacturer Warranty',
  startDate: '10 May 2022',
  expiryDate: '10 May 2025',
  status: 'expired',
  documentAvailable: true,
}

function VehicleWarranty() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">WARRANTY</p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its warranty
                information.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">WARRANTY</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Manufacturer and vehicle warranty information.
          </p>
        </section>

        {/* WARRANTY SUMMARY */}
        <section className="mt-6 px-5">
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              p-5
            "
            style={{
              background:
                'linear-gradient(90deg, #1d1d21 0%, #1d1d21 30%, #0a0a0a 75%, #000 100%)',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="theme-subtle text-[10px] uppercase tracking-wider">
                  WARRANTY STATUS
                </p>

                <WarrantyStatusDisplay status={warranty.status} />

                <p className="theme-muted mt-2 text-xs">{warranty.name}</p>
              </div>

              <ShieldCheck
                size={42}
                strokeWidth={1.2}
                className={
                  warranty.status === 'active'
                    ? 'shrink-0 text-[#c1f89f]'
                    : 'theme-subtle shrink-0'
                }
              />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <SummaryValue label="Provider" value={warranty.provider} />

                <SummaryValue label="Type" value={warranty.type} />

                <SummaryValue
                  label="Started"
                  value={warranty.startDate || 'Not recorded'}
                />

                <SummaryValue
                  label="Expired"
                  value={warranty.expiryDate || 'Not recorded'}
                />
              </div>
            </div>
          </div>
        </section>

        {/* WARRANTY RECORD */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            WARRANTY RECORD
          </p>

          <div className="theme-card mt-3 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div
                className="
                  theme-card-secondary
                  flex h-11 w-11
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  text-[#c1f89f]
                "
              >
                <Building2 size={23} strokeWidth={1.6} />
              </div>

              <div className="min-w-0">
                <h2 className="text-sm font-bold">{warranty.name}</h2>

                <p className="theme-muted mt-1 text-xs">{warranty.provider}</p>
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <RecordRow
                icon={<CalendarDays size={17} strokeWidth={1.6} />}
                label="Coverage Period"
                value={`${warranty.startDate} – ${warranty.expiryDate}`}
              />

              <RecordRow
                icon={<ShieldCheck size={17} strokeWidth={1.6} />}
                label="Warranty Type"
                value={warranty.type}
              />

              <RecordRow
                icon={<Wrench size={17} strokeWidth={1.6} />}
                label="Mileage Limit"
                value={warranty.mileageLimit || 'Not recorded'}
                last
              />
            </div>

            {warranty.documentAvailable && (
              <button
                type="button"
                className="
                  mt-5
                  flex w-full
                  items-center justify-center gap-2
                  rounded-xl
                  border border-[#c1f89f]/20
                  bg-[#c1f89f]/10
                  px-4 py-3
                  text-sm font-semibold
                  text-[#c1f89f]
                  transition
                  active:scale-[0.98]
                "
              >
                <FileText size={17} strokeWidth={1.8} />
                VIEW WARRANTY DOCUMENT
              </button>
            )}
          </div>
        </section>

        {/* WARRANTY EFFECTS */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            WARRANTY & VEHICLE HISTORY
          </p>

          <div className="mt-3 space-y-3">
            <WarrantyLink
              icon={<Wrench size={23} strokeWidth={1.6} />}
              title="Service History"
              description="Review maintenance completed during the warranty period"
              to="/vehicle-identity/health/servicing"
            />

            <WarrantyLink
              icon={<FileText size={23} strokeWidth={1.6} />}
              title="Warranty Documents"
              description="View supporting warranty documentation"
              to="/vehicle-identity/documents/other"
            />
          </div>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

interface WarrantyStatusDisplayProps {
  status: WarrantyStatus
}

function WarrantyStatusDisplay({ status }: WarrantyStatusDisplayProps) {
  if (status === 'active') {
    return (
      <div className="mt-1 flex items-center gap-2">
        <h2 className="text-3xl font-bold">Active</h2>

        <CheckCircle2 size={21} strokeWidth={1.8} className="text-[#c1f89f]" />
      </div>
    )
  }

  if (status === 'expired') {
    return (
      <div className="mt-1 flex items-center gap-2">
        <h2 className="text-3xl font-bold">Expired</h2>

        <AlertCircle size={21} strokeWidth={1.8} className="theme-subtle" />
      </div>
    )
  }

  return <h2 className="mt-1 text-3xl font-bold">Unknown</h2>
}

interface SummaryValueProps {
  label: string
  value: string
}

function SummaryValue({ label, value }: SummaryValueProps) {
  return (
    <div>
      <p className="theme-subtle text-[10px] uppercase tracking-wider">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  )
}

interface RecordRowProps {
  icon: ReactNode
  label: string
  value: string
  last?: boolean
}

function RecordRow({ icon, label, value, last = false }: RecordRowProps) {
  return (
    <div
      className={`
        flex items-center gap-3 py-3
        ${last ? '' : 'border-b border-white/10'}
      `}
    >
      <div className="shrink-0 text-[#c1f89f]">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="theme-subtle text-[10px] uppercase tracking-wider">
          {label}
        </p>

        <p className="mt-0.5 text-sm font-semibold">{value}</p>
      </div>
    </div>
  )
}

interface WarrantyLinkProps {
  icon: ReactNode
  title: string
  description: string
  to: string
}

function WarrantyLink({ icon, title, description, to }: WarrantyLinkProps) {
  return (
    <Link
      to={to}
      className="
        theme-card
        flex items-center
        gap-4
        rounded-2xl
        p-4
        transition
        active:scale-[0.98]
      "
    >
      <div
        className="
          theme-card-secondary
          flex h-11 w-11
          shrink-0
          items-center justify-center
          rounded-xl
          text-[#c1f89f]
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-bold">{title}</h2>

        <p className="theme-muted mt-1 text-xs leading-snug">{description}</p>
      </div>

      <ChevronRight
        size={18}
        strokeWidth={1.8}
        className="theme-subtle shrink-0"
      />
    </Link>
  )
}

export default VehicleWarranty
