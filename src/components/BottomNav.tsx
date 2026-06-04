import { Home, ScanLine, Car, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function BottomNav() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-1 transition ${
      isActive ? 'text-white' : 'text-zinc-500'
    }`

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-[#050606]">
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-3">
        <NavLink to="/" className={navClass}>
          <Home size={22} />
          <span className="text-[10px] font-semibold">HOME</span>
        </NavLink>

        <NavLink to="/scan" className={navClass}>
          <ScanLine size={22} />
          <span className="text-[10px] font-semibold">SCAN</span>
        </NavLink>

        <NavLink to="/garage" className={navClass}>
          <Car size={22} />
          <span className="text-[10px] font-semibold">GARAGE</span>
        </NavLink>

        <NavLink to="/profile" className={navClass}>
          <User size={22} />
          <span className="text-[10px] font-semibold">PROFILE</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default BottomNav