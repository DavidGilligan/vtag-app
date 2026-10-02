import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Fingerprint,
  History,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'
import approvalShield from '../assets/ApprovalShield.png'

function VehicleRecord() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">
              VEHICLE RECORD
            </p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its record.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">VEHICLE RECORD</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Registration, identity, ownership and V-TAG record.
          </p>
        </section>

        {/* RECORD STATUS */}
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
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="theme-subtle text-[10px] uppercase tracking-wider">
                  V-TAG VEHICLE RECORD
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <p className="text-xl font-bold">V-1059403</p>

                  {selectedVehicle.verificationStatus === 'verified' && (
                    <img
                      src={approvalShield}
                      alt="Verified"
                      className="h-[17px] w-[17px] object-contain"
                    />
                  )}
                </div>

                <p className="theme-muted mt-1 text-xs">Only visible to you</p>
              </div>

              <Fingerprint
                size={42}
                strokeWidth={1.2}
                className="text-[#c1f89f]"
              />
            </div>
          </div>
        </section>

        {/* KEY INFORMATION */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            KEY INFORMATION
          </p>

          <div className="theme-card mt-3 overflow-hidden rounded-3xl px-5">
            <RecordRow
              label="Current Registration"
              value={selectedVehicle.registration}
            />

            <RecordRow label="Original Registration" value="MA22 RDE" />

            <RecordRow
              label="VIN"
              value={selectedVehicle.vin || 'VIN65165498'}
            />

            <RecordRow label="V-TAG Reference" value="V-1059403" />

            <RecordRow label="First Registration" value="May 2022" />

            <RecordRow label="Origin Country" value="Scotland" last />
          </div>
        </section>

        {/* RECORDS */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">RECORDS</p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <RecordLink
              icon={<UserRound size={25} strokeWidth={1.6} />}
              title="Ownership"
              description="Current and previous ownership"
              to="/vehicle-identity/record/ownership"
            />

            <RecordLink
              icon={<History size={25} strokeWidth={1.6} />}
              title="Registration History"
              description="Registration and plate changes"
              to="/vehicle-identity/record/registration-history"
            />

            <RecordLink
              icon={<Fingerprint size={25} strokeWidth={1.6} />}
              title="V-TAG Record"
              description="Vehicle identity and V-TAG data"
              to="/vehicle-identity/record/vtag"
            />

            <RecordLink
              icon={<ShieldCheck size={25} strokeWidth={1.6} />}
              title="Verification"
              description="Identity and record verification"
              to="/vehicle-identity/record/verification"
            />
          </div>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

interface RecordRowProps {
  label: string
  value?: string
  last?: boolean
}

function RecordRow({ label, value, last = false }: RecordRowProps) {
  return (
    <div
      className={`
        flex items-center justify-between gap-5
        py-4
        ${last ? '' : 'border-b border-white/10'}
      `}
    >
      <p className="theme-muted text-sm">{label}</p>

      <p className="max-w-[58%] break-words text-right text-sm font-semibold">
        {value || 'Not recorded'}
      </p>
    </div>
  )
}

interface RecordLinkProps {
  icon: ReactNode
  title: string
  description: string
  to: string
}

function RecordLink({ icon, title, description, to }: RecordLinkProps) {
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

export default VehicleRecord
