import type { ReactNode } from 'react'
import {
  CalendarDays,
  CarFront,
  CheckCircle2,
  FileText,
  Fingerprint,
  History,
  ShieldCheck,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'

type RegistrationVerification =
  | 'unverified'
  | 'evidence-supplied'
  | 'verification-pending'
  | 'verified'

type RegistrationRecord = {
  id: string
  registration: string
  startedAt?: string
  endedAt?: string
  current: boolean
  original: boolean
  verificationStatus: RegistrationVerification
  supportingDocumentId?: string
}

/*
 * Prototype registration history.
 *
 * Current registration comes from the selected vehicle.
 * MA22 RDE is existing V-TAG prototype data for the original
 * registration.
 *
 * Do not invent intermediate plate changes.
 */
function VehicleRegistrationHistory() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">
              REGISTRATION HISTORY
            </p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its registration
                history.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  const currentRegistration = selectedVehicle.registration || 'Not recorded'

  const registrationRecords: RegistrationRecord[] = [
    {
      id: 'registration-current',
      registration: currentRegistration,
      current: true,
      original: currentRegistration === 'MA22 RDE',
      verificationStatus: 'unverified',
    },
  ]

  if (
    currentRegistration !== 'Not recorded' &&
    currentRegistration !== 'MA22 RDE'
  ) {
    registrationRecords.push({
      id: 'registration-original',
      registration: 'MA22 RDE',
      startedAt: 'May 2022',
      current: false,
      original: true,
      verificationStatus: 'unverified',
    })
  }

  const originalRegistration = registrationRecords.find(
    (record) => record.original,
  )

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">
            REGISTRATION HISTORY
          </p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Current and historical vehicle registration identities.
          </p>
        </section>

        {/* CURRENT REGISTRATION */}
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
                  CURRENT REGISTRATION
                </p>

                {selectedVehicle.registration ? (
                  <div
                    className="
                      reg-plate
                      mt-2
                      inline-flex
                      rounded-lg
                      bg-[#f4c430]
                      px-3 py-1.5
                      text-3xl
                      text-black
                    "
                  >
                    {selectedVehicle.registration}
                  </div>
                ) : (
                  <p className="mt-2 text-2xl font-bold">Not recorded</p>
                )}

                <p className="theme-muted mt-3 text-xs">
                  Registration currently connected to this vehicle record
                </p>
              </div>

              <CarFront
                size={42}
                strokeWidth={1.2}
                className="shrink-0 text-[#c1f89f]"
              />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <SummaryValue label="Current" value={currentRegistration} />

                <SummaryValue
                  label="Original"
                  value={originalRegistration?.registration || 'Not recorded'}
                />

                <SummaryValue label="First Registered" value="May 2022" />

                <SummaryValue
                  label="Recorded Plates"
                  value={`${registrationRecords.length}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* VEHICLE IDENTITY */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            VEHICLE IDENTITY
          </p>

          <div className="theme-card mt-3 rounded-2xl px-4">
            <InformationRow
              icon={<CarFront size={18} />}
              label="Current Registration"
              value={currentRegistration}
            />

            <InformationRow
              icon={<History size={18} />}
              label="Original Registration"
              value={originalRegistration?.registration || 'Not recorded'}
            />

            <InformationRow
              icon={<CalendarDays size={18} />}
              label="First Registration"
              value="May 2022"
            />

            <InformationRow
              icon={<Fingerprint size={18} />}
              label="VIN"
              value={selectedVehicle.vin || 'VIN65165498'}
              last
            />
          </div>
        </section>

        {/* REGISTRATION TIMELINE */}
        <section className="mt-7 px-5">
          <div className="flex items-center justify-between gap-3">
            <p className="theme-subtle text-xs tracking-widest">
              REGISTRATION RECORD
            </p>

            <p className="theme-subtle text-xs">
              {registrationRecords.length}{' '}
              {registrationRecords.length === 1
                ? 'registration'
                : 'registrations'}
            </p>
          </div>

          <div className="mt-3 space-y-3">
            {registrationRecords.map((record, index) => (
              <RegistrationCard
                key={record.id}
                record={record}
                latest={index === 0}
              />
            ))}
          </div>
        </section>

        {/* IDENTITY PRINCIPLE */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            PERMANENT VEHICLE IDENTITY
          </p>

          <div className="theme-card mt-3 rounded-2xl p-4">
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
                <Fingerprint size={20} strokeWidth={1.6} />
              </div>

              <div>
                <p className="text-sm font-semibold">Registration can change</p>

                <p className="theme-muted mt-1 text-xs leading-relaxed">
                  Historical registrations remain connected to the same V-TAG
                  vehicle record rather than creating a new vehicle identity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

interface RegistrationCardProps {
  record: RegistrationRecord
  latest: boolean
}

function RegistrationCard({ record, latest }: RegistrationCardProps) {
  return (
    <article className="theme-card rounded-2xl p-4">
      <div className="flex items-start gap-4">
        <div
          className={`
            flex h-10 w-10
            shrink-0
            items-center justify-center
            rounded-xl
            ${
              record.current
                ? 'bg-[#c1f89f]/10 text-[#c1f89f]'
                : 'theme-card-secondary theme-muted'
            }
          `}
        >
          {record.current ? (
            <CheckCircle2 size={20} strokeWidth={1.7} />
          ) : (
            <History size={20} strokeWidth={1.7} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="theme-subtle text-[10px] font-semibold tracking-wider">
                {record.current
                  ? 'CURRENT REGISTRATION'
                  : record.original
                    ? 'ORIGINAL REGISTRATION'
                    : 'PREVIOUS REGISTRATION'}
              </p>

              <p className="reg-plate mt-1 text-2xl">{record.registration}</p>
            </div>

            {record.verificationStatus === 'verified' && (
              <ShieldCheck size={18} className="shrink-0 text-[#c1f89f]" />
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {record.startedAt && (
              <p className="theme-muted text-xs">From {record.startedAt}</p>
            )}

            {record.endedAt && (
              <p className="theme-muted text-xs">Until {record.endedAt}</p>
            )}

            {latest && (
              <p className="text-xs font-semibold text-[#c1f89f]">ACTIVE</p>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <FileText size={13} className="theme-subtle" />

            <p className="theme-subtle text-[10px] font-semibold">
              {formatVerification(record.verificationStatus)}
            </p>
          </div>
        </div>
      </div>
    </article>
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

        <p className="mt-1 break-words text-sm font-semibold">{value}</p>
      </div>
    </div>
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

function formatVerification(status: RegistrationVerification) {
  switch (status) {
    case 'verified':
      return 'V-TAG VERIFIED'

    case 'verification-pending':
      return 'VERIFICATION PENDING'

    case 'evidence-supplied':
      return 'EVIDENCE SUPPLIED'

    default:
      return 'UNVERIFIED'
  }
}

export default VehicleRegistrationHistory
