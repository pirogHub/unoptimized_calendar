import React, { Fragment } from 'react'
import Day from '../Day/Day'

export default function Month({ month }) {
    return (
        <div className='flex-1 grid grid-cols-7 grid-rows-5'>
            {month.map((week, rowIdx) => {


                return <Fragment key={week.id}>
                    {week.map((day, idx) => {

                        return <Day day={day} key={day.id} rowIdx={rowIdx} />
                    })}
                </Fragment>
            }
            )}

        </div>
    )
}
