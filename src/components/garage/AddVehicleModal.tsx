import { useState } from 'react'
import {
  X,
  Search,
  ScanLine,
  PenLine,
  Car,
  Bike,
  Truck,
  Tractor,
  Ship,
  Flag,
  HardHat,
  Caravan,
  CircleEllipsis,
  Check,
} from 'lucide-react'

import type { Vehicle, VehicleType, UsageType } from '../../types/vehicle'

interface AddVehicleModalProps {
  open: boolean
  onClose: () => void
  onVehicleCreated: (vehicle: Vehicle) => void
}

type AddMethod = 'registration' | 'vtag' | 'manual' | null

type ManualStep = 'type' | 'details' | 'technical' | 'review'

interface VehicleTypeOption {
  type: VehicleType
  label: string
  icon: React.ReactNode
}

const vehicleTypes: VehicleTypeOption[] = [
  {
    type: 'car',
    label: 'Car',
    icon: <Car size={24} />,
  },
  {
    type: 'motorcycle',
    label: 'Motorcycle',
    icon: <Bike size={24} />,
  },
  {
    type: 'van',
    label: 'Van',
    icon: <Truck size={24} />,
  },
  {
    type: 'camper',
    label: 'Camper / Motorhome',
    icon: <Caravan size={24} />,
  },
  {
    type: 'truck',
    label: 'Truck',
    icon: <Truck size={24} />,
  },
  {
    type: 'agricultural',
    label: 'Agricultural',
    icon: <Tractor size={24} />,
  },
  {
    type: 'construction',
    label: 'Construction',
    icon: <HardHat size={24} />,
  },
  {
    type: 'track',
    label: 'Track Vehicle',
    icon: <Flag size={24} />,
  },
  {
    type: 'boat',
    label: 'Boat',
    icon: <Ship size={24} />,
  },
  {
    type: 'other',
    label: 'Other',
    icon: <CircleEllipsis size={24} />,
  },
]

