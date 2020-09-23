// import React from 'react';
import './TimeslotList.scss';
import React, {useEffect } from "react";
import { DailySlots } from '../DailySlots/DailySlots';
import UtilsService from '../../services/UtilsService';
// import { TreatmentPreview } from '../TreatmentPreview/TreatmentPreview';

export function TimeslotList(props) {

    useEffect(() => {
    }, []);


    return (
        <div className="timeslot-list  flex">
            {
                // cahnge name properly --- timeslots is the arrays of each day/key 
                Object.keys(props.timeslots).map(day => {
                    var date = (props.timeslots[day])[0].start.slice(0, 10)
                    // running on each day
                    var slotsForPreview = UtilsService.getDailySlotsForPreview(props.timeslots[day], 30)
                    return (

                        <div key={UtilsService.idGen()}>
                            <DailySlots  timeslots={slotsForPreview} date={date} />
                        </div>
                    )
                })
            }

        </div>
    )
}
