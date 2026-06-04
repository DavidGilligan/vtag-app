import { Bell, Menu } from 'lucide-react'

function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-5">
      <button className="rounded-full bg-zinc-900 p-3 text-white">
        <Menu size={22} />
      </button>

      <div className="text-lg font-bold tracking-[0.35em] text-white">
        V-TAG
      </div>

      <button className="rounded-full bg-zinc-900 p-3 text-white">
        <Bell size={22} />
      </button>
    </header>
  )
}

export default Header