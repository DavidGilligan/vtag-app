import type { ReactNode } from 'react'
import {
  CalendarDays,
  CarFront,
  Fuel,
  Gauge,
  Leaf,
  PoundSterling,
  Wind,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'

function VehicleEmissions() {
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">EMISSIONS</p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its emissions
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
          <p className="theme-subtle text-xs tracking-widest">EMISSIONS</p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Recorded emissions, environmental data and vehicle tax information.
          </p>
        </section>

        {/* EMISSIONS SUMMARY */}
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
                  CO₂ EMISSIONS
                </p>

                <div className="mt-1 flex items-end gap-1.5">
                  <p className="text-3xl font-bold">177</p>

                  <p className="theme-muted pb-1 text-sm">g/km</p>
                </div>

                <p className="theme-muted mt-2 text-xs">
                  Recorded vehicle CO₂ output
                </p>
              </div>

              <Leaf size={42} strokeWidth={1.2} className="text-[#c1f89f]" />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <SummaryValue
                  label="Fuel Type"
                  value={selectedVehicle.fuelType || 'Not recorded'}
                />

                <SummaryValue label="CO₂" value="177 g/km" />

                <SummaryValue label="VED" value="£640" />

                <SummaryValue label="Emissions Standard" value="Not recorded" />
              </div>
            </div>
          </div>
        </section>

        {/* ENVIRONMENTAL DATA */}
        <SpecificationSection
          title="ENVIRONMENTAL DATA"
          icon={<Leaf size={20} strokeWidth={1.6} />}
        >
          <InformationRow
            icon={<Wind size={17} />}
            label="CO₂ Emissions"
            value="177 g/km"
          />

          <InformationRow
            icon={<Fuel size={17} />}
            label="Fuel Type"
            value={selectedVehicle.fuelType}
          />

          <InformationRow
            icon={<CarFront size={17} />}
            label="Emissions Standard"
            value="Not recorded"
          />

          <InformationRow
            icon={<Gauge size={17} />}
            label="Official Consumption"
            value="Not recorded"
            last
          />
        </SpecificationSection>

        {/* VEHICLE TAX */}
        <SpecificationSection
          title="VEHICLE TAX"
          icon={<PoundSterling size={20} strokeWidth={1.6} />}
        >
          <InformationRow
            icon={<PoundSterling size={17} />}
            label="Recorded VED"
            value="£640"
          />

          <InformationRow
            icon={<CalendarDays size={17} />}
            label="Tax Renewal"
            value="Not recorded"
          />

          <InformationRow
            icon={<CarFront size={17} />}
            label="Tax Status"
            value="Not recorded"
            last
          />
        </SpecificationSection>

        {/* DATA PROVENANCE */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">DATA SOURCE</p>

          <div className="theme-card mt-3 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div
                className="
                  flex h-9 w-9
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-[#c1f89f]/10
                  text-[#c1f89f]
                "
              >
                <Leaf size={18} strokeWidth={1.6} />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Vehicle emissions record
                </p>

                <p className="theme-muted mt-1 text-xs leading-relaxed">
                  Production data should retain its original source and the date
                  it was obtained so that environmental and tax information can
                  be distinguished from user-entered information.
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

interface InformationRowProps {
  icon: ReactNode
  label: string
  value?: string
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

        <p className="mt-1 text-sm font-semibold">{value || 'Not recorded'}</p>
      </div>
    </div>
  )
}

export default VehicleEmissions
