import React from 'react';
import './TreatmentPreview.scss';
import '../../styles/style.scss';
export function TreatmentPreview(props) {
    return (
        <div className="treatment-preview flex column align-center">
            {props.treatment && <div className="m">
                <div>
                    {props.treatment.duration+"דקות"}
                </div>
                <div>
                    <div>
                        {props.treatment.name}
                    </div>
                    <div>
                        {props.treatment.price}
                    </div>
                </div>

            </div>
            }

        </div>
    )
}
