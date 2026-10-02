import approvalShield from '../assets/ApprovalShield.png'
import { useNavigate } from 'react-router-dom'
import { useVehicles } from '../context/VehicleContext'

function VehicleCard() {
  const navigate = useNavigate()
  const { selectedVehicle } = useVehicles()

  if (!selectedVehicle) {
    return (
      <section className="px-5">
        <div className="theme-card rounded-3xl p-5">
          <p className="theme-subtle text-xs tracking-widest">ACTIVE VEHICLE</p>

          <h2 className="mt-2 text-xl font-bold">No vehicle selected</h2>

          <p className="theme-muted mt-2 text-sm">
            Add a vehicle to your garage to get started.
          </p>

          <button
            type="button"
            onClick={() => navigate('/garage')}
            className="mt-5 rounded-full bg-[#c1efa3] px-4 py-2 text-sm font-bold text-black"
          >
            Go to Garage
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="px-5">
      {/* PAGE HEADING */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="theme-subtle text-xs tracking-widest">VEHICLE</p>

          <h1 className="mt-1 text-3xl font-bold">MY VEHICLE</h1>
        </div>

        <button
          type="button"
          className="
    flex items-center gap-2
    rounded-full
    border border-[#c1efa3]/30
    bg-[#c1efa3]/10
    px-4 py-2.5
    text-sm font-bold
    text-[#c1efa3]
    transition
    active:scale-[0.97]
  "
        >
          <img
            src={approvalShield}
            alt=""
            aria-hidden="true"
            className="h-8 w-8 object-contain"
          />

          <span>VERIFIED</span>
        </button>
      </div>

      {/* VEHICLE ARTWORK */}
      <div className="relative mt-4">
        {selectedVehicle.images?.home ? (
          <div className="vehicle-stage relative overflow-hidden">
            <div className="vehicle-drive-in relative z-10 h-full w-full">
              <img
                src={selectedVehicle.images.home}
                alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
                className="h-full w-full object-contain"
              />
            </div>
            {/* MOVING GARAGE LIGHT / SHADOW */}
            <div className="vehicle-light-reveal pointer-events-none absolute z-20" />
          </div>
        ) : (
          <div className="theme-muted flex h-56 w-full items-center justify-center text-xs">
            No vehicle image
          </div>
        )}

        {/* V-TAG SIGNAL */}
      </div>

      {/* VEHICLE INFORMATION CARD */}
      <div className="theme-card mt-4 overflow-hidden rounded-3xl">
        <div className="px-5 pb-5 pt-2">
          <h2 className="text-xl font-bold">
            {selectedVehicle.make} {selectedVehicle.model}
          </h2>

          <p className="theme-muted mt-2 text-sm">
            Registration: {selectedVehicle.registration ?? 'NO REG'}
          </p>

          <div className="theme-card-secondary mt-5 rounded-2xl p-4">
            <p className="theme-subtle text-xs tracking-widest">
              CHANGE VEHICLE IN GARAGE
            </p>

            <button
              type="button"
              onClick={() => navigate('/garage?mode=select')}
              className="
                mt-3 w-full
                rounded-xl
                border border-[#c1f89f]/15
                bg-[#30352f]
                px-5 py-3
                text-sm font-bold
                text-[#c1f89f]
                transition
                hover:bg-[#373d36]
                active:scale-[0.98]
              "
            >
              CHANGE VEHICLE
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VehicleCard
