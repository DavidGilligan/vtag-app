import type { Vehicle } from '../../types/vehicle'

interface VehicleGarageCardProps {
  vehicle: Vehicle
  onSelect: (vehicleId: string) => void
}

function VehicleGarageCard({ vehicle, onSelect }: VehicleGarageCardProps) {
  const vehicleName = `${vehicle.make} ${vehicle.model}`

  function formatUsage() {
    if (!vehicle.usage) {
      return 'Usage not recorded'
    }

    const value = vehicle.usage.value.toLocaleString('en-GB')

    switch (vehicle.usage.type) {
      case 'mileage':
        return `${value} miles`

      case 'kilometres':
        return `${value} km`

      case 'hours':
        return `${value} hours`

      default:
        return value
    }
  }

  const formattedUsage = formatUsage()

  return (
    <article
      className="
        relative
        overflow-hidden
        rounded-3xl
        min-h-[250px]
        p-5
      "
      style={{
        background:
          'linear-gradient(90deg, #1d1d21 0%, #1d1d21 30%, #0a0a0a 75%, #000 100%)',
      }}
    >
      <div className="grid min-h-[210px] grid-cols-[minmax(0,1fr)_45%] gap-3">
        {/* LEFT CONTENT */}
        <div className="flex min-w-0 flex-col">
          {/* REGISTRATION */}
          <div className="min-h-[50px]">
            {vehicle.registration ? (
              <p className="reg-plate inline-block text-3xl text-white">
                {vehicle.registration}
              </p>
            ) : (
              <p className="theme-subtle text-sm">No registration</p>
            )}
          </div>

          {/* VERIFICATION */}
          <div className="mt-2 min-h-[28px]">
            {vehicle.verificationStatus === 'verified' && (
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: 'rgba(193, 239, 163, 0.12)',
                  color: '#c1efa3',
                }}
              >
                Verified
              </span>
            )}

            {vehicle.verificationStatus === 'pending' && (
              <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                Pending
              </span>
            )}

            {vehicle.verificationStatus === 'unverified' && (
              <span className="theme-card-secondary inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold">
                Unverified
              </span>
            )}
          </div>

          {/* VEHICLE NAME */}
          <div className="mt-3 min-h-[58px]">
            <h2 className="line-clamp-2 text-xl font-bold leading-tight">
              {vehicleName}
            </h2>

            <p className="theme-muted mt-1 line-clamp-2 min-h-[32px] text-xs">
              {vehicle.derivative || 'Vehicle specification not recorded'}
            </p>
          </div>

          {/* VEHICLE DATA */}
          <div className="mt-3">
            <p className="theme-subtle text-xs">{formattedUsage}</p>

            <p className="theme-subtle mt-1 text-xs">
              {vehicle.year
                ? `Registered ${vehicle.year}`
                : 'Registration year not recorded'}
            </p>
          </div>

          {/* SELECT BUTTON */}
          <div className="mt-auto pt-4">
            {vehicle.selected ? (
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
                style={{
                  backgroundColor: '#c1efa3',
                  color: '#000000',
                }}
              >
                SELECTED
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onSelect(vehicle.id)}
                className={`
    inline-flex items-center rounded-full px-3 py-1
    text-sm font-semibold transition active:scale-[0.98]
    ${
      vehicle.selected
        ? 'bg-[#c1efa3] text-black'
        : 'bg-black/60 text-white hover:bg-black/80'
    }
  `}
              >
                {vehicle.selected ? 'SELECTED' : 'SELECT VEHICLE'}
              </button>
            )}
          </div>
        </div>

        {/* VEHICLE IMAGE */}
        <div className="flex min-w-0 items-center justify-center">
          {vehicle.images?.garage ? (
            <img
              src={vehicle.images?.garage}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="
                max-h-[190px]
                max-w-full
                object-contain
              "
            />
          ) : (
            <div className="theme-card-secondary flex h-[150px] w-full items-center justify-center rounded-2xl">
              <span className="theme-subtle text-center text-xs">
                Vehicle image
                <br />
                not available
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default VehicleGarageCard
