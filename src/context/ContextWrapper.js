import React, { useEffect, useMemo, useReducer, useState } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'

function savedEventsReducer(state, { type, payload }) {
    switch (type) {
        case "push":
            return [...state, payload]
        case "update":
            return state.map(e => e.id === payload?.id ? payload : e)
        case "delete":
            return state.filter(e => e.id !== payload?.id)
        default:
            throw new Error()

    }
}

function initEvents() {
    const storageEvents = localStorage.getItem('savedEvents')
    let parsedEvents = []

    if (storageEvents) {
        try {
            parsedEvents = JSON.parse(storageEvents)
        } catch (error) {
            localStorage.removeItem('savedEvents')
            parsedEvents = []
        }
    }
    return parsedEvents
}

export default function ContextWrapper(props) {

    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [daySelected, setDaySelected] = useState(dayjs())
    const [showEventModal, SetShowEventModal] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents)
    const [labels, setLabels] = useState([])
    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents))
    }, [savedEvents])
    useEffect(() => {
        setLabels(prevLabels => {

            return [...new Set(savedEvents.map(e => e.label))]
                .map(label => {
                    const curLabel = prevLabels.find(lbl => lbl.label === label)
                    return {
                        label,
                        checked: curLabel ? curLabel.checked : true
                    }
                })
        })
    }, [savedEvents])

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth)
        }
    }, [])

    const filteredEvents = useMemo(() => {
        return savedEvents.filter(e =>
            (labels
                .filter(lbl => lbl.checked))
                .map(lbl => lbl.label)
                .includes(e.label))
    }, [savedEvents, labels])

    function updateLabel(label) {
        setLabels(
            labels.map(lbl => lbl.label === label.label ? label : lbl)
        )
    }

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null)
        }
    }, [showEventModal])

    return (
        <GlobalContext.Provider value={{
            monthIndex,
            setMonthIndex,
            smallCalendarMonth,
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            showEventModal,
            SetShowEventModal,
            dispatchCalEvent,
            savedEvents,
            selectedEvent,
            setSelectedEvent,
            labels,
            setLabels,
            updateLabel,
            filteredEvents
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
