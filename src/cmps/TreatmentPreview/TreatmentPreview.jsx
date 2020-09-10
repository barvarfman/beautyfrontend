import React from 'react';
import './TreatmentPreview.scss';
import '../../styles/style.scss';
import UtilService from '../../services/UtilsService'

export function TreatmentPreview(props) {
    return (
        <div className="treatment-preview">
            {props.treatment && 
            <div className="preview-container flex align-center space-between">
                <div>
                    <div>
                        {props.treatment.name}
                    </div>
                    <div>
                        {props.treatment.price}
                    </div>
                </div>
                <div className="flex column">
                    <input class="switch" type="checkbox"></input>
                    {props.treatment.duration + UtilService.englishToHebrew('minutes')}
                </div>
            </div>
            }

        </div>
    )
}
