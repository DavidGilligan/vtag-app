import { useState } from 'react'
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  ShieldCheck,
  XCircle,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'
import approvalShield from '../assets/ApprovalShield.png'

type VerificationStatus =
  | 'unverified'
  | 'evidence-supplied'
  | 'verification-pending'
  | 'verified'
  | 'verification-rejected'

type MotRecord = {
  id: number
  date: string
  status: 'PASS' | 'FAIL'
  garage: string
  mileage: string
  details: string[]
  verificationStatus: VerificationStatus
  hasDocument?: boolean
}

const motRecords: MotRecord[] = [
  {
    id: 1,
    date: '10/05/2026',
    status: 'PASS',
    garage: 'John Clark BMW Aberdeen',
    mileage: '7,999',
    details: ['Advisory: front tyres close to legal tread depth limit.'],
    verificationStatus: 'verified',
    hasDocument: true,
  },
  {
    id: 2,
    date: '10/05/2026',
    status: 'FAIL',
    garage: 'John Clark BMW Aberdeen',
    mileage: '7,999',
    details: [
      'Major defect: windscreen wiper not clearing the windscreen effectively.',
      'Advisory: front tyres close to legal tread depth limit.',
    ],
    verificationStatus: 'verified',
    hasDocument: true,
  },
  {
    id: 3,
    date: '10/05/2025',
    status: 'PASS',
    garage: 'John Clark BMW Aberdeen',
    mileage: '4,101',
    details: ['No advisories recorded.'],
    verificationStatus: 'verified',
    hasDocument: true,
  },
]

function MotHistory() {
  const { selectedVehicle } = useVehicles()

  const [expandedRecord, setExpandedRecord] = useState<number | null>(1)

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">MOT HISTORY</p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its MOT history.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  const latestMot = motRecords[0]

  const passedTests = motRecords.filter(
    (record) => record.status === 'PASS',
  ).length

  const failedTests = motRecords.filter(
    (record) => record.status === 'FAIL',
  ).length

  const verifiedTests = motRecords.filter(
    (record) => record.verificationStatus === 'verified',
  ).length

  function toggleRecord(id: number) {
    setExpandedRecord((current) => (current === id ? null : id))
  }

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">MOT HISTORY</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            MOT tests, results, mileage and verified vehicle records.
          </p>
        </section>

        {/* MOT SUMMARY */}
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
                  LATEST MOT
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <p className="text-3xl font-bold">{latestMot.status}</p>

                  {latestMot.status === 'PASS' ? (
                    <CheckCircle2
                      size={22}
                      strokeWidth={1.8}
                      className="text-[#c1f89f]"
                    />
                  ) : (
                    <XCircle
                      size={22}
                      strokeWidth={1.8}
                      className="text-red-400"
                    />
                  )}
                </div>

                <p className="theme-muted mt-2 text-xs">{latestMot.date}</p>
              </div>

              <ShieldCheck
                size={42}
                strokeWidth={1.2}
                className="text-[#c1f89f]"
              />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <SummaryValue
                  label="Mileage"
                  value={`${latestMot.mileage} mi`}
                />

                <SummaryValue
                  label="Tests Recorded"
                  value={`${motRecords.length}`}
                />

                <SummaryValue label="Passed" value={`${passedTests}`} />

                <SummaryValue
                  label="V-TAG Verified"
                  value={`${verifiedTests}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* MOT RECORDS */}
        <section className="mt-7 px-5">
          <div>
            <p className="theme-subtle text-xs tracking-widest">MOT RECORDS</p>

            <p className="theme-muted mt-1 text-xs">
              Tap a record to view test details and supporting evidence
            </p>
          </div>

          <div className="mt-3 space-y-3">
            {motRecords.map((record) => (
              <MotRecordCard
                key={record.id}
                record={record}
                expanded={expandedRecord === record.id}
                onToggle={() => toggleRecord(record.id)}
              />
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

interface MotRecordCardProps {
  record: MotRecord
  expanded: boolean
  onToggle: () => void
}

function MotRecordCard({ record, expanded, onToggle }: MotRecordCardProps) {
  const passed = record.status === 'PASS'

  return (
    <article
      className="
        theme-card
        overflow-hidden
        rounded-2xl
      "
    >
      <button
        type="button"
        onClick={onToggle}
        className="
          flex w-full
          items-center justify-between
          gap-4
          p-4
          text-left
        "
      >
        <div className="min-w-0">
          {/* RESULT + VERIFICATION */}
          <div className="flex items-center gap-2">
            {passed ? (
              <CheckCircle2
                size={17}
                strokeWidth={1.8}
                className="shrink-0 text-[#c1f89f]"
              />
            ) : (
              <XCircle
                size={17}
                strokeWidth={1.8}
                className="shrink-0 text-red-400"
              />
            )}

            <p
              className={
                passed
                  ? 'text-sm font-bold text-[#c1f89f]'
                  : 'text-sm font-bold text-red-400'
              }
            >
              {record.status}
            </p>

            {record.verificationStatus === 'verified' && (
              <img
                src={approvalShield}
                alt="V-TAG Verified"
                className="h-[16px] w-[16px] shrink-0 object-contain"
              />
            )}
          </div>

          <p className="mt-2 text-sm font-semibold">{record.date}</p>

          <p className="theme-muted mt-1 text-xs">{record.mileage} miles</p>
        </div>

        <div className="shrink-0">
          {expanded ? (
            <ChevronUp size={19} className="theme-subtle" />
          ) : (
            <ChevronDown size={19} className="theme-subtle" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-white/10 px-4 pb-4 pt-4">
          {/* VERIFICATION */}
          <VerificationState status={record.verificationStatus} />

          {/* GARAGE */}
          <div className="mt-5">
            <p className="theme-subtle text-[10px] uppercase tracking-wider">
              Completed At
            </p>

            <p className="mt-1 text-sm font-semibold">{record.garage}</p>
          </div>

          {/* DETAILS */}
          <div className="mt-5">
            <p className="theme-subtle text-[10px] uppercase tracking-wider">
              Test Details
            </p>

            <div className="mt-2 space-y-2">
              {record.details.map((detail) => (
                <p key={detail} className="theme-muted text-sm leading-relaxed">
                  • {detail}
                </p>
              ))}
            </div>
          </div>

          {/* SUPPORTING DOCUMENT */}
          {record.hasDocument && (
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

              {record.verificationStatus === 'verified'
                ? 'VIEW VERIFIED DOCUMENT'
                : 'VIEW SUPPORTING DOCUMENT'}
            </button>
          )}
        </div>
      )}
    </article>
  )
}

interface VerificationStateProps {
  status: VerificationStatus
}

function VerificationState({ status }: VerificationStateProps) {
  if (status === 'verified') {
    return (
      <div className="flex items-center gap-2">
        <img
          src={approvalShield}
          alt=""
          aria-hidden="true"
          className="h-[16px] w-[16px] object-contain"
        />

        <p className="text-xs font-semibold text-[#c1f89f]">V-TAG VERIFIED</p>
      </div>
    )
  }

  if (status === 'verification-pending') {
    return (
      <p className="text-xs font-semibold text-yellow-400">
        VERIFICATION PENDING
      </p>
    )
  }

  if (status === 'evidence-supplied') {
    return (
      <p className="theme-muted text-xs font-semibold">EVIDENCE SUPPLIED</p>
    )
  }

  if (status === 'verification-rejected') {
    return (
      <p className="text-xs font-semibold text-red-400">
        VERIFICATION NOT APPROVED
      </p>
    )
  }

  return <p className="theme-subtle text-xs font-semibold">UNVERIFIED</p>
}

export default MotHistory
