import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateDuration} from '../../actions/treatmentActions';
import { SwitchApp } from '../SwitchApp/SwitchApp';
import UtilService from '../../services/UtilsService'
import './TreatmentPreview.scss';
import TreatmentService from '../../services/TreatmentService';

export function _TreatmentPreview(props) {

    const [markedBySwitch, setMarkedBySwitch] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(props.treatment.marked)
    }, [props.treatment])

    function updateDuration(switchIsOn) {
        if (switchIsOn) {
            props.updateDuration(+props.treatment.duration)
        } else {
            props.updateDuration((+props.treatment.duration) * -1)
        }
    }

    // mark the treatment
    function updatePickedTreatments(isActive) {
        if (isActive) {
            updatedTreatment.marked = true
            setMarkedBySwitch(" marked-by-switch")
        } else {
            updatedTreatment.marked = false
            setMarkedBySwitch("")
        }
        const treatmentsToUpdate = TreatmentService.updateTreatments(treatments.slice(), {...props.treatment})
        props.updateTreatments(treatmentsToUpdate)
    }

    return (
        <div className={`treatment-preview ${(isActive)?'marked-by-switch':""} ${markedBySwitch}`}>
            {props.treatment &&
                <div className=" preview-container flex align-center space-between">
                    <div className="align-col-name">
                        {props.treatment.name}
                    </div>
                    <div className="align-col">{'₪' + props.treatment.price}</div>
                    <div className="align-col">{props.treatment.duration + UtilService.englishToHebrew('minutes')}</div>
                    <SwitchApp className="align-col" setIsActive={setIsActive} isActive={isActive} updateDuration={updateDuration} updatePickedTreatments={updatePickedTreatments} />
                </div>
            }
        </div>
    )
}

function mapStateProps(state) {
    return {
        duration: state.TreatmentReducer.duration,
        treatments: state.TreatmentReducer.treatments
    }
}

const mapDispatchToProps = {
    updateDuration,
    updateTreatments
}

export const TreatmentPreview = connect(mapStateProps, mapDispatchToProps)(_TreatmentPreview)
