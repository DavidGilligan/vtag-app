import { useState } from 'react'
import { CheckCircle, ShieldCheck } from 'lucide-react'
import dmSignal from '../assets/icons/dm_signal.svg'
import hero from '../assets/hero.png'

function VehicleCard() {
  const [mileage, setMileage] = useState('')
  const [stored, setStored] = useState(false)

  function handleLogMileage() {
    if (!mileage.trim()) return
    setStored(true)
  }

  return (
    <section className="px-5">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="theme-subtle text-xs tracking-widest">
            VEHICLE
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            MY VEHICLE
          </h1>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-900/30 px-3 py-2 text-xs text-green-400">
          <ShieldCheck size={14} />
          VERIFIED
        </div>
      </div>

      <div className="theme-card mt-4 overflow-hidden rounded-3xl">
        <div className="relative">
          <img
            src={hero}
            alt="BMW M135i"
            className="block w-full object-cover"
          />

          <div className="absolute right-3 top-3 rounded-full bg-black/70 p-0.5">
            <img
              src={dmSignal}
              alt="V-TAG Signal"
              className="h-[36px] w-[36px] object-contain"
            />
          </div>
        </div>

        <div className="px-5 pb-5 pt-2">
          <h2 className="text-xl font-bold">
            BMW M135i
          </h2>

          <p className="theme-muted mt-2 text-sm">
            Registration: AB12 CDE
          </p>

          <div className="theme-card-secondary mt-5 rounded-2xl p-4">
            <p className="theme-subtle text-xs tracking-widest">
              TODAY&apos;S MILEAGE
            </p>

            {stored ? (
              <div className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-green-900/30 px-4 py-4 font-bold text-green-400">
                <CheckCircle size={20} />
                Stored!
              </div>
            ) : (
              <div className="mt-3 flex gap-2">
                <input
                  value={mileage}
                  onChange={(event) => setMileage(event.target.value)}
                  type="number"
                  placeholder="Enter mileage"
                  className="theme-bg min-w-0 flex-1 rounded-xl px-4 py-3 text-sm outline-none"
                />

                <button
                  onClick={handleLogMileage}
                  className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black"
                >
                  Log
                </button>
              </div>
            )}

            <p className="theme-muted mt-3 text-xs">
              Logging regular mileage is of benefit to you.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VehicleCard