import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import GlobalContext from "../../context/GlobalContext"

const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([])
  const { setSelectedEvent, filteredEvents: savedEvents, setDaySelected, SetShowEventModal }
    = useContext(GlobalContext)

  useEffect(() => {

    const events = savedEvents.filter(e => dayjs(e.day).format("DD-MM-YY") === day.format("DD-MM-YY"))
    setDayEvents(events)
  }, [savedEvents])

  function getCurrentDayCtyle() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : ""
  }


  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}

        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayCtyle()}`}>{day.format("DD")}</p>
      </header>
      <div
        onClick={() => {
          setDaySelected(day);
          SetShowEventModal(true)
        }}
        className="flex-1 cursor-pointer">
        {dayEvents.map((e, idx) => (
          <div
            key={e.id}
            onClick={() => setSelectedEvent(e)}
            className={`bg-${e.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {e.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Day
