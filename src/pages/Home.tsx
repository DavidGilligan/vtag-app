import { Link } from 'react-router-dom'
import Header from '../components/Header'
import VehicleCard from '../components/VehicleCard'
import FeatureCard from '../components/FeatureCard'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import Fingerprint from '../assets/icons/dm_fingprint.svg'
import Document from '../assets/icons/dm_document.svg'
import Spanner from '../assets/icons/dm_spanner.svg'
import Gallery from '../assets/icons/dm_gallery.svg'
import Settings from '../assets/icons/dm_settings.svg'
import { Plus } from 'lucide-react'

function Home() {
  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <div className="mt-4">
          <VehicleCard />
        </div>

        <section className="mt-6 grid grid-cols-2 gap-3 px-5">
          <Link to="/vehicle-identity" className="block h-full">
            <FeatureCard
              icon={
                <img
                  src={Fingerprint}
                  alt="Vehicle Identity"
                  className="h-8 w-10 scale-200 object-contain -translate-x-0.5"
                />
              }
              title="Vehicle Identity"
              description="View verification and authenticity"
            />
          </Link>

          <Link to="/gallery" className="block h-full">
            <FeatureCard
              icon={
                <img
                  src={Gallery}
                  alt="Gallery"
                  className="h-8 w-10 scale-200 object-contain"
                />
              }
              title="Gallery"
              description="View photos"
            />
          </Link>

          <Link to="/vehicle-settings" className="block h-full">
            <FeatureCard
              icon={
                <img
                  src={Settings}
                  alt="Vehicle Settings"
                  className="h-8 w-10 scale-200 object-contain"
                />
              }
              title="Vehicle Settings"
              description="Manage your vehicle preferences"
            />
          </Link>
          <Link to="/add-information" className="block h-full">
            <FeatureCard
              icon={
                <Plus size={38} strokeWidth={1.8} className="text-[#c1f89f]" />
              }
              title="Add Information"
              description="Add records and vehicle information"
            />
          </Link>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

export default Home
