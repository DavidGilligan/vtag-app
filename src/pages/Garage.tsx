import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'

function Garage() {
  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <section className="px-5 pt-2">
          <p className="theme-subtle text-xs tracking-widest">
            GARAGE
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            MY GARAGE
          </h1>

          <p className="theme-muted mt-2 text-sm">
            View and manage vehicles connected to your account.
          </p>
        </section>

        <section className="mt-6 px-5">
          <div className="theme-card rounded-3xl p-5">
            <p className="theme-subtle text-xs tracking-widest">
              ACTIVE VEHICLE
            </p>

            <h2 className="mt-2 text-xl font-bold">
              BMW M135i
            </h2>

            <p className="theme-muted mt-2 text-sm">
              Verified vehicle profile with service history, document scans and timeline records.
            </p>
          </div>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

export default Garage