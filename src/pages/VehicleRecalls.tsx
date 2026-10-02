import {
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Wrench,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'

type RecallStatus = 'open' | 'action-required' | 'repair-completed' | 'resolved'

type RecallRecord = {
  id: string
  title: string
  reference?: string
  issuedDate?: string
  description?: string
  status: RecallStatus
  repairDate?: string
  repairProvider?: string
  documentId?: string
  verified: boolean
}

/*
 * No recall records are currently known for the development fixture.
 * Do not add manufacturer recalls here unless backed by a real source.
 */
const recallRecords: RecallRecord[] = []

function VehicleRecalls() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">RECALLS</p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its recall
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

  const openRecalls = recallRecords.filter(
    (recall) => recall.status === 'open' || recall.status === 'action-required',
  )

  const resolvedRecalls = recallRecords.filter(
    (recall) => recall.status === 'resolved',
  )

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">RECALLS</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Manufacturer recalls, remedial work and supporting vehicle records.
          </p>
        </section>

        {/* RECALL SUMMARY */}
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
                  RECALL STATUS
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                  {openRecalls.length > 0
                    ? 'Action Required'
                    : 'No Open Recalls'}
                </h2>

                <p className="theme-muted mt-2 text-xs">
                  Based on recalls currently recorded in V-TAG
                </p>
              </div>

              {openRecalls.length > 0 ? (
                <AlertTriangle
                  size={42}
                  strokeWidth={1.2}
                  className="shrink-0 text-yellow-400"
                />
              ) : (
                <ShieldCheck
                  size={42}
                  strokeWidth={1.2}
                  className="shrink-0 text-[#c1f89f]"
                />
              )}
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <SummaryValue
                  label="Recorded Recalls"
                  value={`${recallRecords.length}`}
                />

                <SummaryValue label="Open" value={`${openRecalls.length}`} />

                <SummaryValue
                  label="Resolved"
                  value={`${resolvedRecalls.length}`}
                />

                <SummaryValue label="Remedial Records" value="0" />
              </div>
            </div>
          </div>
        </section>

        {/* NO RECALLS */}
        {recallRecords.length === 0 && (
          <section className="mt-7 px-5">
            <div className="theme-card rounded-2xl p-5">
              <div
                className="
                  flex h-12 w-12
                  items-center justify-center
                  rounded-xl
                  bg-[#c1f89f]/10
                  text-[#c1f89f]
                "
              >
                <CheckCircle2 size={25} strokeWidth={1.6} />
              </div>

              <h2 className="mt-4 text-base font-bold">No recalls recorded</h2>

              <p className="theme-muted mt-2 text-sm leading-relaxed">
                V-TAG does not currently hold a recall record for this vehicle.
              </p>

              <div
                className="
                  mt-4
                  rounded-xl
                  border border-white/10
                  bg-white/[0.03]
                  p-3
                "
              >
                <p className="theme-muted text-xs leading-relaxed">
                  This does not guarantee that no manufacturer or safety recall
                  exists. Recall status should be checked against an appropriate
                  authoritative source when available.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* RECALL RECORDS */}
        {recallRecords.length > 0 && (
          <section className="mt-7 px-5">
            <p className="theme-subtle text-xs tracking-widest">
              RECALL RECORDS
            </p>

            <div className="mt-3 space-y-3">
              {recallRecords.map((recall) => (
                <RecallCard key={recall.id} recall={recall} />
              ))}
            </div>
          </section>
        )}

        {/* HOW V-TAG HANDLES RECALLS */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">RECALL RECORD</p>

          <div className="theme-card mt-3 rounded-2xl px-4">
            <ProcessRow
              icon={<AlertTriangle size={18} />}
              title="Recall Identified"
              description="Manufacturer recall is connected to the vehicle"
            />

            <ProcessRow
              icon={<Wrench size={18} />}
              title="Remedial Work"
              description="Required repair or replacement is completed"
            />

            <ProcessRow
              icon={<FileCheck2 size={18} />}
              title="Evidence"
              description="Supporting repair documentation is connected"
            />

            <ProcessRow
              icon={<CheckCircle2 size={18} />}
              title="Resolved"
              description="Recall remains in history with its resolution recorded"
              last
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

interface ProcessRowProps {
  icon: React.ReactNode
  title: string
  description: string
  last?: boolean
}

function ProcessRow({
  icon,
  title,
  description,
  last = false,
}: ProcessRowProps) {
  return (
    <div
      className={`
        flex gap-3 py-4
        ${last ? '' : 'border-b border-white/10'}
      `}
    >
      <div
        className="
          flex h-9 w-9
          shrink-0
          items-center justify-center
          rounded-xl
          bg-[#c1f89f]/10
          text-[#c1f89f]
        "
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold">{title}</p>

        <p className="theme-muted mt-1 text-xs leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

interface RecallCardProps {
  recall: RecallRecord
}

function RecallCard({ recall }: RecallCardProps) {
  return (
    <article className="theme-card rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle
          size={19}
          strokeWidth={1.7}
          className={
            recall.status === 'resolved'
              ? 'shrink-0 text-[#c1f89f]'
              : 'shrink-0 text-yellow-400'
          }
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold">{recall.title}</h2>

            {recall.verified && (
              <ShieldCheck size={15} className="shrink-0 text-[#c1f89f]" />
            )}
          </div>

          {recall.reference && (
            <p className="theme-muted mt-1 text-xs">{recall.reference}</p>
          )}

          {recall.description && (
            <p className="theme-muted mt-3 text-sm leading-relaxed">
              {recall.description}
            </p>
          )}

          <p className="mt-3 text-xs font-semibold">
            {formatRecallStatus(recall.status)}
          </p>
        </div>
      </div>
    </article>
  )
}

function formatRecallStatus(status: RecallStatus) {
  switch (status) {
    case 'open':
      return 'OPEN'

    case 'action-required':
      return 'ACTION REQUIRED'

    case 'repair-completed':
      return 'REPAIR COMPLETED'

    case 'resolved':
      return 'RESOLVED'

    default:
      return status
  }
}

export default VehicleRecalls
