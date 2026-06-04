import Header from '../components/Header'
import BottomNav from '../components/BottomNav'

function Profile() {
  return (
    <main className="min-h-screen bg-[#050606] pb-28 text-white">
      <Header />

      <section className="px-5 pt-6">
        <p className="text-xs tracking-widest text-zinc-500">
          PROFILE
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          MY PROFILE
        </h1>
      </section>

      <BottomNav />
    </main>
  )
}

export default Profile