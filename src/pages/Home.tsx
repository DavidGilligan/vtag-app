import Header from '../components/Header'
import VehicleCard from '../components/VehicleCard'
import FeatureCard from '../components/FeatureCard'
import BottomNav from '../components/BottomNav'

import {
  Shield,
  FileText,
  Wrench,
  Image,
  Settings,
} from 'lucide-react'

function Home() {
  return (
    <main className="min-h-screen bg-[#050606] pb-28 text-white">
      <Header />

      <div className="mt-4">
        <VehicleCard />
      </div>

      <section className="mt-6 space-y-3 px-5">
        <FeatureCard
          icon={<Shield size={20} />}
          title="Vehicle Identity"
          description="View verification and authenticity"
        />

        <FeatureCard
          icon={<FileText size={20} />}
          title="History"
          description="View recorded history"
        />

        <FeatureCard
          icon={<Wrench size={20} />}
          title="Services"
          description="View service records"
        />

        <FeatureCard
          icon={<Image size={20} />}
          title="Gallery"
          description="View photos"
        />

        <FeatureCard
          icon={<Settings size={20} />}
          title="Settings"
          description="Manage your preferences"
        />
      </section>

      <BottomNav />
    </main>
  )
}

export default Home