import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays,
  CarFront,
  ChevronDown,
  ChevronUp,
  FileText,
  Gauge,
  History,
  ShieldCheck,
  UserRound,
  Wrench,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'
import approvalShield from '../assets/ApprovalShield.png'

type TimelineEventType =
  | 'registration'
  | 'ownership'
  | 'mot'
  | 'service'
  | 'modification'
  | 'mileage'
  | 'recall'
  | 'document'

type VerificationStatus =
  | 'verified'
  | 'verification-pending'
  | 'evidence-supplied'
  | 'unverified'

type TimelineEvent = {
  id: string
  type: TimelineEventType
  date: string
  sortDate: string
  title: string
  provider?: string
  description?: string
  mileage?: string
  result?: 'PASS' | 'FAIL'
  verificationStatus: VerificationStatus
  hasEvidence?: boolean
  sourcePath?: string
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 'mot-2026-pass',
    type: 'mot',
    date: '10 May 2026',
    sortDate: '2026-05-10',
    title: 'MOT Passed',
    provider: 'John Clark BMW Aberdeen',
    mileage: '7,999 mi',
    result: 'PASS',
    description:
      'Advisory recorded: front tyres close to legal tread depth limit.',
    verificationStatus: 'verified',
    hasEvidence: true,
    sourcePath: '/vehicle-identity/health/mot',
  },
  {
    id: 'mot-2026-fail',
    type: 'mot',
    date: '10 May 2026',
    sortDate: '2026-05-10',
    title: 'MOT Failed',
    provider: 'John Clark BMW Aberdeen',
    mileage: '7,999 mi',
    result: 'FAIL',
    description: 'Major defect recorded for windscreen wiper performance.',
    verificationStatus: 'verified',
    hasEvidence: true,
    sourcePath: '/vehicle-identity/health/mot',
  },
  {
    id: 'service-2026',
    type: 'service',
    date: '12 Mar 2026',
    sortDate: '2026-03-12',
    title: 'BMW Oil Service',
    provider: 'John Clark BMW Aberdeen',
    description:
      'Engine oil and oil filter replaced. Vehicle health check completed.',
    verificationStatus: 'verified',
    hasEvidence: true,
    sourcePath: '/vehicle-identity/health/servicing',
  },
  {
    id: 'modification-intake',
    type: 'modification',
    date: '22 Sep 2025',
    sortDate: '2025-09-22',
    title: 'MST Performance Intake',
    provider: 'Vehicle Owner',
    description:
      'Self-installed intake modification with supporting receipt and photographs.',
    verificationStatus: 'evidence-supplied',
    hasEvidence: true,
    sourcePath: '/vehicle-identity/health/modifications',
  },
  {
    id: 'modification-exhaust',
    type: 'modification',
    date: '12 Aug 2025',
    sortDate: '2025-08-12',
    title: 'Remus Cat-Back Exhaust',
    provider: 'Performance Centre Aberdeen',
    description: 'Professional installation with supporting evidence.',
    verificationStatus: 'verified',
    hasEvidence: true,
    sourcePath: '/vehicle-identity/health/modifications',
  },
  {
    id: 'service-2025',
    type: 'service',
    date: '18 May 2025',
    sortDate: '2025-05-18',
    title: 'Scheduled Maintenance',
    provider: 'John Clark BMW Aberdeen',
    description: 'Scheduled maintenance and diagnostic checks completed.',
    verificationStatus: 'verified',
    hasEvidence: true,
    sourcePath: '/vehicle-identity/health/servicing',
  },
  {
    id: 'mot-2025',
    type: 'mot',
    date: '10 May 2025',
    sortDate: '2025-05-10',
    title: 'MOT Passed',
    provider: 'John Clark BMW Aberdeen',
    mileage: '4,101 mi',
    result: 'PASS',
    description: 'No advisories recorded.',
    verificationStatus: 'verified',
    hasEvidence: true,
    sourcePath: '/vehicle-identity/health/mot',
  },
  {
    id: 'vehicle-registration',
    type: 'registration',
    date: 'May 2022',
    sortDate: '2022-05-10',
    title: 'Vehicle First Registered',
    description: 'Original registration MA22 RDE.',
    verificationStatus: 'unverified',
    sourcePath: '/vehicle-identity/record/registration-history',
  },
]

