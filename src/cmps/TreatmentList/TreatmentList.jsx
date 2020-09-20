import React from 'react';
import './TreatmentList.scss';
import '../../styles/style.scss';
import UtilsService from '../../services/UtilsService';
import { TreatmentPreview } from '../TreatmentPreview/TreatmentPreview';

export function TreatmentList(props) {
    return (
        <div className="treatment-list flex column">
            {
                props.treatments.map(treatment => {
                    let id=UtilsService.idGen()
                    return (
                        <div key={id}>
                            <TreatmentPreview treatment={treatment}  />
                        </div>

                    )
                })
            }
        </div>
    )
}
