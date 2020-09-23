import React, { useState, useEffect } from 'react';
import './TreatmentPreview.scss';
import '../../styles/style.scss';
import { connect } from 'react-redux';
import { updateDuration, updatePickedTreatments } from '../../actions/treatmentActions';
import UtilService from '../../services/UtilsService'
import { SwitchApp } from '../SwitchApp/SwitchApp';

export function _TreatmentPreview(props) {

    const [markedBySwitch, setMarkedBySwitch] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
            let trNames = props.pickedTreatments.map(treatment => treatment.name)
            setIsActive(trNames.includes(props.treatment.name))
    }, [props.treatment, props.pickedTreatments])


    function updateDuration(switchIsOn) {
        if (switchIsOn) {
            props.updateDuration(+props.treatment.duration)
        } else {
            props.updateDuration((+props.treatment.duration) * -1)
        }
    }

    function updatePickedTreatments(addOrRemove) {
        props.updatePickedTreatments(props.treatment, addOrRemove)
        if (addOrRemove === 'add') {
            setMarkedBySwitch(" marked-by-switch")
        } else {
            setMarkedBySwitch("")
        }
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
                    <SwitchApp setIsActive={setIsActive} isActive={isActive} className="align-col" updateDuration={updateDuration} updatePickedTreatments={updatePickedTreatments} />
                </div>
            }
        </div>
    )
}



function mapStateProps(state) {
    return {
        duration: state.TreatmentReducer.duration,
        pickedTreatments: state.TreatmentReducer.pickedTreatments,
        path: state.TreatmentReducer.path,
    }
}

const mapDispatchToProps = {
    updateDuration,
    updatePickedTreatments
}

export const TreatmentPreview = connect(mapStateProps, mapDispatchToProps)(_TreatmentPreview)
