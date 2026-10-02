import type { ReactNode } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Eye,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'

type ConditionStatus =
  | 'excellent'
  | 'good'
  | 'attention'
  | 'poor'
  | 'not-assessed'

type ConditionArea = {
  id: string
  title: string
  description: string
  status: ConditionStatus
  to: string
  icon: ReactNode
}

const conditionAreas: ConditionArea[] = [
  {
    id: 'mechanical',
    title: 'Mechanical',
    description: 'Engine, drivetrain and mechanical condition',
    status: 'excellent',
    to: '/vehicle-identity/health/condition/mechanical',
    icon: <Wrench size={24} strokeWidth={1.6} />,
  },
  {
    id: 'exterior',
    title: 'Exterior',
    description: 'Bodywork, paint, glass and exterior trim',
    status: 'excellent',
    to: '/vehicle-identity/health/condition/exterior',
    icon: <Sparkles size={24} strokeWidth={1.6} />,
  },
  {
    id: 'interior',
    title: 'Interior',
    description: 'Cabin, upholstery and interior equipment',
    status: 'excellent',
    to: '/vehicle-identity/health/condition/interior',
    icon: <Eye size={24} strokeWidth={1.6} />,
  },
  {
    id: 'wheels-tyres',
    title: 'Wheels & Tyres',
    description: 'Wheel condition, tyres and recorded advisories',
    status: 'attention',
    to: '/vehicle-identity/health/condition/wheels-tyres',
    icon: <CircleGauge size={24} strokeWidth={1.6} />,
  },
]

function VehicleCondition() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">CONDITION</p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its condition.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  const areasRequiringAttention = conditionAreas.filter(
    (area) => area.status === 'attention',
  ).length

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">CONDITION</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Current vehicle condition and recorded areas of attention.
          </p>
        </section>

        {/* CONDITION SUMMARY */}
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
                  OVERALL CONDITION
                </p>

                <h2 className="mt-1 text-3xl font-bold">Excellent</h2>

                <div className="mt-2 flex items-end gap-1">
                  <span className="text-2xl font-bold text-[#c1f89f]">5</span>

                  <span className="theme-muted pb-0.5 text-sm">/ 5</span>
                </div>
              </div>

              <ShieldCheck
                size={42}
                strokeWidth={1.2}
                className="text-[#c1f89f]"
              />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <SummaryValue label="Areas Assessed" value="4" />

                <SummaryValue
                  label="Attention"
                  value={`${areasRequiringAttention}`}
                />

                <SummaryValue label="Known Defects" value="0" />

                <SummaryValue label="Open Advisories" value="1" />
              </div>
            </div>
          </div>
        </section>

        {/* CURRENT ATTENTION */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            CURRENT ATTENTION
          </p>

          <div
            className="
              mt-3
              rounded-2xl
              border border-yellow-400/15
              bg-yellow-400/5
              p-4
            "
          >
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={20}
                strokeWidth={1.7}
                className="mt-0.5 shrink-0 text-yellow-400"
              />

              <div className="min-w-0">
                <p className="text-sm font-bold">Front Tyres</p>

                <p className="theme-muted mt-1 text-sm leading-relaxed">
                  Front tyres recorded as close to the legal tread depth limit.
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="theme-subtle text-[10px] uppercase tracking-wider">
                    Source
                  </span>

                  <span className="text-xs font-semibold">
                    MOT · 10 May 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONDITION AREAS */}
        <section className="mt-7 px-5">
          <div>
            <p className="theme-subtle text-xs tracking-widest">
              CONDITION AREAS
            </p>

            <p className="theme-muted mt-1 text-xs">
              Review recorded condition by vehicle area
            </p>
          </div>

          <div className="mt-3 space-y-3">
            {conditionAreas.map((area) => (
              <ConditionAreaCard key={area.id} area={area} />
            ))}
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

interface ConditionAreaCardProps {
  area: ConditionArea
}

function ConditionAreaCard({ area }: ConditionAreaCardProps) {
  return (
    <Link
      to={area.to}
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
        {area.icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold">{area.title}</h2>

          <ConditionIndicator status={area.status} />
        </div>

        <p className="theme-muted mt-1 text-xs leading-snug">
          {area.description}
        </p>
      </div>

      <ChevronRight
        size={18}
        strokeWidth={1.8}
        className="theme-subtle shrink-0"
      />
    </Link>
  )
}

interface ConditionIndicatorProps {
  status: ConditionStatus
}

function ConditionIndicator({ status }: ConditionIndicatorProps) {
  if (status === 'excellent') {
    return (
      <CheckCircle2
        size={15}
        strokeWidth={1.8}
        className="shrink-0 text-[#c1f89f]"
      />
    )
  }

  if (status === 'good') {
    return (
      <span className="text-[10px] font-semibold text-[#c1f89f]">GOOD</span>
    )
  }

  if (status === 'attention') {
    return (
      <AlertTriangle
        size={15}
        strokeWidth={1.8}
        className="shrink-0 text-yellow-400"
      />
    )
  }

  if (status === 'poor') {
    return <span className="text-[10px] font-semibold text-red-400">POOR</span>
  }

  return (
    <span className="theme-subtle text-[10px] font-semibold">NOT ASSESSED</span>
  )
}

export default VehicleCondition
