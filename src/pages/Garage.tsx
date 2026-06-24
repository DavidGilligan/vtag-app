import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import hero from '../assets/hero2.png'
import bikehero from '../assets/bikehero2.png'
import mazhero from '../assets/mazhero2.png'
import hillhero from '../assets/hillhero2.png'
import winhero from '../assets/winhero2.png'

function Garage() {
  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        <section className="px-5 pt-2">
          <p className="theme-subtle text-xs tracking-widest">
            GARAGE
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            MY GARAGE
          </h1>

          <p className="theme-muted mt-2 text-sm">
            View and manage vehicles connected to your account.
          </p>
        </section>

        <section className="mt-6 px-4">
          <div
            className="rounded-3xl p-6 mr-[-40px] overflow-hidden"
            style={{
              background:
                'linear-gradient(90deg, #1d1d21 0%, #1d1d21 30%, #0a0a0a 75%, #000 100%)',
            }}
          >
            <div className="flex items-start gap-10">
              <div className="shrink-0">
                <p className=" mt-3 text-4xl reg-plate text-white">
                  AB12 CDE
                </p>

                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: 'rgba(193, 239, 163, 0.12)', // 65% transparent
                    color: '#c1efa3',
                  }}
                >
                  Verified
                </span>
                
                <h2 className="mt-3 text-2xl font-bold">
                  BMW M135i
                </h2>

                <p className="mt-1 text-xs">
                  2.0 M135i AUTO XDRIVE
                </p>

                <p className="theme-subtle mt-3 text-xs">
                  104,000 miles
                </p>
                <p className="theme-subtle mt-1 text-xs">
                  Registered 2021
                </p>

                <span
                  className="inline-flex items-center rounded-full mt-4 px-3 py-1 text-s font-semibold"
                  style={{
                    backgroundColor: '#c1efa3', // 65% transparent
                    color: 'rgb(0, 0, 0)',
                  }}
                >
                  Selected
                </span>

              </div>

              <img
                src={hero}
                alt="BMW M135i"
                className="h-auto w-auto max-h-[220px] object-contain"
              />
            </div>
          </div>
        </section>
        <section className="mt-6 px-4">
          <div
            className="rounded-3xl p-6 mr-[-40px] overflow-hidden"
            style={{
              background:
                'linear-gradient(90deg, #1d1d21 0%, #1d1d21 30%, #0a0a0a 75%, #000 100%)',
            }}
          >
            <div className="flex items-start gap-10">
              <div className="shrink-0">
                <p className=" mt-3 text-4xl reg-plate text-white">
                  B40 FRB
                </p>

                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: 'rgba(193, 239, 163, 0.12)', // 65% transparent
                    color: '#c1efa3',
                  }}
                >
                  Verified
                </span>
                
                <h2 className="mt-3 text-2xl font-bold">
                  Honda CBR1000RR
                </h2>

                <p className="mt-1 text-xs">
                  R Fireblade SP 999cc 6-Speed Manual
                </p>

                <p className="theme-subtle mt-3 text-xs">
                  18,030 miles
                </p>
                <p className="theme-subtle mt-1 text-xs">
                  Registered 2024
                </p>

                <span
                  className="inline-flex items-center rounded-full mt-4 px-3 py-1 text-s font-semibold"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.59)', // 65% transparent
                    color: '#ffffffec',
                  }}
                >
                  Select Vehicle {'>'}
                </span>

              </div>

              <img
                src={bikehero}
                alt="BMW M135i"
                className="h-auto w-auto max-h-[220px] object-contain"
              />
            </div>
          </div>
        </section>
        <section className="mt-6 px-4">
          <div
            className="rounded-3xl p-6 mr-[-40px] overflow-hidden"
            style={{
              background:
                'linear-gradient(90deg, #1d1d21 0%, #1d1d21 30%, #0a0a0a 75%, #000 100%)',
            }}
          >
            <div className="flex items-start gap-10">
              <div className="shrink-0">
                <p className=" mt-3 text-4xl reg-plate text-white">
                  M4Z5 DUH
                </p>

                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: 'rgba(193, 239, 163, 0.12)', // 65% transparent
                    color: '#c1efa3',
                  }}
                >
                  Verified
                </span>
                
                <h2 className="mt-3 text-2xl font-bold">
                  Mazda MX-5
                </h2>

                <p className="mt-1 text-xs">
                  2.0 Sport Tech 6-Speed Manual
                </p>

                <p className="theme-subtle mt-3 text-xs">
                  43,103 miles
                </p>
                <p className="theme-subtle mt-1 text-xs">
                  Registered 2023
                </p>

                <span
                  className="inline-flex items-center rounded-full mt-4 px-3 py-1 text-s font-semibold"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.59)', // 65% transparent
                    color: '#ffffffec',
                  }}
                >
                  Select Vehicle {'>'}
                </span>

              </div>

              <img
                src={mazhero}
                alt="BMW M135i"
                className="h-auto w-auto max-h-[220px] object-contain"
              />
            </div>
          </div>
        </section>
        <section className="mt-6 px-4">
          <div
            className="rounded-3xl p-6 mr-[-40px] overflow-hidden"
            style={{
              background:
                'linear-gradient(90deg, #1d1d21 0%, #1d1d21 30%, #0a0a0a 75%, #000 100%)',
            }}
          >
            <div className="flex items-start gap-10">
              <div className="shrink-0">
                <p className=" mt-3 text-4xl reg-plate text-white">
                  JSL 427K
                </p>

                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: 'rgba(193, 239, 163, 0.12)', // 65% transparent
                    color: '#c1efa3',
                  }}
                >
                  Verified
                </span>
                
                <h2 className="mt-3 text-2xl font-bold">
                  Hillman Imp
                </h2>

                <p className="mt-1 text-xs">
                  875cc Super Manual
                </p>

                <p className="theme-subtle mt-3 text-xs">
                  49,605 miles
                </p>
                <p className="theme-subtle mt-1 text-xs">
                  Registered 1971
                </p>

                <span
                  className="inline-flex items-center rounded-full mt-4 px-3 py-1 text-s font-semibold"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.59)', // 65% transparent
                    color: '#ffffffec',
                  }}
                >
                  Select Vehicle {'>'}
                </span>

              </div>

              <img
                src={hillhero}
                alt="BMW M135i"
                className="h-auto w-auto max-h-[220px] object-contain"
              />
            </div>
          </div>
        </section>
