import type { ReactNode } from 'react'
import {
  CarFront,
  ChevronRight,
  FileCheck2,
  Fingerprint,
  History,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'
import approvalShield from '../assets/ApprovalShield.png'

type VerificationState =
  | 'verified'
  | 'pending'
  | 'evidence-supplied'
  | 'unverified'

function VehicleVerification() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">VERIFICATION</p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its verification
                status.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  const vehicleStatus: VerificationState =
    selectedVehicle.verificationStatus === 'verified'
      ? 'verified'
      : selectedVehicle.verificationStatus === 'pending'
        ? 'pending'
        : 'unverified'

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">VERIFICATION</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Vehicle identity, evidence and V-TAG verification.
          </p>
        </section>

        {/* MAIN STATUS */}
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
                  VEHICLE VERIFICATION
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <h2 className="text-3xl font-bold">
                    {formatStatus(vehicleStatus)}
                  </h2>

                  {vehicleStatus === 'verified' && (
                    <img
                      src={approvalShield}
                      alt="V-TAG Verified"
                      className="h-6 w-6 object-contain"
                    />
                  )}
                </div>

                <p className="theme-muted mt-2 text-xs">
                  V-TAG Reference V-1059403
                </p>
              </div>

              <ShieldCheck
                size={44}
                strokeWidth={1.2}
                className="shrink-0 text-[#c1f89f]"
              />
            </div>
          </div>
        </section>

        {/* WHAT THE SHIELD MEANS */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            V-TAG VERIFICATION
          </p>

          <div className="theme-card mt-3 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <img
                src={approvalShield}
                alt=""
                aria-hidden="true"
                className="h-10 w-10 object-contain"
              />

              <div>
                <h2 className="text-base font-bold">
                  What does V-TAG Verified mean?
                </h2>

                <p className="theme-muted mt-2 text-sm leading-relaxed">
                  The V-TAG shield indicates that supporting information or
                  evidence has been validated against the record it supports.
                </p>

                <p className="theme-muted mt-3 text-xs leading-relaxed">
                  Verification does not guarantee the quality, safety or
                  workmanship of repairs, servicing or modifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VERIFICATION AREAS */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            VERIFICATION AREAS
          </p>

          <div className="mt-3 space-y-3">
            <VerificationCard
              icon={<Fingerprint size={21} />}
              title="Vehicle Identity"
              description="Registration, VIN and vehicle identity"
              status={vehicleStatus}
              to="/vehicle-identity/record"
            />

            <VerificationCard
              icon={<UserRound size={21} />}
              title="Ownership"
              description="Current ownership relationship and evidence"
              status="unverified"
              to="/vehicle-identity/record/ownership"
            />

            <VerificationCard
              icon={<FileCheck2 size={21} />}
              title="Documents"
              description="Evidence and documents connected to this vehicle"
              status="evidence-supplied"
              to="/vehicle-identity/documents"
            />

            <VerificationCard
              icon={<History size={21} />}
              title="Vehicle History"
              description="MOT, servicing and modification records"
              status="evidence-supplied"
              to="/vehicle-identity/health"
            />
          </div>
        </section>

        {/* VEHICLE IDENTITY */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">IDENTITY</p>

          <div className="theme-card mt-3 rounded-2xl px-4">
            <InformationRow
              icon={<CarFront size={18} />}
              label="Registration"
              value={selectedVehicle.registration || 'Not recorded'}
            />

            <InformationRow
              icon={<Fingerprint size={18} />}
              label="VIN"
              value={selectedVehicle.vin || 'VIN65165498'}
            />

            <InformationRow
              icon={<ShieldCheck size={18} />}
              label="V-TAG Reference"
              value="V-1059403"
              last
            />
          </div>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

interface VerificationCardProps {
  icon: ReactNode
  title: string
  description: string
  status: VerificationState
  to: string
}

function VerificationCard({
  icon,
  title,
  description,
  status,
  to,
}: VerificationCardProps) {
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
          flex h-11 w-11
          shrink-0
          items-center justify-center
          rounded-xl
          bg-[#c1f89f]/10
          text-[#c1f89f]
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold">{title}</h2>

          {status === 'verified' && (
            <img
              src={approvalShield}
              alt=""
              aria-hidden="true"
              className="h-[15px] w-[15px] object-contain"
            />
          )}
        </div>

        <p className="theme-muted mt-1 text-xs leading-snug">{description}</p>

        <p
          className={`
            mt-2 text-[10px] font-bold
            ${status === 'verified' ? 'text-[#c1f89f]' : 'theme-subtle'}
          `}
        >
          {formatStatus(status).toUpperCase()}
        </p>
      </div>

      <ChevronRight size={18} className="theme-subtle shrink-0" />
    </Link>
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

function formatStatus(status: VerificationState) {
  switch (status) {
    case 'verified':
      return 'V-TAG Verified'

    case 'pending':
      return 'Verification Pending'

    case 'evidence-supplied':
      return 'Evidence Supplied'

    default:
      return 'Unverified'
  }
}

export default VehicleVerification
