import React from "react"

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => { },
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => { },
    daySelected: null,
    setDaySelected: (day) => { },
    showEventModal: false,
    SetShowEventModal: () => { },
    dispatchCalEvent: ({ type, payload }) => { },
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: (day) => { },
    labels: [],
    setLabels: () => { },
    updateLabel: (label) => { },
    filteredEvents: []
})

export default GlobalContext;