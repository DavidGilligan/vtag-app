import { useState } from 'react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'

import VehicleGarageCard from '../components/garage/VehicleGarageCard'
import EmptyGarage from '../components/garage/EmptyGarage'
import AddVehicleModal from '../components/garage/AddVehicleModal'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useVehicles } from '../context/VehicleContext'

function Garage() {
  const { vehicles, selectVehicle, addVehicle } = useVehicles()
  const [addVehicleOpen, setAddVehicleOpen] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const selectionMode = searchParams.get('mode') === 'select'

  function handleAddVehicle() {
    setAddVehicleOpen(true)
  }

  function handleSelectVehicle(vehicleId: string) {
    selectVehicle(vehicleId)

    if (selectionMode) {
      navigate('/home')
    }
  }
  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-2">
          <p className="theme-subtle text-xs tracking-widest">GARAGE</p>

          <h1 className="mt-1 text-3xl font-bold">MY GARAGE</h1>

          {selectionMode ? (
            <p className="theme-muted mt-2 text-sm">
              Select the vehicle you want to display on Home.
            </p>
          ) : (
            <p className="theme-muted mt-2 text-sm">
              View and manage vehicles connected to your account.
            </p>
          )}
          {selectionMode && (
            <div className="mt-4 rounded-2xl border border-[#c1efa3]/30 bg-[#c1efa3]/5 px-4 py-3">
              <p className="text-sm font-semibold text-[#c1efa3]">
                Select a vehicle
              </p>

              <p className="theme-muted mt-1 text-xs">
                Your selection will become the active vehicle on Home.
              </p>
            </div>
          )}
        </section>

        {/* GARAGE CONTENT */}
        <section className="mt-6 px-4">
          {vehicles.length === 0 ? (
            <EmptyGarage onAddVehicle={handleAddVehicle} />
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <VehicleGarageCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={handleSelectVehicle}
                />
              ))}

              <button
                type="button"
                onClick={handleAddVehicle}
                className="
                  theme-card
                  w-full
                  rounded-3xl
                  border
                  border-dashed
                  px-5
                  py-5
                  text-sm
                  font-semibold
                  transition
                  active:scale-[0.99]
                "
              >
                + Add another vehicle
              </button>
            </div>
          )}
        </section>
        <AddVehicleModal
          open={addVehicleOpen}
          onClose={() => setAddVehicleOpen(false)}
          onVehicleCreated={addVehicle}
        />
        <BottomNav />
      </main>
    </AppShell>
  )
}

export default Garage
