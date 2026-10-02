import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

interface IdentityNavCardProps {
  icon: ReactNode
  title: string
  description: string
}

function IdentityNavCard({ icon, title, description }: IdentityNavCardProps) {
  return (
    <div
      className="
        theme-card
        flex h-full min-h-[145px]
        flex-col
        rounded-2xl
        p-4
        transition
        active:scale-[0.98]
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-[#c1f89f]">{icon}</div>

        <ChevronRight
          size={18}
          strokeWidth={1.8}
          className="theme-subtle shrink-0"
        />
      </div>

      <div className="mt-auto pt-5">
        <h3 className="text-base font-bold leading-tight">{title}</h3>

        <p className="theme-muted mt-1.5 text-xs leading-snug">{description}</p>
      </div>
    </div>
  )
}

export default IdentityNavCard
