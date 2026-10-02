import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/vtag-logo.svg'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(event: React.FormEvent) {
    event.preventDefault()

    // Backend authentication will go here.
    console.log({
      email,
      password,
    })

    // TEMPORARY while we connect the backend:
    navigate('/home')
  }

  return (
    <main className="theme-bg flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-[420px]">

        <div className="flex justify-center">
          <img
            src={logo}
            alt="V-TAG"
            className="h-28 w-auto object-contain"
          />
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-bold">
            Log In
          </h1>

          <p className="theme-muted mt-2 text-sm">
            Welcome back.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-4"
        >
          <div>
            <label className="theme-subtle mb-2 block text-xs font-bold tracking-widest">
              EMAIL
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              required
              className="theme-card w-full rounded-2xl border px-4 py-4 outline-none"
            />
          </div>

          <div>
            <label className="theme-subtle mb-2 block text-xs font-bold tracking-widest">
              PASSWORD
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
              className="theme-card w-full rounded-2xl border px-4 py-4 outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs font-semibold text-[#c1efa3]"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#c1efa3] px-5 py-4 font-bold text-black transition active:scale-[0.98]"
          >
            Log In
          </button>
        </form>

        <p className="theme-muted mt-7 text-center text-sm">
          Don't have a V-TAG account?{' '}
          <Link
            to="/signup"
            className="font-bold text-[#c1efa3]"
          >
            Sign Up
          </Link>
        </p>

        <div className="mt-6 text-center">
          <Link
            to="/welcome"
            className="theme-subtle text-xs"
          >
            ← Back
          </Link>
        </div>

      </div>
    </main>
  )
}

export default Login