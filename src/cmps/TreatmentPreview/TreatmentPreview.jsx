import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateDuration, updatePickedTreatments } from '../../actions/treatmentActions';
import { SwitchApp } from '../SwitchApp/SwitchApp';
import UtilService from '../../services/UtilsService'
import './TreatmentPreview.scss';

export function _TreatmentPreview(props) {

    const [markedBySwitch, setMarkedBySwitch] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        //****change****** add isactive to each treatment in the array inside the array and check who is active
        let treatmentNames = props.pickedTreatments.map(treatment => treatment.name)
        setIsActive(treatmentNames.includes(props.treatment.name))
    }, [props.treatment, props.pickedTreatments])

    function updateDuration(switchIsOn) {
        if (switchIsOn) {
            props.updateDuration(+props.treatment.duration)
        } else {
            props.updateDuration((+props.treatment.duration) * -1)
        }
    }

    // ****change**** add isactive to each treatment in the array and mark the css by active/or not
    function updatePickedTreatments(addOrRemove) {
        props.updatePickedTreatments(props.treatment, addOrRemove)
        if (addOrRemove) {setMarkedBySwitch(" marked-by-switch")
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
                    <SwitchApp className="align-col" setIsActive={setIsActive} isActive={isActive} updateDuration={updateDuration} updatePickedTreatments={updatePickedTreatments} />
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
