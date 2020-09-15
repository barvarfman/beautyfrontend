// import React from 'react';
import './TimeslotList.scss';
import React, { useState, useEffect } from "react";
import {DailyslotsPreview}  from '../DailyslotsPreview/DailyslotsPreview';
import UtilsService from '../../services/UtilsService';
// import { TreatmentPreview } from '../TreatmentPreview/TreatmentPreview';

export function TimeslotList(props) {

    useEffect(() => {
        console.log('timeslots',props.timeslots)
    }, []);

    return (
        <div className="timeslot-list flex">
            {
                // cahnge name properly --- timeslots is the arrays of each day/key 
                Object.keys(props.timeslots).map((day,idx) => {
                    // running on each day
                    var slotsForPreview = UtilsService.getDailySlotsForPreview (props.timeslots[day], 30)
                     return (
                        <div>
                          <DailyslotsPreview timeslots={slotsForPreview} key={idx} />
                        </div>
                    )
                })
            })
            }
        </div>
    )
}
