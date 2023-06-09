import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'

const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
];


export default function EventModal() {
    const { selectedEvent, SetShowEventModal, daySelected, dispatchCalEvent } = useContext(GlobalContext)
    const [title, setTitle] = useState(selectedEvent?.title ? selectedEvent?.title : "")
    const [description, setDescription] = useState(selectedEvent?.description ? selectedEvent?.description : "")
    const [selectedLabel, setSelectedLabel] = useState(selectedEvent?.label ? labelsClasses.find((lbl) => lbl === selectedEvent?.label) : labelsClasses[0])

    const resetForm = () => {
        setTitle("")
        setDescription("")
        setSelectedLabel(labelsClasses[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const event = {
            title, description, label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now()
        }

        if (selectedEvent) {

            dispatchCalEvent({ type: "update", payload: event })
        } else {

            dispatchCalEvent({ type: "push", payload: event })
        }
        SetShowEventModal(false)
        resetForm()
    }
    return (
        <div className='h-screen w-full fixed left-0 top flex justify-center items-center'>
            <form className='bg-white rounded-lg shadow-2xl w-1/4'>
                <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
                    <span className='material-icons-outlined text-gray-400'>
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent &&

                            <span
                                onClick={() => {
                                    dispatchCalEvent({ type: "delete", payload: selectedEvent })
                                    SetShowEventModal(false)
                                    resetForm()
                                }}
                                className='material-icons-outlined text-gray-400 cursor-pointer'>
                                trash
                            </span>

                        }
                        <button onClick={() => {
                            SetShowEventModal(false)
                            resetForm()
                        }}>
                            <span className='material-icons-outlined text-gray-400'>
                                close
                            </span>
                        </button>

                    </div>
                </header>
                <div className="p-3">
                    <div className="grid grid-cols-1/5 items-end gap-y-7">
                        <div></div>


                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type='text' name='title' placeholder='Add title'
                            required
                            className='pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
                        />


                        <span className="material-icons-outlined text-gray-400">
                            schedule
                        </span>
                        <p>{daySelected.format("dddd, MMMM DD")}</p>
                        <span className="material-icons-outlined text-gray-400">
                            segment
                        </span>
                        <input
                            type="text"
                            name="description"
                            placeholder="Add a description"
                            value={description}
                            required
                            className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span className="material-icons-outlined text-gray-400">
                            bookmark_border
                        </span>
                        <div className='flex gap-x-2'>
                            {labelsClasses.map((lbc, idx) => (
                                <span key={lbc}
                                    onClick={() => setSelectedLabel(lbc)}
                                    className={`bg-${lbc}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                >
                                    {selectedLabel === lbc &&
                                        <span className="material-icons-outlined text-white text-sm">
                                            check
                                        </span>}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className="flex justify-end border-t p-3 mt-5">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div >
    )
}
