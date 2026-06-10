import { Home, ScanLine, Car, User, CirclePoundSterling } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function BottomNav() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-1 transition ${
      isActive ? 'opacity-100' : 'opacity-45'
    }`

  return (
    <nav className="theme-nav fixed bottom-0 left-0 right-0 z-50 border-t px-2 py-3 md:left-1/2 md:w-[430px] md:-translate-x-1/2 md:rounded-b-[2.5rem]">
      <div className="mx-auto flex max-w-md items-center justify-around">
        <NavLink to="/" className={navClass}>
          <Home size={21} />
          <span className="text-[9px] font-semibold">HOME</span>
        </NavLink>

        <NavLink to="/scan" className={navClass}>
          <ScanLine size={21} />
          <span className="text-[9px] font-semibold">SCAN</span>
        </NavLink>

        <NavLink to="/v-mart" className={navClass}>
          <CirclePoundSterling size={21} />
          <span className="text-[9px] font-semibold">V-MART</span>
        </NavLink>

        <NavLink to="/garage" className={navClass}>
          <Car size={21} />
          <span className="text-[9px] font-semibold">GARAGE</span>
        </NavLink>

        <NavLink to="/profile" className={navClass}>
          <User size={21} />
          <span className="text-[9px] font-semibold">PROFILE</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default BottomNav