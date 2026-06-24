import { NavLink } from 'react-router-dom'
import Garage from '../assets/icons/dm_garage.svg'
import Vehicle from '../assets/icons/dm_analytics.svg'
import Scan from '../assets/icons/dm_upload.svg'
import Reminders from '../assets/icons/dm_timeline.svg'
import Market from '../assets/icons/dm_markets.svg'

function BottomNav() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex h-14 w-14 items-center justify-center transition ${
      isActive ? 'opacity-100' : 'opacity-55'
    }`

const scanClass = ({ isActive }: { isActive: boolean }) =>
  `relative -mt-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition ${
    isActive
      ? 'border-[#c1efa3] bg-[#050606] opacity-100'
      : 'border-zinc-700 bg-[#050606] opacity-100'
  }`


  return (
    <nav className="theme-nav fixed bottom-0 left-0 right-0 z-50 border-t px-3 py-2 md:left-1/2 md:w-[430px] md:-translate-x-1/2 md:rounded-b-[2.5rem]">
      <div className="mx-auto flex max-w-md items-center justify-between">
        <NavLink to="/" className={navClass}>
          <img
            src={Vehicle}
            alt="Vehicle"
            className="h-14 w-14 object-contain"
          />
        </NavLink>

        <NavLink to="/garage" className={navClass}>
          <img
            src={Garage}
            alt="Garage"
            className="h-14 w-14 object-contain"
          />
        </NavLink>

        <NavLink to="/scan" className={scanClass}>
          <img
            src={Scan}
            alt="Scan"
            className="h-12 w-12 object-contain"
          />
        </NavLink>

        <NavLink to="/profile" className={navClass}>
          <img
            src={Reminders}
            alt="Reminders"
            className="h-14 w-14 object-contain"
          />
        </NavLink>

        <NavLink to="/v-mart" className={navClass}>
          <img
            src={Market}
            alt="V-Mart"
            className="h-14 w-14 object-contain"
          />
        </NavLink>
      </div>
    </nav>
  )
}

export default BottomNav