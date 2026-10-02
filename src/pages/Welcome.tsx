import { useNavigate } from 'react-router-dom'
import logo from '../assets/vtag-logo.svg'

function Welcome() {
  const navigate = useNavigate()

  return (
    <main className="theme-bg flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">

        <div className="flex justify-center">
          <img
            src={logo}
            alt="V-TAG"
            className="h-32 w-auto object-contain"
          />
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-bold">
            Welcome to V-TAG
          </h1>

          <p className="theme-muted mt-3 text-sm">
            Your vehicle. Your history. Your V-TAG.
          </p>
        </div>

        <div className="mt-12 space-y-3">

          <button
            onClick={() => navigate('/login')}
            className="w-full rounded-2xl bg-[#c1efa3] px-5 py-4 font-bold text-black transition active:scale-[0.98]"
          >
            Log In
          </button>

          <button
            onClick={() => navigate('/signup')}
            className="theme-card w-full rounded-2xl border px-5 py-4 font-bold transition active:scale-[0.98]"
          >
            Sign Up
          </button>

        </div>

        <p className="theme-subtle mt-8 text-xs">
          Vehicle ownership, reimagined.
        </p>

      </div>
    </main>
  )
}

export default Welcome