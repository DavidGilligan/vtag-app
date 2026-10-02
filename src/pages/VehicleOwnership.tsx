import type { ReactNode } from 'react'
import {
  CalendarDays,
  CarFront,
  ChevronRight,
  Clock3,
  FileText,
  History,
  ShieldCheck,
  UserCheck,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'

type OwnershipStatus = 'current' | 'previous' | 'pending-transfer'

type OwnershipVerification =
  | 'unverified'
  | 'evidence-supplied'
  | 'verification-pending'
  | 'verified'

type OwnershipRecord = {
  id: string
  status: OwnershipStatus
  startedAt?: string
  endedAt?: string
  acquisitionType?: string
  verificationStatus: OwnershipVerification
  supportingDocumentId?: string
}

/*
 * Prototype ownership record.
 *
 * Real ownership data should come from the backend relationship
 * between User -> Ownership -> Vehicle.
 */
const ownershipRecords: OwnershipRecord[] = [
  {
    id: 'ownership-current',
    status: 'current',
    startedAt: 'Not recorded',
    acquisitionType: 'Not recorded',
    verificationStatus: 'unverified',
  },
]

function VehicleOwnership() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">OWNERSHIP</p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its ownership record.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  const currentOwnership = ownershipRecords.find(
    (record) => record.status === 'current',
  )

  const previousOwnership = ownershipRecords.filter(
    (record) => record.status === 'previous',
  )

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">OWNERSHIP</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Current ownership relationship and vehicle ownership history.
          </p>
        </section>

        {/* CURRENT OWNERSHIP */}
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
                  CURRENT OWNERSHIP
                </p>

                <h2 className="mt-1 text-3xl font-bold">Current Keeper</h2>

                <div className="mt-2 flex items-center gap-2">
                  <UserCheck
                    size={15}
                    strokeWidth={1.8}
                    className="text-[#c1f89f]"
                  />

                  <p className="text-xs font-semibold text-[#c1f89f]">
                    CONNECTED TO YOUR V-TAG
                  </p>
                </div>
              </div>

              <ShieldCheck
                size={42}
                strokeWidth={1.2}
                className="shrink-0 text-[#c1f89f]"
              />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <SummaryValue
                  label="Ownership Since"
                  value={currentOwnership?.startedAt || 'Not recorded'}
                />

                <SummaryValue
                  label="Acquired"
                  value={currentOwnership?.acquisitionType || 'Not recorded'}
                />

                <SummaryValue
                  label="Previous Records"
                  value={`${previousOwnership.length}`}
                />

                <SummaryValue
                  label="Verification"
                  value={formatVerification(
                    currentOwnership?.verificationStatus || 'unverified',
                  )}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CURRENT RECORD */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            OWNERSHIP RECORD
          </p>

          <div className="theme-card mt-3 rounded-2xl px-4">
            <InformationRow
              icon={<CarFront size={18} />}
              label="Vehicle"
              value={vehicleName}
            />

            <InformationRow
              icon={<UserCheck size={18} />}
              label="Relationship"
              value="Current Keeper"
            />

            <InformationRow
              icon={<CalendarDays size={18} />}
              label="Ownership Started"
              value={currentOwnership?.startedAt || 'Not recorded'}
            />

            <InformationRow
              icon={<History size={18} />}
              label="Acquisition"
              value={currentOwnership?.acquisitionType || 'Not recorded'}
            />

            <InformationRow
              icon={<ShieldCheck size={18} />}
              label="V-TAG Verification"
              value={formatVerification(
                currentOwnership?.verificationStatus || 'unverified',
              )}
              last
            />
          </div>
        </section>

        {/* OWNERSHIP HISTORY */}
        <section className="mt-7 px-5">
          <div className="flex items-center justify-between gap-3">
            <p className="theme-subtle text-xs tracking-widest">
              OWNERSHIP HISTORY
            </p>

            <p className="theme-subtle text-xs">
              {ownershipRecords.length}{' '}
              {ownershipRecords.length === 1 ? 'record' : 'records'}
            </p>
          </div>

          <div className="mt-3 space-y-3">
            <OwnershipHistoryCard
              title="Current Ownership"
              period={
                currentOwnership?.startedAt
                  ? `${currentOwnership.startedAt} – Present`
                  : 'Present'
              }
              status="CURRENT"
              verificationStatus={
                currentOwnership?.verificationStatus || 'unverified'
              }
            />

            {previousOwnership.map((record) => (
              <OwnershipHistoryCard
                key={record.id}
                title="Previous Ownership"
                period={`${record.startedAt || 'Unknown'} – ${
                  record.endedAt || 'Unknown'
                }`}
                status="PREVIOUS"
                verificationStatus={record.verificationStatus}
              />
            ))}

            {previousOwnership.length === 0 && (
              <div
                className="
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  p-4
                "
              >
                <div className="flex gap-3">
                  <Clock3
                    size={19}
                    strokeWidth={1.6}
                    className="theme-subtle shrink-0"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      No previous ownership records
                    </p>

                    <p className="theme-muted mt-1 text-xs leading-relaxed">
                      Previous keeper details have not been recorded in V-TAG.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* OWNERSHIP ACTIONS */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            OWNERSHIP MANAGEMENT
          </p>

          <div className="mt-3 space-y-3">
            <ActionCard
              icon={<FileText size={22} />}
              title="Ownership Evidence"
              description="View documents supporting the current ownership record"
              to="/vehicle-identity/documents/ownership"
            />

            <ActionCard
              icon={<Users size={22} />}
              title="Transfer Vehicle"
              description="Transfer this V-TAG vehicle record to its next keeper"
              to="/vehicle-identity/record/ownership/transfer"
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

interface InformationRowProps {
  icon: ReactNode
  label: string
  value: string
  last?: boolean
}

function InformationRow({
  icon,
  label,
  value,
  last = false,
}: InformationRowProps) {
  return (
    <div
      className={`
        flex items-center gap-3 py-4
        ${last ? '' : 'border-b border-white/10'}
      `}
    >
      <div className="shrink-0 text-[#c1f89f]">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="theme-subtle text-[10px] uppercase tracking-wider">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold">{value}</p>
      </div>
    </div>
  )
}

interface OwnershipHistoryCardProps {
  title: string
  period: string
  status: string
  verificationStatus: OwnershipVerification
}

function OwnershipHistoryCard({
  title,
  period,
  status,
  verificationStatus,
}: OwnershipHistoryCardProps) {
  return (
    <div className="theme-card rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div
          className="
            flex h-10 w-10
            shrink-0
            items-center justify-center
            rounded-xl
            bg-[#c1f89f]/10
            text-[#c1f89f]
          "
        >
          <UserCheck size={20} strokeWidth={1.6} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold">{title}</p>

            <span className="text-[10px] font-bold text-[#c1f89f]">
              {status}
            </span>
          </div>

          <p className="theme-muted mt-1 text-xs">{period}</p>

          <p className="theme-subtle mt-2 text-[10px] font-semibold">
            {formatVerification(verificationStatus)}
          </p>
        </div>
      </div>
    </div>
  )
}

interface ActionCardProps {
  icon: ReactNode
  title: string
  description: string
  to: string
}

function ActionCard({ icon, title, description, to }: ActionCardProps) {
  return (
    <Link
      to={to}
      className="
        theme-card
        flex items-center gap-4
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
        <p className="text-sm font-bold">{title}</p>

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

function formatVerification(status: OwnershipVerification) {
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

export default VehicleOwnership
