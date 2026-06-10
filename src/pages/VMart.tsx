import { Car, Wrench, Building2, ShieldCheck } from 'lucide-react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'

function VMart() {
  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">V-MART</p>
          <h1 className="mt-1 text-3xl font-bold">V-MART</h1>
          <p className="theme-muted mt-2 text-sm">
            Buy, sell, arrange services and shop vehicle-related products.
          </p>
        </section>

        <section className="mt-6 space-y-5 px-5">
          <VMartSection title="Vehicles" icon={<Car size={22} />}>
            <ActionButton label="Buying" />
            <ActionButton label="Selling" />
          </VMartSection>

          <VMartSection title="Parts" icon={<Wrench size={22} />}>
            <ActionButton label="Buying" />
            <ActionButton label="Selling" />
          </VMartSection>

          <VMartSection title="Garages" icon={<Building2 size={22} />}>
            <ActionButton label="Arrange for a Garage Appointment" />
          </VMartSection>

          <VMartSection title="Insurance" icon={<ShieldCheck size={22} />}>
            <ActionButton label="Shop the market for new insurance" />
          </VMartSection>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

type VMartSectionProps = {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

function VMartSection({ title, icon, children }: VMartSectionProps) {
  return (
    <section className="theme-card rounded-3xl p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="theme-card-secondary rounded-xl p-3">
          {icon}
        </div>

        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div className="space-y-3">{children}</div>
    </section>
  )
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="theme-card-secondary w-full rounded-2xl p-4 text-left font-semibold">
      {label}
    </button>
  )
}

export default VMart