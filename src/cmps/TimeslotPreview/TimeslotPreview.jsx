import React from 'react';
import './TimeslotPreview.scss';
import '../../styles/style.scss';

export function TimeslotPreview(props) {
    return (
        <div className="timeslot-preview">
            {props.timeslot && 
            <div className="preview-container flex align-center space-between">
                <div>
                    <pre>
                        {props.timeslot.start}
                        {props.timeslot.end}
                    </pre>
                </div>
            </div>
            }

        </div>
    )
}
