import type { Vehicle } from '../types/vehicle'

import hero2 from '../assets/hero2.png'
import bikehero2 from '../assets/bikehero2.png'
import mazhero from '../assets/mazhero2.png'
import hillhero from '../assets/hillhero2.png'
import winhero from '../assets/winhero2.png'

export const devVehicles: Vehicle[] = [
  {
    id: 'bmw-m135i',
    registration: 'AB12 CDE',
    make: 'BMW',
    model: 'M135i',
    derivative: '2.0 M135i AUTO XDRIVE',
    usage: {
      type: 'mileage',
      value: 104000,
    },
    year: 2021,
    vehicleType: 'car',
    verificationStatus: 'verified',
    images: {
      garage: hero2,
      home: hero2,
    },
    selected: true,
  },

  {
    id: 'honda-fireblade',
    vehicleType: 'motorcycle',

    make: 'Honda',
    model: 'CBR1000RR',

    registration: 'B40 FRB',

    usage: {
      type: 'mileage',
      value: 12500,
    },

    verificationStatus: 'verified',

    images: {
      garage: bikehero2,
      home: bikehero2,
    },

    selected: false,
  },

  {
    id: 'mazda-mx5',
    registration: 'M4Z5 DUH',
    make: 'Mazda',
    model: 'MX-5',
    derivative: '2.0 Sport Tech 6-Speed Manual',
    usage: {
      type: 'mileage',
      value: 43103,
    },
    year: 2023,
    vehicleType: 'car',
    verificationStatus: 'verified',
    images: {
      garage: mazhero,
      home: mazhero,
    },
  },

  {
    id: 'hillman-imp',
    registration: 'JSL 427K',
    make: 'Hillman',
    model: 'Imp',
    derivative: '875cc Super Manual',
    usage: {
      type: 'mileage',
      value: 49605,
    },
    year: 1971,
    vehicleType: 'car',
    verificationStatus: 'verified',
    images: {
      garage: hillhero,
      home: hillhero,
    },
  },

  {
    id: 'winnebago-revel',
    registration: 'RO4M ER5',
    make: 'Winnebago',
    model: 'Revel',
    derivative: '2.0 Turbo Diesel Auto 44E AWD',
    usage: {
      type: 'mileage',
      value: 99102,
    },
    year: 2024,
    vehicleType: 'camper',
    verificationStatus: 'verified',
    images: {
      garage: winhero,
      home: winhero,
    },
  },
]
