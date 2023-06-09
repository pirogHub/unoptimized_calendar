import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import { getMonth } from '../util'
import GlobalContext from '../context/GlobalContext'

export default function SmallCalendar() {

    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month())
    const [currentMonth, setCurrentMonth] = useState(getMonth())

    const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } = useContext(GlobalContext)

    useEffect(() => {
        setCurrentMonthIdx(prev => monthIndex)
    }, [monthIndex])

    useEffect(() => {
        setCurrentMonth(prev => getMonth(currentMonthIdx))
    }, [currentMonthIdx])


    const getDayClass = (day) => {
        const format = "DD-MM-YY"
        const nowDay = dayjs().format(format)
        const currDay = day.format(format)
        const slcDay = daySelected && daySelected.format(format)
        if (nowDay === currDay) {
            return "bg-blue-500 rounded-full text-white"
        } else if (currDay === slcDay) {
            return "bg-blue-100 rounded-full text-blue-600 font-bold"
        } else {
            return ""
        }
    }
    return (
        <div className='mt-9'>
            <header className='flex justify-between'>
                <p className='text-gray-500 font-bold'>
                    {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}

                </p>
                <div>
                    <button
                        onClick={() => setCurrentMonthIdx(prev => prev - 1)}
                    >
                        <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                            chevron_left
                        </span>
                    </button>
                    <button onClick={() => setCurrentMonthIdx(prev => prev + 1)}>
                        <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>
                            chevron_right
                        </span>
                    </button>
                </div>
            </header>
            <div className="grid grid-cols-7 grid-rows-6">
                {currentMonth[0].map((day, idx) => (
                    <span key={day.id} className="text-sm py-1 text-center">
                        {day.format('dd').charAt(0)}
                    </span>
                ))}
                {currentMonth.map((row, idx) => (
                    <React.Fragment key={idx}>
                        {row.map((day, idx) => (
                            <button
                                onClick={() => {

                                    setSmallCalendarMonth(currentMonthIdx)
                                    setDaySelected(day)
                                }
                                }
                                key={idx} className={`py-1 w-full ${getDayClass(day)}`} >
                                <span className='text-sm'>{day.format("D")}</span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div >
    )
}
