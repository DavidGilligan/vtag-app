import { useMemo, useState, type ReactNode } from 'react'
import {
  Armchair,
  Check,
  ChevronDown,
  ChevronUp,
  CircleGauge,
  Search,
  ShieldCheck,
  Speaker,
  Smartphone,
  Sparkles,
} from 'lucide-react'

import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import AppShell from '../components/AppShell'
import { useVehicles } from '../context/VehicleContext'

type EquipmentSource = 'manufacturer' | 'vin' | 'document' | 'unconfirmed'

type EquipmentItem = {
  id: string
  name: string
  description?: string
  optionCode?: string
  source: EquipmentSource
}

type EquipmentCategory = {
  id: string
  title: string
  icon: ReactNode
  items: EquipmentItem[]
}

/*
 * Prototype fixture data only.
 *
 * Do not treat these items as confirmed equipment for the selected
 * vehicle. Eventually this should come from canonical manufacturer,
 * VIN/build-sheet or verified-document data.
 */
const equipmentCategories: EquipmentCategory[] = [
  {
    id: 'interior',
    title: 'Interior & Comfort',
    icon: <Armchair size={20} strokeWidth={1.6} />,
    items: [
      {
        id: 'sports-seats',
        name: 'Sports Seats',
        description: 'Front sports seating',
        source: 'unconfirmed',
      },
      {
        id: 'climate-control',
        name: 'Automatic Climate Control',
        description: 'Automatic cabin temperature control',
        source: 'unconfirmed',
      },
      {
        id: 'ambient-lighting',
        name: 'Ambient Interior Lighting',
        source: 'unconfirmed',
      },
    ],
  },
  {
    id: 'technology',
    title: 'Technology',
    icon: <Smartphone size={20} strokeWidth={1.6} />,
    items: [
      {
        id: 'navigation',
        name: 'Navigation System',
        source: 'unconfirmed',
      },
      {
        id: 'smartphone-integration',
        name: 'Smartphone Integration',
        source: 'unconfirmed',
      },
      {
        id: 'digital-display',
        name: 'Digital Driver Display',
        source: 'unconfirmed',
      },
    ],
  },
  {
    id: 'audio',
    title: 'Audio',
    icon: <Speaker size={20} strokeWidth={1.6} />,
    items: [
      {
        id: 'audio-system',
        name: 'Factory Audio System',
        source: 'unconfirmed',
      },
    ],
  },
  {
    id: 'exterior',
    title: 'Exterior',
    icon: <Sparkles size={20} strokeWidth={1.6} />,
    items: [
      {
        id: 'alloy-wheels',
        name: 'Factory Alloy Wheels',
        source: 'unconfirmed',
      },
      {
        id: 'led-lighting',
        name: 'LED Exterior Lighting',
        source: 'unconfirmed',
      },
    ],
  },
  {
    id: 'driver-assistance',
    title: 'Driver Assistance',
    icon: <CircleGauge size={20} strokeWidth={1.6} />,
    items: [
      {
        id: 'parking-sensors',
        name: 'Parking Assistance',
        source: 'unconfirmed',
      },
      {
        id: 'cruise-control',
        name: 'Cruise Control',
        source: 'unconfirmed',
      },
    ],
  },
]

