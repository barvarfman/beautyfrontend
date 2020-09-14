import React from 'react';
import './TimeslotPreview.scss';
import '../../styles/style.scss';
import UtilsService from '../../services/UtilsService';

export function TimeslotPreview(props) {
    let x=150
    return (
        <li className="timeslot-preview">
            {props.timeslot && 
            <div className="preview-container flex align-center space-between">
                {props.timeslot.start}
                {props.timeslot.end}
                <button onClick={()=>{UtilsService.getTimeSlotsForPreview(props.timeslot,x)}}></button>
            </div>
            }

        </li>
    )
}
