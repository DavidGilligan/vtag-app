export type VehicleType =
  | 'car'
  | 'motorcycle'
  | 'van'
  | 'camper'
  | 'truck'
  | 'agricultural'
  | 'construction'
  | 'track'
  | 'boat'
  | 'other'

export type VerificationStatus =
  | 'verified'
  | 'pending'
  | 'unverified'

export type UsageType =
  | 'mileage'
  | 'kilometres'
  | 'hours'

export interface VehicleUsage {
  type: UsageType
  value: number
}

export interface Vehicle {
  id: string

  vehicleType: VehicleType

  make: string
  model: string
  derivative?: string
  nickname?: string

  registration?: string
  vin?: string

  year?: number

  usage?: VehicleUsage

  fuelType?: string
  transmission?: string
  engineSize?: string
  power?: string
  colour?: string

  verificationStatus: VerificationStatus

export interface VehicleImages {
  garage?: string
  home?: string
}

export interface Vehicle {
  id: string
  vehicleType: VehicleType
  make: string
  model: string
  derivative?: string
  nickname?: string
  registration?: string
  vin?: string
  year?: number
  usage?: VehicleUsage
  fuelType?: string
  transmission?: string
  engineSize?: string
  power?: string
  colour?: string
  verificationStatus: VerificationStatus

  images?: VehicleImages

  selected?: boolean
}

  selected?: boolean
}