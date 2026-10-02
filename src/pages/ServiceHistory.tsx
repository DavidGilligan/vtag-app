import { useState } from 'react'
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Plus,
  Wrench,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'
import approvalShield from '../assets/ApprovalShield.png'

type ServiceRecord = {
  id: number
  date: string
  title: string
  garage: string
  items: string[]
  verificationStatus: 'verified' | 'evidence' | 'self-reported' | 'unverified'
  hasDocument?: boolean
}

const serviceRecords: ServiceRecord[] = [
  {
    id: 1,
    date: '12/03/2026',
    title: 'BMW Oil Service',
    garage: 'John Clark BMW Aberdeen',
    items: [
      'BMW TwinPower Turbo engine oil replaced.',
      'Oil filter replaced.',
      'Vehicle health check completed.',
      'Brake pads and discs inspected.',
      'Tyre condition and pressures checked.',
    ],
    verificationStatus: 'verified',
    hasDocument: true,
  },
  {
    id: 2,
    date: '18/05/2025',
    title: 'Scheduled Maintenance',
    garage: 'John Clark BMW Aberdeen',
    items: [
      'Cabin microfilter replaced.',
      'Brake fluid condition checked.',
      'Coolant level checked.',
      'BMW diagnostic scan completed with no major faults.',
    ],
    verificationStatus: 'verified',
    hasDocument: true,
  },
  {
    id: 3,
    date: '15/06/2022',
    title: 'Pre-Delivery Inspection',
    garage: 'BMW UK',
    items: [
      'Factory quality inspection completed.',
      'Software calibration completed.',
      'Vehicle preparation and handover inspection completed.',
    ],
    verificationStatus: 'verified',
    hasDocument: true,
  },
]

function ServiceHistory() {
  const { selectedVehicle } = useVehicles()
  const [expandedRecord, setExpandedRecord] = useState<number | null>(1)

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">SERVICING</p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its service history.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  const latestService = serviceRecords[0]

  function toggleRecord(id: number) {
    setExpandedRecord((current) => (current === id ? null : id))
  }

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">SERVICING</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Recorded maintenance and servicing history.
          </p>
        </section>

        {/* SERVICE SUMMARY */}
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
                  LATEST SERVICE
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {latestService.title}
                </h2>

                <p className="theme-muted mt-1 text-xs">{latestService.date}</p>

                <p className="theme-muted mt-1 text-xs">
                  {latestService.garage}
                </p>
              </div>

              <Wrench
                size={42}
                strokeWidth={1.2}
                className="shrink-0 text-[#c1f89f]"
              />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <SummaryValue
                  label="Records"
                  value={`${serviceRecords.length}`}
                />

                <SummaryValue label="Latest" value="12 Mar 2026" />

                <SummaryValue label="Verified" value="3" />

                <SummaryValue label="Documents" value="3" />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE RECORDS */}
        <section className="mt-7 px-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="theme-subtle text-xs tracking-widest">
                SERVICE RECORDS
              </p>

              <p className="theme-muted mt-1 text-xs">
                Tap a record to view maintenance details
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
              aria-label="Add service record"
            >
              <Plus size={19} strokeWidth={2} />
            </button>
          </div>

          <div className="mt-3 space-y-3">
            {serviceRecords.map((record) => (
              <ServiceRecordCard
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

interface ServiceRecordCardProps {
  record: ServiceRecord
  expanded: boolean
  onToggle: () => void
}

function ServiceRecordCard({
  record,
  expanded,
  onToggle,
}: ServiceRecordCardProps) {
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
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold">{record.title}</h2>

            {record.verificationStatus === 'verified' && (
              <img
                src={approvalShield}
                alt="V-TAG Verified"
                className="h-[16px] w-[16px] shrink-0 object-contain"
              />
            )}
          </div>

          <p className="mt-2 text-sm font-semibold">{record.date}</p>

          <p className="theme-muted mt-1 line-clamp-1 text-xs">
            {record.garage}
          </p>
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
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={16}
              strokeWidth={1.8}
              className="text-[#c1f89f]"
            />

            <p className="text-xs font-semibold text-[#c1f89f]">
              V-TAG VERIFIED
            </p>
          </div>

          {/* WORK COMPLETED */}
          <div className="mt-5">
            <p className="theme-subtle text-[10px] uppercase tracking-wider">
              Work Completed
            </p>

            <div className="mt-2 space-y-2">
              {record.items.map((item) => (
                <p key={item} className="theme-muted text-sm leading-relaxed">
                  • {item}
                </p>
              ))}
            </div>
          </div>

          {/* SERVICE PROVIDER */}
          <div className="mt-5">
            <p className="theme-subtle text-[10px] uppercase tracking-wider">
              Service Provider
            </p>

            <p className="mt-1 text-sm font-semibold">{record.garage}</p>
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
              VIEW VERIFIED DOCUMENT
            </button>
          )}
        </div>
      )}
    </article>
  )
}

export default ServiceHistory
