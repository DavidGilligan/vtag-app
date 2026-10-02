import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Landmark,
  ReceiptText,
  ShieldCheck,
  Upload,
  Wrench,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'

function VehicleDocuments() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">DOCUMENTS</p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its documents.
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
          <p className="theme-subtle text-xs tracking-widest">DOCUMENTS</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Documents and supporting evidence connected to this vehicle.
          </p>
        </section>

        {/* DOCUMENT LIBRARY SUMMARY */}
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
                  DOCUMENT LIBRARY
                </p>

                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-3xl font-bold">12</p>

                  <p className="theme-muted text-sm">documents</p>
                </div>

                <p className="theme-muted mt-2 text-xs">
                  Records linked to this vehicle
                </p>
              </div>

              <FileCheck2
                size={42}
                strokeWidth={1.2}
                className="text-[#c1f89f]"
              />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <DocumentCount label="MOT" value="3" />

                <DocumentCount label="Servicing" value="4" />

                <DocumentCount label="Ownership" value="2" />

                <DocumentCount label="Insurance" value="1" />

                <DocumentCount label="Tax & Registration" value="2" />

                <DocumentCount label="Other" value="0" />
              </div>
            </div>
          </div>
        </section>

        {/* DOCUMENT CATEGORIES */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            DOCUMENT CATEGORIES
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <DocumentLink
              icon={<ClipboardCheck size={25} strokeWidth={1.6} />}
              title="MOT"
              description="Certificates and test documents"
              count={3}
              to="/vehicle-identity/documents/mot"
            />

            <DocumentLink
              icon={<Wrench size={25} strokeWidth={1.6} />}
              title="Servicing"
              description="Service and maintenance documents"
              count={4}
              to="/vehicle-identity/documents/servicing"
            />

            <DocumentLink
              icon={<FileText size={25} strokeWidth={1.6} />}
              title="Ownership"
              description="Ownership and purchase records"
              count={2}
              to="/vehicle-identity/documents/ownership"
            />

            <DocumentLink
              icon={<ShieldCheck size={25} strokeWidth={1.6} />}
              title="Insurance"
              description="Insurance records and policies"
              count={1}
              to="/vehicle-identity/documents/insurance"
            />

            <DocumentLink
              icon={<Landmark size={25} strokeWidth={1.6} />}
              title="Tax & Registration"
              description="Registration and vehicle tax records"
              count={2}
              to="/vehicle-identity/documents/registration"
            />

            <DocumentLink
              icon={<ReceiptText size={25} strokeWidth={1.6} />}
              title="Other Documents"
              description="Other records linked to the vehicle"
              count={0}
              to="/vehicle-identity/documents/other"
            />
          </div>
        </section>

        {/* ADD DOCUMENT */}
        <section className="mt-7 px-5">
          <Link
            to="/add-information"
            className="
              flex w-full
              items-center justify-center gap-2
              rounded-2xl
              bg-[#c1f89f]
              px-5 py-4
              text-sm font-bold
              text-black
              transition
              active:scale-[0.98]
            "
          >
            <Upload size={18} strokeWidth={2} />
            ADD DOCUMENT
          </Link>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

interface DocumentCountProps {
  label: string
  value: string
}

function DocumentCount({ label, value }: DocumentCountProps) {
  return (
    <div>
      <p className="theme-subtle text-[10px] uppercase tracking-wider">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  )
}

interface DocumentLinkProps {
  icon: ReactNode
  title: string
  description: string
  count: number
  to: string
}

function DocumentLink({
  icon,
  title,
  description,
  count,
  to,
}: DocumentLinkProps) {
  return (
    <Link
      to={to}
      className="
        theme-card
        flex min-h-[155px]
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
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold leading-tight">{title}</h2>

          {count > 0 && (
            <span
              className="
                rounded-full
                bg-[#c1f89f]/10
                px-2 py-0.5
                text-[10px] font-bold
                text-[#c1f89f]
              "
            >
              {count}
            </span>
          )}
        </div>

        <p className="theme-muted mt-1.5 text-xs leading-snug">{description}</p>
      </div>
    </Link>
  )
}

export default VehicleDocuments
