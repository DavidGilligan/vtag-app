import { useState } from 'react'
import {
  Copy,
  Lock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Wrench,
  Gauge,
} from 'lucide-react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import carProfile from '../assets/BMWIMG9.png'

type MotRecord = {
  id: number
  date: string
  status: 'PASS' | 'FAIL'
  garage: string
  mileage: string
  details: string[]
}

const motRecords: MotRecord[] = [
  {
    id: 1,
    date: '10/05/2026',
    status: 'PASS',
    garage: 'John Clark BMW Aberdeen',
    mileage: '7,999',
    details: ['Advisory: front tyres close to legal tread depth limit.'],
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
  },
  {
    id: 3,
    date: '10/05/2025',
    status: 'PASS',
    garage: 'John Clark BMW Aberdeen',
    mileage: '4,101',
    details: ['No advisories recorded.'],
  },
]

const serviceRecords = [
  {
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
  },
  {
    date: '18/05/2025',
    title: 'Scheduled Maintenance',
    garage: 'John Clark BMW Aberdeen',
    items: [
      'Cabin microfilter replaced.',
      'Brake fluid condition checked.',
      'Coolant level checked.',
      'BMW diagnostic scan completed with no major faults.',
    ],
  },
  {
    date: '15/06/2022',
    title: 'Pre-Delivery Inspection',
    garage: 'BMW UK',
    items: [
      'Factory quality inspection completed.',
      'Software calibration completed.',
      'Vehicle preparation and handover inspection completed.',
    ],
  },
]

const modifications = [
  {
    title: 'Remus Cat-Back Exhaust',
    date: '12/08/2025',
    supplier: 'Performance Centre Aberdeen',
    status: 'Verified',
  },
  {
    title: 'MST Performance Intake',
    date: '22/09/2025',
    supplier: 'MST Performance',
    status: 'Verified',
  },
]

