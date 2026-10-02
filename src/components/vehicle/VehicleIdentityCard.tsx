import type { Vehicle } from '../../types/vehicle'
import approvalShield from '../../assets/ApprovalShield.png'

interface VehicleIdentityCardProps {
  vehicle: Vehicle
  firstRegistration?: string
  originCountry?: string
  manufacturedCountry?: string
}

function VehicleIdentityCard({
  vehicle,
  firstRegistration,
  originCountry,
  manufacturedCountry,
}: VehicleIdentityCardProps) {
  const vehicleName = `${vehicle.make} ${vehicle.model}`

  function formatUsage() {
    if (!vehicle.usage) {
      return 'Not recorded'
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

  return (
    <article
      className="
        relative
        overflow-hidden
        rounded-3xl
        p-[18px]
      "
      style={{
        background:
          'linear-gradient(90deg, #1d1d21 0%, #1d1d21 30%, #0a0a0a 75%, #000 100%)',
      }}
    >
      <div className="grid grid-cols-[45%_55%]">
        {/* LEFT SIDE */}
        <div className="min-w-0 pr-3">
          {/* VEHICLE NAME + VERIFIED */}
          <div className="flex items-center gap-2">
            <h2 className="line-clamp-1 text-xl font-bold leading-tight">
              {vehicleName}
            </h2>

            {vehicle.verificationStatus === 'verified' && (
              <img
                src={approvalShield}
                alt="Verified"
                className="h-[17px] w-[17px] shrink-0 object-contain"
              />
            )}

            {vehicle.verificationStatus === 'pending' && (
              <span className="text-[10px] font-semibold text-yellow-400">
                Pending
              </span>
            )}

            {vehicle.verificationStatus === 'unverified' && (
              <span className="theme-subtle text-[10px] font-semibold">
                Unverified
              </span>
            )}
          </div>

          {/* VEHICLE SPECIFICATION */}
          <p className="theme-muted mt-0.5 line-clamp-2 text-xs leading-snug">
            {vehicle.derivative || 'Vehicle specification not recorded'}
          </p>

          {/* REGISTRATION */}
          <div className="mt-2">
            {vehicle.registration ? (
              <p className="reg-plate inline-block text-3xl text-white">
                {vehicle.registration}
              </p>
            ) : (
              <p className="theme-subtle text-sm">No registration</p>
            )}
          </div>

          {/* FIRST REGISTRATION */}
          <div
            className="
              relative
              mt-2
              pt-2
              before:absolute
              before:left-0
              before:top-0
              before:h-px
              before:w-[88.89%]
              before:bg-white/10
            "
          >
            <IdentityField
              label="First Registration"
              value={firstRegistration}
            />
          </div>

          {/* ORIGIN COUNTRY */}
          <div
            className="
              relative
              mt-2
              pt-2
              before:absolute
              before:left-0
              before:top-0
              before:h-px
              before:w-[66.67%]
              before:bg-white/10
            "
          >
            <IdentityField label="Origin Country" value={originCountry} />
          </div>

          {/* MANUFACTURED COUNTRY */}
          <div
            className="
              relative
              mt-2
              pt-2
              before:absolute
              before:left-0
              before:top-0
              before:h-px
              before:w-[66.67%]
              before:bg-white/10
            "
          >
            <IdentityField
              label="Manufactured Country"
              value={manufacturedCountry}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex min-w-0 flex-col pl-1">
          {/* VEHICLE IMAGE */}
          <div className="flex min-h-[165px] flex-1 items-center justify-center">
            {vehicle.images?.garage ? (
              <img
                src={vehicle.images.garage}
                alt={vehicleName}
                className="
                  max-h-[190px]
                  max-w-full
                  object-contain
                "
              />
            ) : (
              <div className="theme-card-secondary flex h-[145px] w-full items-center justify-center rounded-2xl">
                <span className="theme-subtle text-center text-xs">
                  Vehicle image
                  <br />
                  not available
                </span>
              </div>
            )}
          </div>

          {/* USAGE */}
          <div className="mt-1 text-right">
            <p className="theme-subtle text-xs uppercase tracking-wider">
              {vehicle.usage?.type === 'hours'
                ? 'Current Hours'
                : vehicle.usage?.type === 'kilometres'
                  ? 'Current Kilometres'
                  : 'Current Mileage'}
            </p>

            <p className="mt-0.5 text-xl font-semibold">{formatUsage()}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

interface IdentityFieldProps {
  label: string
  value?: string
}

function IdentityField({ label, value }: IdentityFieldProps) {
  return (
    <div>
      <p className="theme-subtle text-[9px] uppercase tracking-wider">
        {label}
      </p>

      <p className="mt-0.5 text-xs font-semibold">{value || 'Not recorded'}</p>
    </div>
  )
}

export default VehicleIdentityCard