const filters: {
  label: string
  value: 'all' | TimelineEventType
}[] = [
  { label: 'All', value: 'all' },
  { label: 'MOT', value: 'mot' },
  { label: 'Service', value: 'service' },
  { label: 'Mods', value: 'modification' },
  { label: 'Mileage', value: 'mileage' },
  { label: 'Ownership', value: 'ownership' },
  { label: 'Documents', value: 'document' },
]

function Timeline() {
  const { selectedVehicle } = useVehicles()
  const [activeFilter, setActiveFilter] = useState<'all' | TimelineEventType>(
    'all',
  )

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">TIMELINE</p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its timeline.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  const filteredEvents =
    activeFilter === 'all'
      ? timelineEvents
      : timelineEvents.filter((event) => event.type === activeFilter)

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime(),
  )

  const verifiedCount = timelineEvents.filter(
    (event) => event.verificationStatus === 'verified',
  ).length

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">
            VEHICLE TIMELINE
          </p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            The chronological history of this vehicle.
          </p>
        </section>

        {/* SUMMARY */}
        <section className="mt-6 px-5">
          <div
            className="relative overflow-hidden rounded-3xl p-5"
            style={{
              background:
                'linear-gradient(90deg, #1d1d21 0%, #1d1d21 30%, #0a0a0a 75%, #000 100%)',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="theme-subtle text-[10px] uppercase tracking-wider">
                  VEHICLE HISTORY
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                  {timelineEvents.length} Events
                </h2>

                <p className="theme-muted mt-2 text-xs">May 2022 – Present</p>
              </div>

              <History
                size={44}
                strokeWidth={1.2}
                className="shrink-0 text-[#c1f89f]"
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
              <SummaryValue
                label="Recorded Events"
                value={`${timelineEvents.length}`}
              />

              <SummaryValue label="V-TAG Verified" value={`${verifiedCount}`} />

              <SummaryValue
                label="Current Mileage"
                value={
                  selectedVehicle.usage
                    ? `${selectedVehicle.usage.value.toLocaleString()} ${
                        selectedVehicle.usage.type === 'kilometres'
                          ? 'km'
                          : selectedVehicle.usage.type === 'hours'
                            ? 'hrs'
                            : 'mi'
                      }`
                    : 'Not recorded'
                }
              />

              <SummaryValue
                label="Latest Event"
                value={timelineEvents[0]?.date || 'None'}
              />
            </div>
          </div>
        </section>

        {/* FILTERS */}
        <section className="mt-6">
          <div
            className="
              flex gap-2
              overflow-x-auto
              px-5
              pb-2
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {filters.map((filter) => {
              const selected = activeFilter === filter.value

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`
                    shrink-0
                    rounded-full
                    border
                    px-4 py-2
                    text-xs
                    font-semibold
                    transition
                    ${
                      selected
                        ? 'border-[#c1f89f]/30 bg-[#c1f89f]/10 text-[#c1f89f]'
                        : 'theme-border theme-card theme-muted'
                    }
                  `}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </section>

        {/* TIMELINE */}
        <section className="mt-5 px-5">
          {sortedEvents.length > 0 ? (
            <div>
              {sortedEvents.map((event, index) => (
                <TimelineItem
                  key={event.id}
                  event={event}
                  last={index === sortedEvents.length - 1}
                />
              ))}
            </div>
          ) : (
            <div className="theme-card rounded-2xl p-5">
              <p className="text-sm font-semibold">No events recorded</p>

              <p className="theme-muted mt-1 text-xs">
                There are no timeline events in this category.
              </p>
            </div>
          )}
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

interface TimelineItemProps {
  event: TimelineEvent
  last: boolean
}

function TimelineItem({ event, last }: TimelineItemProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative flex gap-4">
      {/* TIMELINE RAIL */}
      <div className="relative flex w-10 shrink-0 justify-center">
        {!last && (
          <div
            className="
              absolute
              left-1/2
              top-10
              bottom-0
              w-px
              -translate-x-1/2
              bg-white/10
            "
          />
        )}

        <div
          className="
            relative z-10
            flex h-10 w-10
            items-center justify-center
            rounded-full
            border border-[#c1f89f]/20
            bg-[#182018]
            text-[#c1f89f]
          "
        >
          {getEventIcon(event.type)}
        </div>
      </div>

      {/* EVENT */}
      <div
        className={`
          min-w-0 flex-1
          ${last ? 'pb-0' : 'pb-5'}
        `}
      >
        <p className="theme-subtle mb-2 text-[10px] font-semibold uppercase tracking-wider">
          {event.date}
        </p>

        <article className="theme-card overflow-hidden rounded-2xl">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-full p-4 text-left"
          >
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-bold">{event.title}</h2>

                  {event.result && <ResultPill result={event.result} />}

                  {event.verificationStatus === 'verified' && (
                    <img
                      src={approvalShield}
                      alt="V-TAG Verified"
                      className="h-[15px] w-[15px] object-contain"
                    />
                  )}
                </div>

                {event.provider && (
                  <p className="theme-muted mt-1 text-xs">{event.provider}</p>
                )}

                {event.mileage && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <Gauge size={13} className="theme-subtle" />

                    <p className="theme-subtle text-xs">{event.mileage}</p>
                  </div>
                )}

                <p
                  className={`
                    mt-2 text-[10px] font-bold
                    ${
                      event.verificationStatus === 'verified'
                        ? 'text-[#c1f89f]'
                        : 'theme-subtle'
                    }
                  `}
                >
                  {formatVerification(event.verificationStatus).toUpperCase()}
                </p>
              </div>

              {expanded ? (
                <ChevronUp size={18} className="theme-subtle shrink-0" />
              ) : (
                <ChevronDown size={18} className="theme-subtle shrink-0" />
              )}
            </div>
          </button>

          {expanded && (
            <div className="border-t border-white/10 px-4 pb-4 pt-3">
              {event.description && (
                <p className="theme-muted text-sm leading-relaxed">
                  {event.description}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {event.hasEvidence && (
                  <span
                    className="
                      inline-flex
                      items-center gap-1.5
                      rounded-full
                      bg-white/[0.05]
                      px-3 py-1.5
                      text-[10px]
                      font-semibold
                    "
                  >
                    <FileText size={12} />
                    Supporting Evidence
                  </span>
                )}

                {event.verificationStatus === 'verified' && (
                  <span
                    className="
                      inline-flex
                      items-center gap-1.5
                      rounded-full
                      bg-[#c1f89f]/10
                      px-3 py-1.5
                      text-[10px]
                      font-semibold
                      text-[#c1f89f]
                    "
                  >
                    <ShieldCheck size={12} />
                    V-TAG Verified
                  </span>
                )}
              </div>

              {event.sourcePath && (
                <Link
                  to={event.sourcePath}
                  className="
                    mt-4
                    inline-flex
                    items-center
                    text-xs
                    font-bold
                    text-[#c1f89f]
                  "
                >
                  VIEW RECORD
                </Link>
              )}
            </div>
          )}
        </article>
      </div>
    </div>
  )
}

function getEventIcon(type: TimelineEventType): ReactNode {
  switch (type) {
    case 'mot':
      return <CarFront size={18} strokeWidth={1.6} />

    case 'service':
      return <Wrench size={18} strokeWidth={1.6} />

    case 'modification':
      return <Wrench size={18} strokeWidth={1.6} />

    case 'mileage':
      return <Gauge size={18} strokeWidth={1.6} />

    case 'ownership':
      return <UserRound size={18} strokeWidth={1.6} />

    case 'registration':
      return <CalendarDays size={18} strokeWidth={1.6} />

    case 'document':
      return <FileText size={18} strokeWidth={1.6} />

    case 'recall':
      return <ShieldCheck size={18} strokeWidth={1.6} />
  }
}

function ResultPill({ result }: { result: 'PASS' | 'FAIL' }) {
  return (
    <span
      className={`
        rounded-full
        px-2 py-0.5
        text-[9px]
        font-bold
        ${
          result === 'PASS'
            ? 'bg-[#c1f89f]/10 text-[#c1f89f]'
            : 'bg-red-500/10 text-red-400'
        }
      `}
    >
      {result}
    </span>
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

function formatVerification(status: VerificationStatus) {
  switch (status) {
    case 'verified':
      return 'V-TAG Verified'

    case 'verification-pending':
      return 'Verification Pending'

    case 'evidence-supplied':
      return 'Evidence Supplied'

    default:
      return 'Unverified'
  }
}

export default Timeline
