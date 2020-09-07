import React from 'react';
import './TreatmentList.scss';
import '../../styles/style.scss';
import { TreatmentPreview } from '../TreatmentPreview/TreatmentPreview';

export function TreatmentList(props) {
    return (
        <div className="treatment-list flex space-between wrap">
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
