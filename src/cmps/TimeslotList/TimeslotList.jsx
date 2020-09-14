// import React from 'react';
import './TimeslotList.scss';
import React, { useState, useEffect } from "react";
import {TimeslotPreview}  from '../../cmps/TimeslotPreview/TimeslotPreview';
// import { TreatmentPreview } from '../TreatmentPreview/TreatmentPreview';

export function TimeslotList(props) {

    useEffect(() => {
        console.log('timeslots',props.timeslots)
    }, []);

    return (
        <div className="timeslot-list flex column">
            {
                Object.entries(props.timeslots).map(([day, timeslots]) => {
                    return timeslots.map((timeslot,idx) => {
                     return (
                      <ul>
                            <TimeslotPreview timeslot={timeslot} key={idx} />
                            </ul>
                    )
                })
            })
            }
        </div>
    )
}
