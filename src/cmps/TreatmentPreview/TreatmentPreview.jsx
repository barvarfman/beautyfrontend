import React from 'react';
import './TreatmentPreview.scss';
import '../../styles/style.scss';
import { connect } from 'react-redux';
import { updateDuration, updatePickedTreatments } from '../../actions/treatmentActions';
import UtilService from '../../services/UtilsService'
import { SwitchApp } from '../SwitchApp/SwitchApp';

export function _TreatmentPreview(props) {
    function updateDuration(switchIsOn) {
        if (switchIsOn) {
            props.updateDuration(+props.treatment.duration)
        } else {
            props.updateDuration((+props.treatment.duration) * -1)
        }
    }

    function updatePickedTreatments(addOrRemove) {
        props.updatePickedTreatments(props.treatment, addOrRemove)
    }

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
                        <SwitchApp updateDuration={updateDuration} updatePickedTreatments={updatePickedTreatments} />
                        {props.treatment.duration + UtilService.englishToHebrew('minutes')}
                    </div>
                </div>
            }

        </div>
    )
}



function mapStateProps(state) {
    return {
        duration: state.TreatmentReducer.duration,
        pickedTreatments: state.TreatmentReducer.pickedTreatments
    }
}

const mapDispatchToProps = {
    updateDuration,
    updatePickedTreatments
}

export const TreatmentPreview = connect(mapStateProps, mapDispatchToProps)(_TreatmentPreview)
