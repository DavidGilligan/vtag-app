import type { ReactNode } from 'react'
import {
  Activity,
  CarFront,
  CheckCircle2,
  Clock3,
  Fingerprint,
  History,
  Link2,
  Radio,
  ShieldCheck,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'
import approvalShield from '../assets/ApprovalShield.png'

type VTagRecordStatus = 'active' | 'pending' | 'inactive' | 'transferred'

type PhysicalTagStatus =
  | 'not-linked'
  | 'linked'
  | 'replacement-required'
  | 'disabled'

type AuditEvent = {
  id: string
  title: string
  description: string
  date?: string
  verified?: boolean
}

const V_TAG_REFERENCE = 'V-1059403'

/*
 * Development fixture only.
 *
 * Do not invent a physical NFC UID here.
 * That identifier should eventually come from the backend
 * when a physical V-TAG is provisioned and associated.
 */
const recordStatus: VTagRecordStatus = 'active'
const physicalTagStatus: PhysicalTagStatus = 'not-linked'

const auditEvents: AuditEvent[] = [
  {
    id: 'record-created',
    title: 'V-TAG Record Created',
    description: 'Permanent V-TAG vehicle record established.',
  },
]

function VTagRecord() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">V-TAG RECORD</p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its V-TAG record.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  const registration = selectedVehicle.registration || 'Not recorded'

  const vin = selectedVehicle.vin || 'VIN65165498'

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">V-TAG RECORD</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Permanent V-TAG identity and vehicle record.
          </p>
        </section>

        {/* V-TAG IDENTITY */}
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
                  V-TAG REFERENCE
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <h2 className="text-3xl font-bold">{V_TAG_REFERENCE}</h2>

                  {selectedVehicle.verificationStatus === 'verified' && (
                    <img
                      src={approvalShield}
                      alt="Verified"
                      className="h-[19px] w-[19px] object-contain"
                    />
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className="
                      h-2 w-2
                      rounded-full
                      bg-[#c1f89f]
                    "
                  />

                  <p className="text-xs font-bold text-[#c1f89f]">
                    {formatRecordStatus(recordStatus)}
                  </p>
                </div>
              </div>

              <Fingerprint
                size={44}
                strokeWidth={1.1}
                className="shrink-0 text-[#c1f89f]"
              />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <SummaryValue
                  label="Record"
                  value={formatRecordStatus(recordStatus)}
                />

                <SummaryValue label="Vehicle" value="Linked" />

                <SummaryValue
                  label="Physical V-TAG"
                  value={formatTagStatus(physicalTagStatus)}
                />

                <SummaryValue
                  label="Record Events"
                  value={`${auditEvents.length}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* VEHICLE ASSOCIATION */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            VEHICLE ASSOCIATION
          </p>

          <div className="theme-card mt-3 rounded-2xl px-4">
            <InformationRow
              icon={<Fingerprint size={18} />}
              label="V-TAG Reference"
              value={V_TAG_REFERENCE}
            />

            <InformationRow
              icon={<CarFront size={18} />}
              label="Vehicle"
              value={vehicleName}
            />

            <InformationRow
              icon={<CarFront size={18} />}
              label="Registration"
              value={registration}
            />

            <InformationRow
              icon={<Fingerprint size={18} />}
              label="VIN"
              value={vin}
            />

            <InformationRow
              icon={<Link2 size={18} />}
              label="Association"
              value="Linked to vehicle record"
              last
            />
          </div>
        </section>

        {/* PHYSICAL V-TAG */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">PHYSICAL V-TAG</p>

          <div className="theme-card mt-3 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div
                className="
                  flex h-12 w-12
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-[#c1f89f]/10
                  text-[#c1f89f]
                "
              >
                <Radio size={24} strokeWidth={1.5} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-bold">NFC V-TAG</p>

                    <p className="theme-muted mt-1 text-xs">
                      Physical vehicle tag
                    </p>
                  </div>

                  <StatusPill status={physicalTagStatus} />
                </div>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <TagDetail
                    label="Tag Status"
                    value={formatTagStatus(physicalTagStatus)}
                  />

                  <TagDetail label="Tag UID" value="Not linked" />

                  <TagDetail label="Linked Date" value="Not recorded" last />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECORD STATUS */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">RECORD STATUS</p>

          <div className="theme-card mt-3 rounded-2xl px-4">
            <InformationRow
              icon={<Activity size={18} />}
              label="V-TAG Record"
              value={formatRecordStatus(recordStatus)}
            />

            <InformationRow
              icon={<ShieldCheck size={18} />}
              label="Vehicle Verification"
              value={formatVehicleVerification(
                selectedVehicle.verificationStatus,
              )}
            />

            <InformationRow
              icon={<Radio size={18} />}
              label="Physical Tag"
              value={formatTagStatus(physicalTagStatus)}
            />

            <InformationRow
              icon={<Clock3 size={18} />}
              label="Record Created"
              value="Not recorded"
              last
            />
          </div>
        </section>

        {/* AUDIT HISTORY */}
        <section className="mt-7 px-5">
          <div className="flex items-center justify-between gap-3">
            <p className="theme-subtle text-xs tracking-widest">
              V-TAG HISTORY
            </p>

            <p className="theme-subtle text-xs">
              {auditEvents.length}{' '}
              {auditEvents.length === 1 ? 'event' : 'events'}
            </p>
          </div>

          <div className="mt-3 space-y-3">
            {auditEvents.map((event) => (
              <AuditEventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* PERMANENT RECORD */}
        <section className="mt-7 px-5">
          <div
            className="
              rounded-2xl
              border border-[#c1f89f]/15
              bg-[#c1f89f]/[0.04]
              p-4
            "
          >
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                strokeWidth={1.6}
                className="mt-0.5 shrink-0 text-[#c1f89f]"
              />

              <div>
                <p className="text-sm font-semibold">
                  Permanent vehicle record
                </p>

                <p className="theme-muted mt-1 text-xs leading-relaxed">
                  The V-TAG reference remains associated with the vehicle record
                  as registrations, ownership and vehicle history change over
                  time.
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

        <p className="mt-1 break-words text-sm font-semibold">{value}</p>
      </div>
    </div>
  )
}

interface TagDetailProps {
  label: string
  value: string
  last?: boolean
}

function TagDetail({ label, value, last = false }: TagDetailProps) {
  return (
    <div
      className={`
        flex items-center justify-between gap-4
        py-3
        ${last ? '' : 'border-b border-white/10'}
      `}
    >
      <p className="theme-muted text-xs">{label}</p>

      <p className="text-right text-xs font-semibold">{value}</p>
    </div>
  )
}

function StatusPill({ status }: { status: PhysicalTagStatus }) {
  const linked = status === 'linked'

  return (
    <span
      className={`
        shrink-0
        rounded-full
        px-2.5 py-1
        text-[10px]
        font-bold
        ${
          linked
            ? 'bg-[#c1f89f]/10 text-[#c1f89f]'
            : 'bg-white/[0.06] theme-muted'
        }
      `}
    >
      {formatTagStatus(status).toUpperCase()}
    </span>
  )
}

function AuditEventCard({ event }: { event: AuditEvent }) {
  return (
    <article className="theme-card rounded-2xl p-4">
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
          <History size={19} strokeWidth={1.6} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">{event.title}</p>

            {event.verified && (
              <ShieldCheck size={15} className="shrink-0 text-[#c1f89f]" />
            )}
          </div>

          <p className="theme-muted mt-1 text-xs leading-relaxed">
            {event.description}
          </p>

          <p className="theme-subtle mt-2 text-[10px]">
            {event.date || 'Date not recorded'}
          </p>
        </div>
      </div>
    </article>
  )
}

function formatRecordStatus(status: VTagRecordStatus) {
  switch (status) {
    case 'active':
      return 'Active'

    case 'pending':
      return 'Pending'

    case 'inactive':
      return 'Inactive'

    case 'transferred':
      return 'Transferred'
  }
}

function formatTagStatus(status: PhysicalTagStatus) {
  switch (status) {
    case 'linked':
      return 'Linked'

    case 'not-linked':
      return 'Not Linked'

    case 'replacement-required':
      return 'Replacement Required'

    case 'disabled':
      return 'Disabled'
  }
}

function formatVehicleVerification(status: string) {
  switch (status) {
    case 'verified':
      return 'V-TAG Verified'

    case 'pending':
      return 'Pending'

    default:
      return 'Unverified'
  }
}

export default VTagRecord
