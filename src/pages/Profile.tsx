import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'

function Profile() {
  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">
            PROFILE
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            MY PROFILE
          </h1>

          <p className="theme-muted mt-2 text-sm">
            Manage your account, vehicle access and document preferences.
          </p>
        </section>

        <section className="mt-6 space-y-3 px-5">
          <div className="theme-card rounded-3xl p-5">
            <p className="theme-subtle text-xs tracking-widest">
              ACCOUNT
            </p>

            <h2 className="mt-2 text-xl font-bold">
              David Gilligan
            </h2>

            <p className="theme-muted mt-2 text-sm">
              Prototype user account
            </p>
          </div>

          <div className="theme-card rounded-3xl p-5">
            <p className="theme-subtle text-xs tracking-widest">
              STATUS
            </p>

            <h2 className="mt-2 text-xl font-bold text-green-400">
              Verified
            </h2>

            <p className="theme-muted mt-2 text-sm">
              Vehicle document management enabled.
            </p>
          </div>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

export default Profile