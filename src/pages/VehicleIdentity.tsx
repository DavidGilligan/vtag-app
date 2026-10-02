import { Building2, CarFront, HeartPulse, Files } from 'lucide-react'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import VehicleIdentityCard from '../components/vehicle/VehicleIdentityCard'
import IdentityNavCard from '../components/vehicle/IdentityNavCard'
import { useVehicles } from '../context/VehicleContext'

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
  const { selectedVehicle } = useVehicles()

  /*
   * Retained while the existing information is moved into
   * the new Vehicle Identity dashboard pages.
   */
  void motRecords
  void serviceRecords
  void modifications

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">
              VEHICLE IDENTITY
            </p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its identity.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">
            VEHICLE IDENTITY
          </p>

          <p className="theme-muted mt-2 text-sm">
            Verified vehicle profile, ownership record and public history.
          </p>
        </section>

        {/* VEHICLE IDENTITY */}
        <section className="mt-5 px-5">
          <VehicleIdentityCard
            vehicle={selectedVehicle}
            firstRegistration="May 2022"
            originCountry="Scotland"
            manufacturedCountry="Germany"
          />
        </section>

        {/* EXPLORE VEHICLE */}
        <section className="mt-7 px-5">
          <div className="mb-3">
            <p className="theme-subtle text-xs tracking-widest">
              EXPLORE VEHICLE
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link to="/vehicle-identity/manufacturer" className="block h-full">
              <IdentityNavCard
                icon={<Building2 size={28} strokeWidth={1.6} />}
                title="Manufacturer Information"
                description="Factory and vehicle specification"
              />
            </Link>

            <Link to="/vehicle-identity/record" className="block h-full">
              <IdentityNavCard
                icon={<CarFront size={28} strokeWidth={1.6} />}
                title="Vehicle Record"
                description="Registration, identity and ownership"
              />
            </Link>

            <Link to="/vehicle-identity/health" className="block h-full">
              <IdentityNavCard
                icon={<HeartPulse size={28} strokeWidth={1.6} />}
                title="Vehicle Health"
                description="Condition, history and maintenance"
              />
            </Link>

            <Link to="/vehicle-identity/documents" className="block h-full">
              <IdentityNavCard
                icon={<Files size={28} strokeWidth={1.6} />}
                title="Documents"
                description="Vehicle records and document library"
              />
            </Link>
          </div>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

export default VehicleIdentity
