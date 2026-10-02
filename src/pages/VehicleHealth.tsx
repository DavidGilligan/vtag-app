import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  ChevronRight,
  Gauge,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'

function VehicleHealth() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">
              VEHICLE HEALTH
            </p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its health.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  const currentUsage = (() => {
    const usage = selectedVehicle.usage

    if (!usage) {
      return 'Not recorded'
    }

    const value = usage.value.toLocaleString('en-GB')

    switch (usage.type) {
      case 'mileage':
        return `${value} mi`

      case 'kilometres':
        return `${value} km`

      case 'hours':
        return `${value} hours`

      default:
        return value
    }
  })()

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">VEHICLE HEALTH</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Condition, usage, maintenance and vehicle history.
          </p>
        </section>

        {/* HEALTH SUMMARY */}
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
              <div>
                <p className="theme-subtle text-[10px] uppercase tracking-wider">
                  CONDITION
                </p>

                <h2 className="mt-1 text-2xl font-bold">Excellent</h2>

                <p className="mt-1 text-sm font-semibold text-[#c1f89f]">
                  5 / 5
                </p>
              </div>

              <HeartPulse
                size={42}
                strokeWidth={1.2}
                className="text-[#c1f89f]"
              />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-5">
                <SummaryValue label="Current Mileage" value={currentUsage} />

                <SummaryValue label="Latest MOT" value="PASS" />

                <SummaryValue label="Since Last MOT" value="+2,553 mi" />

                <SummaryValue label="Last Service" value="12 Mar 2026" />
              </div>
            </div>
          </div>
        </section>

        {/* HEALTH AREAS */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">EXPLORE HEALTH</p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <HealthLink
              icon={<Gauge size={25} strokeWidth={1.6} />}
              title="Mileage"
              description="Usage, mileage history and trends"
              to="/vehicle-identity/health/mileage"
            />

            <HealthLink
              icon={<Activity size={25} strokeWidth={1.6} />}
              title="MOT History"
              description="Tests, results and advisories"
              to="/vehicle-identity/health/mot"
            />

            <HealthLink
              icon={<Wrench size={25} strokeWidth={1.6} />}
              title="Servicing"
              description="Maintenance and service records"
              to="/vehicle-identity/health/servicing"
            />

            <HealthLink
              icon={<HeartPulse size={25} strokeWidth={1.6} />}
              title="Condition"
              description="Vehicle condition and health"
              to="/vehicle-identity/health/condition"
            />

            <HealthLink
              icon={<Sparkles size={25} strokeWidth={1.6} />}
              title="Modifications"
              description="Upgrades, parts and alterations"
              to="/vehicle-identity/health/modifications"
            />

            <HealthLink
              icon={<ShieldCheck size={25} strokeWidth={1.6} />}
              title="Warranty"
              description="Vehicle cover and warranty history"
              to="/vehicle-identity/warranty"
            />
          </div>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
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

interface HealthLinkProps {
  icon: ReactNode
  title: string
  description: string
  to: string
}

function HealthLink({ icon, title, description, to }: HealthLinkProps) {
  return (
    <Link
      to={to}
      className="
        theme-card
        flex min-h-[145px]
        flex-col
        rounded-2xl
        p-4
        transition
        active:scale-[0.98]
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-[#c1f89f]">{icon}</div>

        <ChevronRight
          size={18}
          strokeWidth={1.8}
          className="theme-subtle shrink-0"
        />
      </div>

      <div className="mt-auto pt-5">
        <h2 className="text-sm font-bold leading-tight">{title}</h2>

        <p className="theme-muted mt-1.5 text-xs leading-snug">{description}</p>
      </div>
    </Link>
  )
}

export default VehicleHealth
