import type { ReactNode } from 'react'

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <button className="theme-card w-full rounded-2xl p-4 text-left transition">
      <div className="flex items-center gap-4">
        <div className="theme-card-secondary rounded-xl p-3">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="theme-muted mt-1 text-sm">
            {description}
          </p>
        </div>
      </div>
    </button>
  )
}

export default FeatureCard