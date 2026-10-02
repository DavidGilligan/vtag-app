interface EmptyGarageProps {
  onAddVehicle: () => void
}

function EmptyGarage({
  onAddVehicle,
}: EmptyGarageProps) {
  return (
    <div className="theme-card rounded-3xl px-6 py-12 text-center">

      <div
        className="
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          border
          border-[#c1efa3]/30
          bg-[#c1efa3]/5
        "
      >
        <span className="text-3xl">
          +
        </span>
      </div>

      <h2 className="mt-6 text-xl font-bold">
        Your garage is empty
      </h2>

      <p className="theme-muted mx-auto mt-2 max-w-[280px] text-sm leading-6">
        Add your first vehicle to begin building its V-TAG record.
      </p>

      <button
        type="button"
        onClick={onAddVehicle}
        className="
          mt-7
          rounded-2xl
          bg-[#c1efa3]
          px-6
          py-3
          text-sm
          font-bold
          text-black
          transition
          active:scale-[0.98]
        "
      >
        + Add Vehicle
      </button>

    </div>
  )
}

export default EmptyGarage