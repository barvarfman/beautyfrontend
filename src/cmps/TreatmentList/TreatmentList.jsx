import React from 'react';
import './TreatmentList.scss';
import '../../styles/style.scss';
import { TreatmentPreview } from '../TreatmentPreview/TreatmentPreview';

export function TreatmentList(props) {
    return (
        <div className="treatment-list flex column">
            {
                props.treatments.map(treatment => {
                    return (
                        <>
                            <TreatmentPreview treatment={treatment} key={treatment._id} />
                        </>

                    )
                })
            }
        </div>
    )
}