function VehicleIdentity() {
  const [copied, setCopied] = useState(false)
  const [openMotId, setOpenMotId] = useState<number | null>(1)

  async function copyReference() {
    await navigator.clipboard.writeText('V-1059403')
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">
            VEHICLE IDENTITY
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            BMW M135i
          </h1>

          <p className="theme-muted mt-2 text-sm">
            Verified vehicle profile, ownership record and public history.
          </p>
        </section>

        <section className="mt-6 px-5">
          <div className="theme-card overflow-hidden rounded-3xl">
            <img
              src={carProfile}
              alt="BMW M135i profile"
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold">BMW M135i</h2>

                  <p className="theme-muted mt-2 text-sm">
                    Registration: AB12 CDE
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-green-900/30 px-3 py-2 text-xs font-semibold text-green-400">
                  <ShieldCheck size={14} />
                  VERIFIED
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3">
                <InfoTile label="First Registration" value="May 2022" />
                <InfoTile label="Origin Country" value="Scotland" />
                <InfoTile label="Manufactured Country" value="Germany" />

                <div className="theme-card-secondary rounded-2xl p-4">
                  <p className="theme-subtle text-xs tracking-widest">
                    WARRANTY
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        BMW New Vehicle Warranty
                      </p>

                      <p className="theme-muted mt-1 text-sm">
                        Expired 10 May 2025
                      </p>
                    </div>

                    <span className="rounded-full bg-red-900/30 px-3 py-2 text-xs font-semibold text-red-400">
                      EXPIRED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 px-5">
          <div className="theme-card rounded-3xl p-5">
            <div className="mb-4 flex items-center gap-2">
              <Lock size={18} />
              <div>
                <h2 className="font-bold">Private Owner Data</h2>
                <p className="theme-muted text-sm">
                  Only visible to you
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="theme-card-secondary rounded-2xl p-4">
                <p className="theme-subtle text-xs tracking-widest">
                  V-TAG REFERENCE NUMBER
                </p>

                <button
                  onClick={copyReference}
                  className="mt-2 flex w-full items-center justify-between rounded-xl border border-dashed theme-border px-4 py-3 font-bold"
                >
                  <span>V-1059403</span>
                  <Copy size={18} />
                </button>

                {copied && (
                  <p className="mt-2 text-sm text-green-400">
                    Copied to clipboard
                  </p>
                )}
              </div>

              <div className="theme-card-secondary rounded-2xl p-4">
                <p className="theme-subtle text-xs tracking-widest">
                  CONDITION
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xl font-bold">Excellent</p>
                  <p className="theme-muted text-sm">5 / 5</p>
                </div>

                <div className="mt-4 grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((segment) => (
                    <div
                      key={segment}
                      className="h-3 rounded-full bg-green-400"
                    />
                  ))}
                </div>
              </div>

              <InfoTile label="Estimated Valuation" value="£24,995" />
              <InfoTile label="Original Registration" value="MA22 RDE" />
              <InfoTile label="VIN Registration" value="VIN65165498" />

              <ScaleTile
                title="Road Tax (VED)"
                value="£640"
                detail="177 g/km"
                leftLabel="Lowest"
                rightLabel="Highest"
                percentage={78}
              />

              <ScaleTile
                title="Insurance Band"
                value="36E"
                detail="Band 1-50"
                leftLabel="1"
                rightLabel="50"
                percentage={72}
              />
            </div>
          </div>
        </section>

        <section className="mt-6 px-5">
          <div className="theme-card rounded-3xl p-5">
            <div className="mb-4 flex items-center gap-2">
              <Gauge size={20} />
              <h2 className="font-bold">Mileage</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InfoTile label="Current Mileage" value="10,552 mi" />
              <InfoTile label="Since Last MOT" value="2,553 mi" />
            </div>

            <div className="mt-5 flex items-center justify-center">
              <div
                className="relative h-40 w-40 rounded-full"
                style={{
                  background:
                    'conic-gradient(#22c55e 0deg 273deg, #f97316 273deg 360deg)',
                }}
              >
                <div className="theme-card absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full">
                  <p className="text-lg font-bold">10,552</p>
                  <p className="theme-muted text-xs">miles</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-center gap-5 text-sm">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="theme-muted">7,999 at MOT</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-orange-500" />
                <span className="theme-muted">+2,553 added</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 px-5">
          <SectionTitle title="MOT Details" subtitle="Tap a record to expand" />

          <div className="mt-3 space-y-3">
            {motRecords.map((record) => {
              const isOpen = openMotId === record.id

              return (
                <div key={record.id} className="theme-card rounded-3xl p-5">
                  <button
                    onClick={() => setOpenMotId(isOpen ? null : record.id)}
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <div>
                      <p className="font-bold">MOT: {record.date}</p>
                      <p className="theme-muted mt-1 text-sm">
                        Mileage: {record.mileage}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-2 text-xs font-semibold ${
                          record.status === 'PASS'
                            ? 'bg-green-900/30 text-green-400'
                            : 'bg-red-900/30 text-red-400'
                        }`}
                      >
                        {record.status}
                      </span>

                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-5 space-y-3">
                      <InfoTile label="Completed at" value={record.garage} />

                      <div className="theme-card-secondary rounded-2xl p-4">
                        <p className="theme-subtle text-xs tracking-widest">
                          DETAILS
                        </p>

                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                          {record.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      </div>

                      <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 font-bold text-black">
                        <FileText size={18} />
                        See Document
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-6 px-5">
          <SectionTitle title="Servicing" subtitle="Recorded maintenance history" />

          <div className="mt-3 space-y-3">
            {serviceRecords.map((service) => (
              <div key={service.date} className="theme-card rounded-3xl p-5">
                <div className="flex items-start gap-3">
                  <div className="theme-card-secondary rounded-xl p-3">
                    <Wrench size={20} />
                  </div>

                  <div>
                    <p className="theme-subtle text-xs tracking-widest">
                      {service.date}
                    </p>

                    <h3 className="mt-1 font-bold">{service.title}</h3>

                    <p className="theme-muted mt-1 text-sm">
                      {service.garage}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 px-5">
          <SectionTitle title="Modifications" subtitle="Verified vehicle upgrades" />

          <div className="mt-3 space-y-3">
            {modifications.map((modification) => (
              <div key={modification.title} className="theme-card rounded-3xl p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold">{modification.title}</h3>

                  <span className="rounded-full bg-green-900/30 px-3 py-2 text-xs font-semibold text-green-400">
                    {modification.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  <InfoTile label="Installed" value={modification.date} />
                  <InfoTile label="Supplier" value={modification.supplier} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

type InfoTileProps = {
  label: string
  value: string
}

function InfoTile({ label, value }: InfoTileProps) {
  return (
    <div className="theme-card-secondary rounded-2xl p-4">
      <p className="theme-subtle text-xs tracking-widest">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  )
}

type ScaleTileProps = {
  title: string
  value: string
  detail: string
  leftLabel: string
  rightLabel: string
  percentage: number
}

function ScaleTile({
  title,
  value,
  detail,
  leftLabel,
  rightLabel,
  percentage,
}: ScaleTileProps) {
  return (
    <div className="theme-card-secondary rounded-2xl p-4">
      <p className="theme-subtle text-xs tracking-widest">
        {title}
      </p>

      <div className="mt-2 flex items-end justify-between">
        <div>
          <p className="text-xl font-bold">{value}</p>
          <p className="theme-muted text-sm">{detail}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="relative h-3 rounded-full bg-zinc-700/40">
          <div
            className="absolute left-0 top-0 h-3 rounded-full bg-orange-500"
            style={{ width: `${percentage}%` }}
          />

          <div
            className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow"
            style={{ left: `calc(${percentage}% - 10px)` }}
          />
        </div>

        <div className="theme-muted mt-2 flex justify-between text-xs">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      </div>
    </div>
  )
}

type SectionTitleProps = {
  title: string
  subtitle: string
}

function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div>
      <p className="theme-subtle text-xs tracking-widest">
        {title.toUpperCase()}
      </p>

      <h2 className="mt-1 text-2xl font-bold">
        {title}
      </h2>

      <p className="theme-muted mt-1 text-sm">
        {subtitle}
      </p>
    </div>
  )
}

export default VehicleIdentity