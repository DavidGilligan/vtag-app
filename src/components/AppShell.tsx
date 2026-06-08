import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

function AppShell({ children }: AppShellProps) {
  return (
    <div className="theme-outer min-h-screen md:flex md:justify-center md:py-8">
      <div className="theme-bg min-h-screen w-full md:min-h-[850px] md:max-w-[430px] md:overflow-y-auto md:rounded-[2.5rem] md:border md:border-zinc-800 md:shadow-2xl">
        {children}
      </div>
    </div>
  )
}

export default AppShell