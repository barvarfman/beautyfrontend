// import React from 'react';
import './DailyslotsPreview.scss';
import '../../styles/style.scss';
import React, { useState, useEffect } from "react";
import UtilsService from '../../services/UtilsService';

export function DailyslotsPreview(props) {

    useEffect(() => {
        // timeslots = UtilsService.getTimeSlotsForPreview(props.timeslot, props.duration)
        console.log(props.timeslots)
        console.log('gg',props.date);
    });

    return (
 
             <div className="dailyslots-preview flex column align-center space-between">
                {props.timeslots.map(ts => <button onClick={()=>props.setAppointment(ts,props.date)}
                className="timeslot-btn" key={UtilsService.idGen()}>{ts}</button>)}
             </div>
    )
}
