import React from "react";
import { DailySlots } from '../DailySlots/DailySlots';
import UtilsService from '../../services/UtilsService';
import './TimeslotList.scss';

export function TimeslotList(props) {

    return (
        <div className="timeslot-list flex">
            {
                Object.keys(props.timeSlots).map(day => {
                    const date = (props.timeSlots[day])[0].start.slice(0, 10)
                    // running on each day
                    const slotsForPreview = UtilsService.getDailySlotsForPreview(props.timeSlots[day], 30)
                    return (
                        <div key={UtilsService.idGen()}>
                            <DailySlots  timeSlots={slotsForPreview} date={date} />
                        </div>
                    )
                })
            }
        </div>
    )
}
