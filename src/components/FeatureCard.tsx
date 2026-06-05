import type { ReactNode } from 'react'

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
}

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <button className="w-full rounded-2xl bg-zinc-900 p-4 text-left transition hover:bg-zinc-800">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-zinc-800 p-3">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            {description}
          </p>
        </div>
      </div>
    </button>
  )
}

export default FeatureCard