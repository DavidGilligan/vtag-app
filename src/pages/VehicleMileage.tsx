import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays,
  ChevronRight,
  Gauge,
  History,
  Plus,
  TrendingUp,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'

function VehicleMileage() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">MILEAGE</p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its mileage.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  const usage = selectedVehicle.usage

  const currentUsage = (() => {
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

  const isMileageVehicle = usage?.type === 'mileage'

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">MILEAGE</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Usage history, recorded mileage and vehicle trends.
          </p>
        </section>

        {/* CURRENT MILEAGE */}
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
                  CURRENT MILEAGE
                </p>

                <p className="mt-1 text-3xl font-bold">{currentUsage}</p>

                <p className="theme-muted mt-2 text-xs">
                  Latest recorded vehicle usage
                </p>
              </div>

              <Gauge size={42} strokeWidth={1.2} className="text-[#c1f89f]" />
            </div>

            {isMileageVehicle && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                  <SummaryValue label="Last MOT" value="7,999 mi" />

                  <SummaryValue label="Since Last MOT" value="+2,553 mi" />

                  <SummaryValue label="MOT Date" value="10 May 2026" />

                  <SummaryValue label="Readings" value="3 recorded" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* MILEAGE PROGRESSION */}
        {isMileageVehicle && (
          <section className="mt-7 px-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="theme-subtle text-xs tracking-widest">
                  MILEAGE PROGRESSION
                </p>

                <p className="theme-muted mt-1 text-xs">
                  Recorded mileage over time
                </p>
              </div>

              <TrendingUp
                size={20}
                strokeWidth={1.6}
                className="text-[#c1f89f]"
              />
            </div>

            <div className="theme-card mt-3 rounded-3xl p-5">
              <MileageProgress
                date="10 May 2025"
                mileage="4,101"
                percentage={39}
                source="MOT"
              />

              <MileageProgress
                date="10 May 2026"
                mileage="7,999"
                percentage={76}
                source="MOT"
              />

              <MileageProgress
                date="Current"
                mileage="10,552"
                percentage={100}
                source="Latest Reading"
                last
              />
            </div>
          </section>
        )}

        {/* MILEAGE TOOLS */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            MILEAGE & USAGE
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <MileageLink
              icon={<History size={25} strokeWidth={1.6} />}
              title="Mileage History"
              description="All recorded mileage readings"
              to="/vehicle-identity/health/mileage/history"
            />

            <MileageLink
              icon={<TrendingUp size={25} strokeWidth={1.6} />}
              title="Usage Analysis"
              description="Mileage trends and vehicle usage"
              to="/vehicle-identity/health/mileage/analysis"
            />

            <MileageLink
              icon={<CalendarDays size={25} strokeWidth={1.6} />}
              title="Annual Mileage"
              description="Mileage by year and ownership period"
              to="/vehicle-identity/health/mileage/annual"
            />

            <MileageLink
              icon={<Plus size={25} strokeWidth={1.6} />}
              title="Add Reading"
              description="Record the latest vehicle mileage"
              to="/vehicle-identity/health/mileage/add"
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

interface MileageProgressProps {
  date: string
  mileage: string
  percentage: number
  source: string
  last?: boolean
}

function MileageProgress({
  date,
  mileage,
  percentage,
  source,
  last = false,
}: MileageProgressProps) {
  return (
    <div className={last ? '' : 'mb-5'}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">{date}</p>

          <p className="theme-subtle mt-0.5 text-[10px] uppercase tracking-wider">
            {source}
          </p>
        </div>

        <p className="text-sm font-bold">{mileage} mi</p>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#c1f89f]"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
}

interface MileageLinkProps {
  icon: ReactNode
  title: string
  description: string
  to: string
}

function MileageLink({ icon, title, description, to }: MileageLinkProps) {
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

export default VehicleMileage
