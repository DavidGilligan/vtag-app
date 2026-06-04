import { ShieldCheck, Wifi } from 'lucide-react'
import hero from '../assets/hero.png'

function VehicleCard() {
  return (
    <section className="px-5">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest text-zinc-500">VEHICLE</p>
          <h1 className="mt-1 text-3xl font-bold">MY VEHICLE</h1>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-900/30 px-3 py-2 text-xs text-green-400">
          <ShieldCheck size={14} />
          VERIFIED
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-3xl bg-zinc-900">
        <div className="relative">
          <img
            src={hero}
            alt="BMW M135i"
            className="block w-full object-cover"
          />

          <div className="absolute right-4 top-4 rounded-full bg-black/70 p-3">
            <Wifi size={18} />
          </div>
        </div>

        <div className="px-5 pb-5 pt-2">
          <h2 className="text-xl font-bold">BMW M135i</h2>

          <p className="mt-2 text-sm text-zinc-400">
            Registration: AB12 CDE
          </p>
        </div>
      </div>
    </section>
  )
}

export default VehicleCard