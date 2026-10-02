import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/vtag-logo.svg'

function Signup() {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleSignup(event: React.FormEvent) {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    // Backend registration will go here.
    console.log({
      firstName,
      lastName,
      email,
      password,
    })

    // TEMPORARY until backend registration is connected:
    navigate('/home')
  }

  return (
    <main className="theme-bg flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-[420px]">

        <div className="flex justify-center">
          <img
            src={logo}
            alt="V-TAG"
            className="h-24 w-auto object-contain"
          />
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="theme-muted mt-2 text-sm">
            Join V-TAG and start building your vehicle history.
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="mt-8 space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="theme-subtle mb-2 block text-xs font-bold tracking-widest">
                FIRST NAME
              </label>

              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="First name"
                required
                className="theme-card w-full rounded-2xl border px-4 py-4 outline-none"
              />
            </div>

            <div>
              <label className="theme-subtle mb-2 block text-xs font-bold tracking-widest">
                LAST NAME
              </label>

              <input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Last name"
                required
                className="theme-card w-full rounded-2xl border px-4 py-4 outline-none"
              />
            </div>
          </div>

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
              placeholder="Create password"
              required
              className="theme-card w-full rounded-2xl border px-4 py-4 outline-none"
            />
          </div>

          <div>
            <label className="theme-subtle mb-2 block text-xs font-bold tracking-widest">
              CONFIRM PASSWORD
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm password"
              required
              className="theme-card w-full rounded-2xl border px-4 py-4 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#c1efa3] px-5 py-4 font-bold text-black transition active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <p className="theme-muted mt-7 text-center text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-[#c1efa3]"
          >
            Log In
          </Link>
        </p>

      </div>
    </main>
  )
}

export default Signup