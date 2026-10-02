import { useState } from 'react'
import {
  Camera,
  ChevronDown,
  ChevronUp,
  FileText,
  Plus,
  ReceiptText,
  Settings,
  Store,
  UserRound,
  Wrench,
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

type InstallationType = 'professional' | 'self-installed' | 'unknown'

type ModificationRecord = {
  id: number
  title: string
  category: string
  date: string
  manufacturer?: string
  supplier?: string
  installer?: string
  installationType: InstallationType
  verificationStatus: VerificationStatus
  description?: string
  evidence: {
    invoice: boolean
    receipt: boolean
    photos: boolean
    document: boolean
  }
}

const modifications: ModificationRecord[] = [
  {
    id: 1,
    title: 'Remus Cat-Back Exhaust',
    category: 'Exhaust',
    date: '12/08/2025',
    manufacturer: 'Remus',
    supplier: 'Performance Centre Aberdeen',
    installer: 'Performance Centre Aberdeen',
    installationType: 'professional',
    verificationStatus: 'verified',
    description: 'Aftermarket cat-back exhaust system installed.',
    evidence: {
      invoice: true,
      receipt: false,
      photos: true,
      document: true,
    },
  },
  {
    id: 2,
    title: 'MST Performance Intake',
    category: 'Engine & Intake',
    date: '22/09/2025',
    manufacturer: 'MST Performance',
    supplier: 'MST Performance',
    installer: 'Vehicle Owner',
    installationType: 'self-installed',
    verificationStatus: 'evidence-supplied',
    description: 'Aftermarket performance intake fitted by the vehicle owner.',
    evidence: {
      invoice: false,
      receipt: true,
      photos: true,
      document: false,
    },
  },
]

function VehicleModifications() {
  const { selectedVehicle } = useVehicles()

  const [expandedRecord, setExpandedRecord] = useState<number | null>(1)

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">
              MODIFICATIONS
            </p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its modifications.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  const verifiedCount = modifications.filter(
    (modification) => modification.verificationStatus === 'verified',
  ).length

  const evidenceCount = modifications.filter(
    (modification) =>
      modification.evidence.invoice ||
      modification.evidence.receipt ||
      modification.evidence.photos ||
      modification.evidence.document,
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
          <p className="theme-subtle text-xs tracking-widest">MODIFICATIONS</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Vehicle upgrades, alterations and supporting evidence.
          </p>
        </section>

        {/* SUMMARY */}
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
                  VEHICLE MODIFICATIONS
                </p>

                <p className="mt-1 text-3xl font-bold">
                  {modifications.length}
                </p>

                <p className="theme-muted mt-2 text-xs">
                  Recorded modifications
                </p>
              </div>

              <Settings
                size={42}
                strokeWidth={1.2}
                className="text-[#c1f89f]"
              />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <SummaryValue
                  label="V-TAG Verified"
                  value={`${verifiedCount}`}
                />

                <SummaryValue
                  label="With Evidence"
                  value={`${evidenceCount}`}
                />

                <SummaryValue label="Professional" value="1" />

                <SummaryValue label="Self-Installed" value="1" />
              </div>
            </div>
          </div>
        </section>

        {/* MODIFICATION RECORDS */}
        <section className="mt-7 px-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="theme-subtle text-xs tracking-widest">
                MODIFICATION RECORDS
              </p>

              <p className="theme-muted mt-1 text-xs">
                Recorded alterations made to this vehicle
              </p>
            </div>

            <button
              type="button"
              className="
                flex h-9 w-9
                shrink-0
                items-center justify-center
                rounded-full
                bg-[#c1f89f]
                text-black
                transition
                active:scale-[0.95]
              "
              aria-label="Add modification"
            >
              <Plus size={19} strokeWidth={2} />
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {modifications.map((modification) => (
              <ModificationCard
                key={modification.id}
                modification={modification}
                expanded={expandedRecord === modification.id}
                onToggle={() => toggleRecord(modification.id)}
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

interface ModificationCardProps {
  modification: ModificationRecord
  expanded: boolean
  onToggle: () => void
}

function ModificationCard({
  modification,
  expanded,
  onToggle,
}: ModificationCardProps) {
  return (
    <article className="theme-card overflow-hidden rounded-2xl">
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
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold">{modification.title}</h2>

            {modification.verificationStatus === 'verified' && (
              <img
                src={approvalShield}
                alt="V-TAG Verified"
                className="h-[16px] w-[16px] shrink-0 object-contain"
              />
            )}
          </div>

          <p className="theme-muted mt-1 text-xs">{modification.category}</p>

          <p className="mt-2 text-sm font-semibold">{modification.date}</p>
        </div>

        {expanded ? (
          <ChevronUp size={19} className="theme-subtle shrink-0" />
        ) : (
          <ChevronDown size={19} className="theme-subtle shrink-0" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-white/10 px-4 pb-4 pt-4">
          {/* VERIFICATION */}
          <VerificationState status={modification.verificationStatus} />

          {/* DESCRIPTION */}
          {modification.description && (
            <div className="mt-5">
              <p className="theme-subtle text-[10px] uppercase tracking-wider">
                Modification
              </p>

              <p className="theme-muted mt-1 text-sm leading-relaxed">
                {modification.description}
              </p>
            </div>
          )}

          {/* INSTALLATION */}
          <div className="mt-5">
            <p className="theme-subtle text-[10px] uppercase tracking-wider">
              Installation
            </p>

            <div className="mt-2 flex items-center gap-2">
              {modification.installationType === 'professional' ? (
                <Store size={16} className="text-[#c1f89f]" />
              ) : (
                <UserRound size={16} className="theme-muted" />
              )}

              <p className="text-sm font-semibold">
                {modification.installationType === 'professional'
                  ? 'Professionally Installed'
                  : modification.installationType === 'self-installed'
                    ? 'Self-Installed'
                    : 'Installation Unknown'}
              </p>
            </div>

            {modification.installer && (
              <p className="theme-muted mt-1 text-xs">
                {modification.installer}
              </p>
            )}
          </div>

          {/* MANUFACTURER */}
          {modification.manufacturer && (
            <div className="mt-5">
              <p className="theme-subtle text-[10px] uppercase tracking-wider">
                Manufacturer
              </p>

              <p className="mt-1 text-sm font-semibold">
                {modification.manufacturer}
              </p>
            </div>
          )}

          {/* SUPPLIER */}
          {modification.supplier && (
            <div className="mt-5">
              <p className="theme-subtle text-[10px] uppercase tracking-wider">
                Supplier
              </p>

              <p className="mt-1 text-sm font-semibold">
                {modification.supplier}
              </p>
            </div>
          )}

          {/* EVIDENCE */}
          <div className="mt-5">
            <p className="theme-subtle text-[10px] uppercase tracking-wider">
              Supporting Evidence
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {modification.evidence.invoice && (
                <EvidenceItem icon={<FileText size={15} />} label="Invoice" />
              )}

              {modification.evidence.receipt && (
                <EvidenceItem
                  icon={<ReceiptText size={15} />}
                  label="Receipt"
                />
              )}

              {modification.evidence.photos && (
                <EvidenceItem icon={<Camera size={15} />} label="Photos" />
              )}

              {modification.evidence.document && (
                <EvidenceItem icon={<FileText size={15} />} label="Document" />
              )}
            </div>
          </div>

          {/* DOCUMENT BUTTON */}
          {(modification.evidence.invoice ||
            modification.evidence.receipt ||
            modification.evidence.photos ||
            modification.evidence.document) && (
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
              VIEW SUPPORTING EVIDENCE
            </button>
          )}
        </div>
      )}
    </article>
  )
}

interface EvidenceItemProps {
  icon: React.ReactNode
  label: string
}

function EvidenceItem({ icon, label }: EvidenceItemProps) {
  return (
    <div
      className="
        theme-card-secondary
        flex items-center
        gap-2
        rounded-xl
        px-3 py-2.5
      "
    >
      <span className="text-[#c1f89f]">{icon}</span>

      <span className="text-xs font-semibold">{label}</span>
    </div>
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

export default VehicleModifications
