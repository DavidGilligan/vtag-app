import type { ReactNode } from 'react'
import {
  Battery,
  Box,
  CarFront,
  CircleGauge,
  Cog,
  Fuel,
  Gauge,
  Ruler,
  Scale,
  Settings2,
  Zap,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'

function TechnicalSpecification() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">
              TECHNICAL SPECIFICATION
            </p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its technical
                specification.
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
          <p className="theme-subtle text-xs tracking-widest">
            TECHNICAL SPECIFICATION
          </p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Manufacturer technical data and factory specification.
          </p>
        </section>

        {/* VEHICLE SUMMARY */}
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
                  FACTORY SPECIFICATION
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {selectedVehicle.derivative || vehicleName}
                </h2>

                <p className="theme-muted mt-2 text-xs">
                  {selectedVehicle.year
                    ? `${selectedVehicle.year} model`
                    : 'Model year not recorded'}
                </p>
              </div>

              <Settings2
                size={42}
                strokeWidth={1.2}
                className="shrink-0 text-[#c1f89f]"
              />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <SummaryValue
                  label="Fuel"
                  value={selectedVehicle.fuelType || 'Not recorded'}
                />

                <SummaryValue
                  label="Transmission"
                  value={selectedVehicle.transmission || 'Not recorded'}
                />

                <SummaryValue
                  label="Engine"
                  value={selectedVehicle.engineSize || 'Not recorded'}
                />

                <SummaryValue
                  label="Power"
                  value={selectedVehicle.power || 'Not recorded'}
                />
              </div>
            </div>
          </div>
        </section>

        {/* POWERTRAIN */}
        <SpecificationSection
          title="POWERTRAIN"
          icon={<Cog size={20} strokeWidth={1.6} />}
        >
          <SpecificationRow
            icon={<Fuel size={17} />}
            label="Fuel Type"
            value={selectedVehicle.fuelType}
          />

          <SpecificationRow
            icon={<Cog size={17} />}
            label="Engine"
            value={selectedVehicle.engineSize}
          />

          <SpecificationRow
            icon={<Zap size={17} />}
            label="Power"
            value={selectedVehicle.power}
          />

          <SpecificationRow
            icon={<Settings2 size={17} />}
            label="Transmission"
            value={selectedVehicle.transmission}
          />

          <SpecificationRow
            icon={<CarFront size={17} />}
            label="Drivetrain"
            value="Not recorded"
            last
          />
        </SpecificationSection>

        {/* PERFORMANCE */}
        <SpecificationSection
          title="PERFORMANCE"
          icon={<Gauge size={20} strokeWidth={1.6} />}
        >
          <SpecificationRow
            icon={<Zap size={17} />}
            label="Power"
            value={selectedVehicle.power}
          />

          <SpecificationRow
            icon={<CircleGauge size={17} />}
            label="Torque"
            value="Not recorded"
          />

          <SpecificationRow
            icon={<Gauge size={17} />}
            label="0–62 mph"
            value="Not recorded"
          />

          <SpecificationRow
            icon={<Gauge size={17} />}
            label="Top Speed"
            value="Not recorded"
            last
          />
        </SpecificationSection>

        {/* DIMENSIONS */}
        <SpecificationSection
          title="DIMENSIONS & WEIGHT"
          icon={<Ruler size={20} strokeWidth={1.6} />}
        >
          <SpecificationRow
            icon={<Ruler size={17} />}
            label="Length"
            value="Not recorded"
          />

          <SpecificationRow
            icon={<Ruler size={17} />}
            label="Width"
            value="Not recorded"
          />

          <SpecificationRow
            icon={<Ruler size={17} />}
            label="Height"
            value="Not recorded"
          />

          <SpecificationRow
            icon={<Scale size={17} />}
            label="Kerb Weight"
            value="Not recorded"
          />

          <SpecificationRow
            icon={<Box size={17} />}
            label="Load / Storage Capacity"
            value="Not recorded"
            last
          />
        </SpecificationSection>

        {/* ENERGY */}
        <SpecificationSection
          title="FUEL & ENERGY"
          icon={<Battery size={20} strokeWidth={1.6} />}
        >
          <SpecificationRow
            icon={<Fuel size={17} />}
            label="Fuel Tank Capacity"
            value="Not recorded"
          />

          <SpecificationRow
            icon={<Battery size={17} />}
            label="Battery Capacity"
            value="Not applicable / not recorded"
          />

          <SpecificationRow
            icon={<Gauge size={17} />}
            label="Official Consumption"
            value="Not recorded"
            last
          />
        </SpecificationSection>

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

interface SpecificationSectionProps {
  title: string
  icon: ReactNode
  children: ReactNode
}

function SpecificationSection({
  title,
  icon,
  children,
}: SpecificationSectionProps) {
  return (
    <section className="mt-7 px-5">
      <div className="flex items-center gap-2">
        <span className="text-[#c1f89f]">{icon}</span>

        <p className="theme-subtle text-xs tracking-widest">{title}</p>
      </div>

      <div className="theme-card mt-3 rounded-2xl px-4">{children}</div>
    </section>
  )
}

interface SpecificationRowProps {
  icon: ReactNode
  label: string
  value?: string
  last?: boolean
}

function SpecificationRow({
  icon,
  label,
  value,
  last = false,
}: SpecificationRowProps) {
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

        <p className="mt-1 text-sm font-semibold">{value || 'Not recorded'}</p>
      </div>
    </div>
  )
}

export default TechnicalSpecification