function AddVehicleModal({
  open,
  onClose,
  onVehicleCreated,
}: AddVehicleModalProps) {
  const [method, setMethod] = useState<AddMethod>(null)

  const [manualStep, setManualStep] = useState<ManualStep>('type')

  const [vehicleType, setVehicleType] = useState<VehicleType | null>(null)

  const [registration, setRegistration] = useState('')

  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [derivative, setDerivative] = useState('')
  const [nickname, setNickname] = useState('')
  const [vin, setVin] = useState('')
  const [year, setYear] = useState('')

  const [usageType, setUsageType] = useState<UsageType>('mileage')

  const [usageValue, setUsageValue] = useState('')

  const [fuelType, setFuelType] = useState('')
  const [transmission, setTransmission] = useState('')
  const [engineSize, setEngineSize] = useState('')
  const [power, setPower] = useState('')
  const [colour, setColour] = useState('')
  const [detailsAttempted, setDetailsAttempted] = useState(false)
  if (!open) return null

  function resetForm() {
    setMethod(null)
    setManualStep('type')
    setVehicleType(null)

    setRegistration('')
    setMake('')
    setModel('')
    setDerivative('')
    setNickname('')
    setVin('')
    setYear('')

    setUsageType('mileage')
    setUsageValue('')

    setFuelType('')
    setTransmission('')
    setEngineSize('')
    setPower('')
    setColour('')
    setDetailsAttempted(false)
  }

  function handleClose() {
    resetForm()
    onClose()
  }

  function startManualEntry() {
    setMethod('manual')
    setManualStep('type')
  }

  function selectVehicleType(type: VehicleType) {
    setVehicleType(type)

    if (type === 'construction' || type === 'agricultural') {
      setUsageType('hours')
    } else if (type === 'boat') {
      setUsageType('hours')
    } else {
      setUsageType('mileage')
    }

    setManualStep('details')
  }

  function handleCreateVehicle() {
    if (!vehicleType) return

    const vehicle: Vehicle = {
      id: crypto.randomUUID(),

      vehicleType,

      make: make.trim(),
      model: model.trim(),

      derivative: derivative.trim() || undefined,

      nickname: nickname.trim() || undefined,

      registration: registration.trim() || undefined,

      vin: vin.trim() || undefined,

      year: year.trim() !== '' ? Number(year) : undefined,

      usage:
        usageValue.trim() !== ''
          ? {
              type: usageType,
              value: Number(usageValue),
            }
          : undefined,

      fuelType: fuelType.trim() || undefined,

      transmission: transmission.trim() || undefined,

      engineSize: engineSize.trim() || undefined,

      power: power.trim() || undefined,

      colour: colour.trim() || undefined,

      verificationStatus: 'unverified',

      selected: false,
    }

    onVehicleCreated(vehicle)

    resetForm()
    onClose()
  }

  const inputClass =
    'theme-card-secondary mt-2 w-full rounded-2xl border px-4 py-3 outline-none'

  const labelClass = 'theme-subtle text-xs font-semibold tracking-widest'

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center">
      <div className="theme-card max-h-[92vh] w-full max-w-[430px] overflow-y-auto rounded-t-[2rem] p-5 md:rounded-[2rem]">
        {/* HEADER */}

        <div className="flex items-center justify-between">
          <div>
            <p className="theme-subtle text-xs tracking-widest">GARAGE</p>

            <h2 className="mt-1 text-2xl font-bold">Add Vehicle</h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="theme-card-secondary flex h-10 w-10 items-center justify-center rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* ADD METHOD */}

        {method === null && (
          <>
            <p className="theme-muted mt-3 text-sm">
              Choose how you would like to add your vehicle.
            </p>

            <div className="mt-6 space-y-3">
              <MethodButton
                icon={<Search size={21} />}
                title="Registration Lookup"
                description="Find a vehicle using its registration."
                onClick={() => setMethod('registration')}
              />

              <MethodButton
                icon={<ScanLine size={21} />}
                title="Scan a V-TAG"
                description="Connect a vehicle using an existing V-TAG."
                onClick={() => setMethod('vtag')}
              />

              <MethodButton
                icon={<PenLine size={21} />}
                title="Add Manually"
                description="Add a vehicle that cannot be found automatically."
                onClick={startManualEntry}
              />
            </div>
          </>
        )}

        {/* REGISTRATION */}

        {method === 'registration' && (
          <div className="mt-6">
            <BackButton onClick={() => setMethod(null)} />

            <h3 className="mt-5 text-xl font-bold">Registration Lookup</h3>

            <p className="theme-muted mt-2 text-sm">
              Enter the vehicle registration.
            </p>

            <label className={`${labelClass} mt-6 block`}>REGISTRATION</label>

            <input
              value={registration}
              onChange={(event) =>
                setRegistration(event.target.value.toUpperCase())
              }
              placeholder="AB12 CDE"
              className={`${inputClass} text-xl font-bold uppercase`}
            />

            <button
              type="button"
              disabled={!registration.trim()}
              className="mt-4 w-full rounded-2xl bg-[#c1efa3] px-5 py-4 font-bold text-black disabled:opacity-30"
            >
              Find Vehicle
            </button>
          </div>
        )}

        {/* V-TAG */}

        {method === 'vtag' && (
          <div className="mt-6 text-center">
            <BackButton onClick={() => setMethod(null)} />

            <div className="mx-auto mt-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#c1efa3]/30 bg-[#c1efa3]/5">
              <ScanLine size={38} className="text-[#c1efa3]" />
            </div>

            <h3 className="mt-6 text-xl font-bold">Scan V-TAG</h3>

            <p className="theme-muted mx-auto mt-2 max-w-[280px] text-sm leading-6">
              Hold the top of your phone against the V-TAG attached to the
              vehicle.
            </p>

            <p className="theme-subtle mt-5 text-xs">Waiting for V-TAG...</p>
          </div>
        )}

        {/* MANUAL TYPE */}

        {method === 'manual' && manualStep === 'type' && (
          <div className="mt-6">
            <BackButton onClick={() => setMethod(null)} />

            <h3 className="mt-5 text-xl font-bold">What are you adding?</h3>

            <p className="theme-muted mt-2 text-sm">
              Select the type of vehicle or asset.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {vehicleTypes.map((option) => (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => selectVehicleType(option.type)}
                  className="theme-card-secondary flex min-h-[110px] flex-col items-center justify-center rounded-2xl border p-4 text-center transition active:scale-[0.98]"
                >
                  <span className="text-[#c1efa3]">{option.icon}</span>

                  <span className="mt-3 text-sm font-semibold">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MANUAL DETAILS */}

        {method === 'manual' && manualStep === 'details' && (
          <div className="mt-6">
            <BackButton onClick={() => setManualStep('type')} />

            <h3 className="mt-5 text-xl font-bold">Vehicle Details</h3>

            <p className="theme-muted mt-2 text-sm">
              Enter the core identity of the vehicle.
            </p>

            <div className="mt-6 space-y-4">
              <FormField
                label="MANUFACTURER"
                value={make}
                onChange={setMake}
                placeholder="BMW"
                error={
                  detailsAttempted && !make.trim()
                    ? 'Manufacturer is required.'
                    : undefined
                }
              />

              <FormField
                label="MODEL"
                value={model}
                onChange={setModel}
                placeholder="M135i"
                error={
                  detailsAttempted && !model.trim()
                    ? 'Model is required.'
                    : undefined
                }
              />

              <FormField
                label="DERIVATIVE"
                value={derivative}
                onChange={setDerivative}
                placeholder="2.0 M135i Auto xDrive"
                error={
                  detailsAttempted && !derivative.trim()
                    ? 'Derivative is required.'
                    : undefined
                }
              />

              <FormField
                label="NICKNAME"
                value={nickname}
                onChange={setNickname}
                placeholder="Optional"
              />

              <FormField
                label="REGISTRATION"
                value={registration}
                onChange={(value) => setRegistration(value.toUpperCase())}
                placeholder="Optional"
              />

              <FormField
                label="VIN / IDENTIFIER"
                value={vin}
                onChange={(value) => setVin(value.toUpperCase())}
                placeholder="Optional"
                error={
                  detailsAttempted && !vin.trim()
                    ? 'VIN is required.'
                    : undefined
                }
              />

              <FormField
                label="YEAR"
                value={year}
                onChange={setYear}
                placeholder="2026"
                type="number"
                error={
                  detailsAttempted && !year.trim()
                    ? 'Year is required.'
                    : undefined
                }
              />

              <div>
                <label className={labelClass}>USAGE TYPE</label>

                <select
                  value={usageType}
                  onChange={(event) =>
                    setUsageType(event.target.value as UsageType)
                  }
                  className={inputClass}
                >
                  <option value="mileage">Miles</option>

                  <option value="kilometres">Kilometres</option>

                  <option value="hours">Operating Hours</option>
                </select>
              </div>

              <FormField
                label="CURRENT USAGE"
                value={usageValue}
                onChange={setUsageValue}
                placeholder="10552"
                type="number"
              />
            </div>

            <PrimaryButton
              onClick={() => {
                setDetailsAttempted(true)

                if (!make.trim() || !model.trim()) {
                  return
                }

                setDetailsAttempted(false)
                setManualStep('technical')
              }}
            >
              Continue
            </PrimaryButton>
          </div>
        )}

        {/* TECHNICAL */}

        {method === 'manual' && manualStep === 'technical' && (
          <div className="mt-6">
            <BackButton onClick={() => setManualStep('details')} />

            <h3 className="mt-5 text-xl font-bold">Technical Details</h3>

            <p className="theme-muted mt-2 text-sm">
              Add further information if known. These fields are optional.
            </p>

            <div className="mt-6 space-y-4">
              <FormField
                label="FUEL / POWER SOURCE"
                value={fuelType}
                onChange={setFuelType}
                placeholder="Petrol"
              />

              <FormField
                label="TRANSMISSION"
                value={transmission}
                onChange={setTransmission}
                placeholder="Automatic"
              />

              <FormField
                label="ENGINE / MOTOR"
                value={engineSize}
                onChange={setEngineSize}
                placeholder="2.0L"
              />

              <FormField
                label="POWER"
                value={power}
                onChange={setPower}
                placeholder="306 bhp"
              />

              <FormField
                label="COLOUR"
                value={colour}
                onChange={setColour}
                placeholder="Black"
              />
            </div>

            <PrimaryButton onClick={() => setManualStep('review')}>
              Review Vehicle
            </PrimaryButton>
          </div>
        )}

        {/* REVIEW */}

        {method === 'manual' && manualStep === 'review' && vehicleType && (
          <div className="mt-6">
            <BackButton onClick={() => setManualStep('technical')} />

            <p className="theme-subtle mt-5 text-xs tracking-widest">
              REVIEW VEHICLE
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {make} {model}
            </h3>

            {derivative && (
              <p className="theme-muted mt-1 text-sm">{derivative}</p>
            )}

            <div className="theme-card-secondary mt-6 rounded-3xl p-5">
              <ReviewRow
                label="Vehicle Type"
                value={
                  vehicleTypes.find((item) => item.type === vehicleType)
                    ?.label || vehicleType
                }
              />

              <ReviewRow
                label="Registration"
                value={registration || 'Not recorded'}
              />

              <ReviewRow label="Year" value={year || 'Not recorded'} />

              <ReviewRow
                label="VIN / Identifier"
                value={vin || 'Not recorded'}
              />

              <ReviewRow label="Nickname" value={nickname || 'Not recorded'} />

              <ReviewRow
                label="Usage"
                value={
                  usageValue
                    ? `${Number(usageValue).toLocaleString(
                        'en-GB',
                      )} ${usageLabel(usageType)}`
                    : 'Not recorded'
                }
              />

              <ReviewRow label="Colour" value={colour || 'Not recorded'} />
            </div>

            <button
              type="button"
              onClick={handleCreateVehicle}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#c1efa3] px-5 py-4 font-bold text-black transition active:scale-[0.98]"
            >
              <Check size={19} />
              Add to Garage
            </button>

            <button
              type="button"
              onClick={() => setManualStep('details')}
              className="theme-muted mt-4 w-full text-center text-sm"
            >
              Edit details
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function MethodButton({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="theme-card-secondary flex w-full items-center gap-4 rounded-2xl p-4 text-left"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#c1efa3]/10 text-[#c1efa3]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="font-bold">{title}</p>

        <p className="theme-muted mt-1 text-xs">{description}</p>
      </div>
    </button>
  )
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  error?: string
}) {
  return (
    <div>
      <label className="theme-subtle text-xs font-semibold tracking-widest">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`theme-card-secondary mt-2 w-full rounded-2xl border px-4 py-3 outline-none transition ${
          error ? 'border-red-500 focus:border-red-500' : ''
        }`}
      />

      {error && (
        <p className="mt-2 text-xs font-medium text-red-400">{error}</p>
      )}
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-5 border-b py-3 last:border-b-0">
      <span className="theme-muted text-sm">{label}</span>

      <span className="max-w-[55%] break-words text-right text-sm font-semibold">
        {value}
      </span>
    </div>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="theme-muted text-sm">
      ← Back
    </button>
  )
}

function PrimaryButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="mt-6 w-full rounded-2xl bg-[#c1efa3] px-5 py-4 font-bold text-black transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  )
}

function usageLabel(usageType: UsageType) {
  switch (usageType) {
    case 'mileage':
      return 'miles'

    case 'kilometres':
      return 'km'

    case 'hours':
      return 'hours'
  }
}

export default AddVehicleModal
