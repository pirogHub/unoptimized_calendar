import { useContext } from "react"
import Arrow from "../Arrow"
import GlobalContext from "../../context/GlobalContext"
import dayjs from "dayjs"

const CalendarHeader = () => {

    const { monthIndex, setMonthIndex } = useContext(GlobalContext)
    const handeReset = () => {
        setMonthIndex(prev => monthIndex === dayjs().month() ? monthIndex + Math.random() : monthIndex)
    }
    return (


        <header
            className='px-4 py-2 flex items-center'
        >
            <img src="" />
            <h1
                className="mr-10 text-xl text-gray-500 font-bold"
            >
                Calendar
            </h1>
            <button
                onClick={handeReset}
                className="border rounded py-2 px-4 mr-5"
            >
                Today
            </button>
            <button
                className="px-2 hover:bg-slate-300 transition-all"
                onClick={() => setMonthIndex(prev => prev - 1)}>
                <Arrow />
            </button>
            <h2 className="mx-2 text-xl text-gray-500 font-bold ">
                {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </h2>
            <button
                className="px-2 hover:bg-slate-300 transition-all"
                onClick={() => setMonthIndex(prev => prev + 1)}>
                <Arrow isRight />
            </button>

        </header>

    )
}

export default CalendarHeader