<section className="mt-6 px-4">
  <div
    className="rounded-3xl p-6 mr-[-40px] overflow-hidden min-h-[360px]"
    style={{
      background:
        'linear-gradient(90deg, #1d1d21 0%, #1d1d21 30%, #0a0a0a 75%, #000 100%)',
    }}
  >
    <div className="flex items-center gap-10">
      <div className="shrink-0">
        <p className="mt-3 text-4xl reg-plate text-white">
          RO4M ER5
        </p>

        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: 'rgba(193, 239, 163, 0.12)',
            color: '#c1efa3',
          }}
        >
          Verified
        </span>

        <h2 className="mt-3 text-2xl font-bold">
          Winnebago Revel
        </h2>

        <p className="mt-1 text-xs">
          2.0 Turbo Diesel Auto 44E AWD
        </p>

        <p className="theme-subtle mt-3 text-xs">
          99,102 miles
        </p>

        <p className="theme-subtle mt-1 text-xs">
          Registered 2024
        </p>

        <span
          className="inline-flex items-center rounded-full mt-4 px-3 py-1 text-s font-semibold"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.59)',
            color: '#ffffffec',
          }}
        >
          Select Vehicle {'>'}
        </span>
      </div>

      <img
        src={winhero}
        alt="Winnebago Revel"
        className="h-[360px] w-auto max-w-none shrink-0 object-contain"
      />
    </div>
  </div>
</section>
        <BottomNav />
      </main>
    </AppShell>
  )
}

export default Garage