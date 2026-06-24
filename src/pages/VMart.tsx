import vehiclesell from '../assets/icons/dm_markets.svg'
import parts from '../assets/icons/dm_parts.svg'
import garages from '../assets/icons/dm_workshop.svg'
import insurance from '../assets/icons/dm_insurance.svg'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'

function VMart() {
  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">
            V-MART
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            V-MART
          </h1>

          <p className="theme-muted mt-2 text-sm">
            Buy, sell, arrange services and shop vehicle-related products.
          </p>
        </section>

        <section className="mt-6 space-y-5 px-5">
          <VMartSection title="Vehicles" icon={vehiclesell}>
            <ActionButton label="Buying" />
            <ActionButton label="Selling" />
          </VMartSection>

          <VMartSection title="Parts" icon={parts}>
            <ActionButton label="Buying" />
            <ActionButton label="Selling" />
          </VMartSection>

          <div className="grid grid-cols-2 gap-5">
            <SquareTile
              title="Garages"
              icon={garages}
              label="Garage Appointment"
            />

            <SquareTile
              title="Insurance"
              icon={insurance}
              label="Compare Your Insurance"
            />
          </div>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

type VMartSectionProps = {
  title: string
  icon: string
  children: React.ReactNode
}

function VMartSection({ title, icon, children }: VMartSectionProps) {
  return (
    <section className="theme-card rounded-3xl p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="theme-card-secondary flex h-20 w-20 items-center justify-center rounded-2xl">
          <img
            src={icon}
            alt={title}
            className="h-14 w-14 object-contain"
          />
        </div>

        <h2 className="text-lg font-bold">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {children}
      </div>
    </section>
  )
}

type SquareTileProps = {
  title: string
  icon: string
  label: string
}

function SquareTile({ title, icon, label }: SquareTileProps) {
  return (
    <section className="theme-card aspect-square rounded-3xl p-4 flex flex-col justify-between">
      <div>
        <div className="theme-card-secondary mb-3 flex h-20 w-20 items-center justify-center rounded-2xl">
          <img
            src={icon}
            alt={title}
            className="h-14 w-14 object-contain"
          />
        </div>

        <h2 className="text-base font-bold">
          {title}
        </h2>
      </div>

      <button className="theme-card-secondary w-full rounded-2xl p-3 text-center text-sm font-semibold">
        {label}
      </button>
    </section>
  )
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="theme-card-secondary aspect-square w-full rounded-2xl p-4 flex items-center justify-center text-center font-semibold">
      {label}
    </button>
  )
}

export default VMart