function FactoryEquipment() {
  const { selectedVehicle } = useVehicles()
  const [search, setSearch] = useState('')
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    'interior',
  )

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return equipmentCategories
    }

    return equipmentCategories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          `${item.name} ${item.description || ''}`
            .toLowerCase()
            .includes(query),
        ),
      }))
      .filter((category) => category.items.length > 0)
  }, [search])

  if (!selectedVehicle) {
    return (
      <AppShell>
        <main className="theme-bg min-h-screen pb-28">
          <Header />

          <section className="px-5 pt-6">
            <p className="theme-subtle text-xs tracking-widest">
              FACTORY EQUIPMENT
            </p>

            <div className="theme-card mt-5 rounded-3xl p-5">
              <h1 className="text-xl font-bold">No vehicle selected</h1>

              <p className="theme-muted mt-2 text-sm">
                Select a vehicle from your garage to view its factory equipment.
              </p>
            </div>
          </section>

          <BottomNav />
        </main>
      </AppShell>
    )
  }

  const vehicleName = `${selectedVehicle.make} ${selectedVehicle.model}`

  const equipmentCount = equipmentCategories.reduce(
    (total, category) => total + category.items.length,
    0,
  )

  function toggleCategory(categoryId: string) {
    setExpandedCategory((current) =>
      current === categoryId ? null : categoryId,
    )
  }

  return (
    <AppShell>
      <main className="theme-bg min-h-screen pb-28">
        <Header />

        {/* PAGE HEADER */}
        <section className="px-5 pt-6">
          <p className="theme-subtle text-xs tracking-widest">
            FACTORY EQUIPMENT
          </p>

          <h1 className="mt-2 text-3xl font-bold">{vehicleName}</h1>

          <p className="theme-muted mt-2 text-sm">
            Original manufacturer equipment and vehicle options.
          </p>
        </section>

        {/* SUMMARY */}
        <section className="mt-6 px-5">
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              p-5
            "
            style={{
              background:
                'linear-gradient(90deg, #1d1d21 0%, #1d1d21 30%, #0a0a0a 75%, #000 100%)',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="theme-subtle text-[10px] uppercase tracking-wider">
                  ORIGINAL EQUIPMENT
                </p>

                <p className="mt-1 text-3xl font-bold">{equipmentCount}</p>

                <p className="theme-muted mt-2 text-xs">
                  Equipment items currently recorded
                </p>
              </div>

              <ShieldCheck
                size={42}
                strokeWidth={1.2}
                className="text-[#c1f89f]"
              />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                <SummaryValue
                  label="Categories"
                  value={`${equipmentCategories.length}`}
                />

                <SummaryValue label="Equipment" value={`${equipmentCount}`} />

                <SummaryValue label="Source" value="Prototype" />

                <SummaryValue label="Confirmation" value="Pending" />
              </div>
            </div>
          </div>
        </section>

        {/* IMPORTANT PROTOTYPE NOTICE */}
        <section className="mt-4 px-5">
          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              p-4
            "
          >
            <p className="text-xs font-semibold">
              Factory specification not yet confirmed
            </p>

            <p className="theme-muted mt-1 text-xs leading-relaxed">
              Equipment shown during development is sample data. Production
              records should be confirmed from a manufacturer, VIN/build record
              or verified document.
            </p>
          </div>
        </section>

        {/* SEARCH */}
        <section className="mt-6 px-5">
          <div
            className="
              theme-card
              flex items-center gap-3
              rounded-2xl
              px-4 py-3
            "
          >
            <Search
              size={18}
              strokeWidth={1.7}
              className="theme-subtle shrink-0"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search equipment"
              className="
                min-w-0 flex-1
                bg-transparent
                text-sm
                outline-none
                placeholder:text-zinc-600
              "
            />
          </div>
        </section>

        {/* EQUIPMENT CATEGORIES */}
        <section className="mt-7 px-5">
          <p className="theme-subtle text-xs tracking-widest">EQUIPMENT</p>

          <div className="mt-3 space-y-3">
            {filteredCategories.map((category) => {
              const expanded = expandedCategory === category.id

              return (
                <article
                  key={category.id}
                  className="
                    theme-card
                    overflow-hidden
                    rounded-2xl
                  "
                >
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="
                      flex w-full
                      items-center gap-4
                      p-4
                      text-left
                    "
                  >
                    <div
                      className="
                        theme-card-secondary
                        flex h-11 w-11
                        shrink-0
                        items-center justify-center
                        rounded-xl
                        text-[#c1f89f]
                      "
                    >
                      {category.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-bold">{category.title}</h2>

                      <p className="theme-muted mt-1 text-xs">
                        {category.items.length}{' '}
                        {category.items.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>

                    {expanded ? (
                      <ChevronUp size={19} className="theme-subtle shrink-0" />
                    ) : (
                      <ChevronDown
                        size={19}
                        className="theme-subtle shrink-0"
                      />
                    )}
                  </button>

                  {expanded && (
                    <div className="border-t border-white/10 px-4">
                      {category.items.map((item, index) => (
                        <EquipmentRow
                          key={item.id}
                          item={item}
                          last={index === category.items.length - 1}
                        />
                      ))}
                    </div>
                  )}
                </article>
              )
            })}

            {filteredCategories.length === 0 && (
              <div className="theme-card rounded-2xl p-5 text-center">
                <p className="text-sm font-semibold">No equipment found</p>

                <p className="theme-muted mt-1 text-xs">
                  Try another search term.
                </p>
              </div>
            )}
          </div>
        </section>

        <BottomNav />
      </main>
    </AppShell>
  )
}

interface EquipmentRowProps {
  item: EquipmentItem
  last: boolean
}

function EquipmentRow({ item, last }: EquipmentRowProps) {
  return (
    <div
      className={`
        flex items-start gap-3 py-4
        ${last ? '' : 'border-b border-white/10'}
      `}
    >
      <div
        className="
          mt-0.5
          flex h-6 w-6
          shrink-0
          items-center justify-center
          rounded-full
          bg-[#c1f89f]/10
          text-[#c1f89f]
        "
      >
        <Check size={13} strokeWidth={2} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{item.name}</p>

        {item.description && (
          <p className="theme-muted mt-1 text-xs leading-snug">
            {item.description}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <EquipmentSourceBadge source={item.source} />

          {item.optionCode && (
            <span className="theme-subtle text-[10px]">{item.optionCode}</span>
          )}
        </div>
      </div>
    </div>
  )
}

interface EquipmentSourceBadgeProps {
  source: EquipmentSource
}

function EquipmentSourceBadge({ source }: EquipmentSourceBadgeProps) {
  if (source === 'manufacturer') {
    return (
      <span className="text-[10px] font-semibold text-[#c1f89f]">
        MANUFACTURER CONFIRMED
      </span>
    )
  }

  if (source === 'vin') {
    return (
      <span className="text-[10px] font-semibold text-[#c1f89f]">
        VIN CONFIRMED
      </span>
    )
  }

  if (source === 'document') {
    return (
      <span className="text-[10px] font-semibold text-[#c1f89f]">
        DOCUMENT CONFIRMED
      </span>
    )
  }

  return (
    <span className="theme-subtle text-[10px] font-semibold">UNCONFIRMED</span>
  )
}

interface SummaryValueProps {
  label: string
  value: string
}

function SummaryValue({ label, value }: SummaryValueProps) {
  return (
    <div>
      <p className="theme-subtle text-[10px] uppercase tracking-wider">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  )
}

export default FactoryEquipment
