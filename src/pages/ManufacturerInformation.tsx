import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Cpu,
  ShieldCheck,
  Factory,
  Leaf,
  Settings2,
  RotateCcw,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'

function ManufacturerInformation() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">
              MANUFACTURER INFORMATION
            </p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view manufacturer
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

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <Link
            to="/vehicle-identity"
            className="theme-subtle inline-flex items-center gap-2 text-xs font-semibold"
          >
            <RotateCcw size={14} />
            VEHICLE IDENTITY
          </Link>

          <h1 className="mt-3 text-3xl font-bold">Manufacturer Information</h1>

          <p className="theme-muted mt-2 text-sm">
            Factory specification and manufacturer information for {vehicleName}
            .
          </p>
        </section>

        {/* KEY INFORMATION */}
        <section className="mt-6 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            KEY INFORMATION
          </p>

          <div className="theme-card mt-3 overflow-hidden rounded-3xl px-5">
            <DataRow label="Manufacturer" value={selectedVehicle.make} />

            <DataRow label="Model" value={selectedVehicle.model} />

            <DataRow label="Derivative" value={selectedVehicle.derivative} />

            <DataRow label="Manufactured Country" value="Germany" />

            <DataRow label="First Registration" value="May 2022" />

            <DataRow label="Fuel Type" value={selectedVehicle.fuelType} />

            <DataRow
              label="Transmission"
              value={selectedVehicle.transmission}
            />

            <DataRow label="Engine" value={selectedVehicle.engineSize} />

            <DataRow label="Power" value={selectedVehicle.power} last />
          </div>
        </section>

        {/* MORE INFORMATION */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">
            MORE INFORMATION
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <ManufacturerLink
              icon={<Cpu size={25} strokeWidth={1.6} />}
              title="Technical Specification"
              description="Engine, drivetrain and performance"
              to="/vehicle-identity/manufacturer/specification"
            />

            <ManufacturerLink
              icon={<ShieldCheck size={25} strokeWidth={1.6} />}
              title="Warranty"
              description="Manufacturer cover and expiry"
              to="/vehicle-identity/manufacturer/warranty"
            />

            <ManufacturerLink
              icon={<Factory size={25} strokeWidth={1.6} />}
              title="Factory Equipment"
              description="Original equipment and options"
              to="/vehicle-identity/manufacturer/equipment"
            />

            <ManufacturerLink
              icon={<Leaf size={25} strokeWidth={1.6} />}
              title="Emissions"
              description="CO₂ and environmental data"
              to="/vehicle-identity/manufacturer/emissions"
            />

            <ManufacturerLink
              icon={<Settings2 size={25} strokeWidth={1.6} />}
              title="Recalls"
              description="Manufacturer recalls and campaigns"
              to="/vehicle-identity/manufacturer/recalls"
            />
          </div>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

interface DataRowProps {
  label: string
  value?: string | number
  last?: boolean
}

function DataRow({ label, value, last = false }: DataRowProps) {
  return (
    <div
      className={`
        flex items-center justify-between gap-5
        py-4
        ${last ? '' : 'border-b border-white/10'}
      `}
    >
      <p className="theme-muted text-sm">{label}</p>

      <p className="max-w-[55%] text-right text-sm font-semibold">
        {value || 'Not recorded'}
      </p>
    </div>
  )
}

interface ManufacturerLinkProps {
  icon: React.ReactNode
  title: string
  description: string
  to: string
}

function ManufacturerLink({
  icon,
  title,
  description,
  to,
}: ManufacturerLinkProps) {
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

export default ManufacturerInformation
