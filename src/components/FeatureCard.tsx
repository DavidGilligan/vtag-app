import type { ReactNode } from 'react'

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <button
      className="
        theme-card
        flex h-full min-h-[190px] w-full
        flex-col items-center
        rounded-2xl
        px-4 py-4
        text-center
        transition
        active:scale-[0.98]
      "
    >
      {/* Large icon area */}
      <div className="flex min-h-0 flex-1 items-center justify-center">
        {icon}
      </div>

      {/* Text */}
      <div className="shrink-0 pb-1">
        <h3 className="text-base font-semibold leading-tight">{title}</h3>

        <p className="theme-muted mt-1.5 text-sm leading-snug">{description}</p>
      </div>
    </button>
  )
}

export default FeatureCard
