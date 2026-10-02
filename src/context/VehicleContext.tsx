import { createContext, useContext, useState, type ReactNode } from 'react'

import type { Vehicle } from '../types/vehicle'
import { devVehicles } from '../data/devVehicles'

interface VehicleContextValue {
  vehicles: Vehicle[]
  selectedVehicle?: Vehicle
  selectVehicle: (vehicleId: string) => void
  addVehicle: (vehicle: Vehicle) => void
}

const VehicleContext = createContext<VehicleContextValue | undefined>(undefined)

export function VehicleProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(devVehicles)

  const selectedVehicle =
    vehicles.find((vehicle) => vehicle.selected) ?? vehicles[0]

  function selectVehicle(vehicleId: string) {
    setVehicles((currentVehicles) =>
      currentVehicles.map((vehicle) => ({
        ...vehicle,
        selected: vehicle.id === vehicleId,
      })),
    )
  }

  function addVehicle(vehicle: Vehicle) {
    setVehicles((currentVehicles) => [...currentVehicles, vehicle])
  }

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        selectedVehicle,
        selectVehicle,
        addVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  )
}

export function useVehicles() {
  const context = useContext(VehicleContext)

  if (!context) {
    throw new Error('useVehicles must be used inside VehicleProvider')
  }

  return context
}
