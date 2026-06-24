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



function Home() {
  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <div className="mt-4">
          <VehicleCard />
        </div>

        <section className="mt-6 space-y-3 px-5">
          <Link to="/vehicle-identity" className="block">
            <FeatureCard
              icon={<img
                      src={Fingerprint}
                      alt="Vehicle Identity"
                      className="h-8 w-10 scale-200 object-contain -translate-x-0.5"
                    />}
              title="Vehicle Identity"
              description="View verification and authenticity"
            />
          </Link>

          <FeatureCard
              icon={<img
                      src={Document}
                      alt="Vehicle Identity"
                      className="h-8 w-10 scale-200 object-contain"
                    />}          
            title="History"
            description="View recorded history"
          />

          <FeatureCard
              icon={<img
                      src={Spanner}
                      alt="Services"
                      className="h-8 w-10 scale-200 object-contain"
                    />}      
            title="Services"
            description="View service records"
          />

          <Link to="/gallery" className="block">
            <FeatureCard
              icon={<img
                      src={Gallery}
                      alt="Gallery"
                      className="h-8 w-10 scale-200 object-contain"
                    />}   
              title="Gallery"
              description="View photos"
            />
          </Link>

          <Link to="/settings" className="block">
            <FeatureCard
              icon={<img
                      src={Settings}
                      alt="Settings"
                      className="h-8 w-10 scale-200 object-contain"
                    />}   
              title="Settings"
              description="Manage your preferences"
            />
          </Link>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

export default Home