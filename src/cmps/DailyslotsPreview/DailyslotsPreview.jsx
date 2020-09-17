// import React from 'react';
import './DailyslotsPreview.scss';
import '../../styles/style.scss';
import React, { useState, useEffect } from "react";
import UtilsService from '../../services/UtilsService';
import { connect } from 'react-redux';
import { setTreatment } from '../../actions/treatmentActions';
import {updateActiveStep} from '../../actions/stepperAction';
import {withRouter} from 'react-router-dom';
 function _DailyslotsPreview(props) {

    useEffect(() => {
    });
    function onAppointmentChoice(ts, date,diff) {
        props.updateActiveStep(props.activeStep + diff)
        let treatment = {
            time: ts,
            date
        }
        props.setTreatment(treatment)
        props.history.push('/form')
    }

    return (

        <div className="dailyslots-preview flex column align-center space-between">
            {props.timeslots.map(ts => <button onClick={() => onAppointmentChoice(ts, props.date,1)}
                className="timeslot-btn" key={UtilsService.idGen()}>{ts}</button>)}
        </div>
    )
}


function mapStateProps(state) {
    return {
        treatment: state.TreatmentReducer.treatment,
        activeStep: state.StepperReducer.step
    }
}


const mapDispatchToProps = {
    setTreatment,
    updateActiveStep
}

export const DailyslotsPreview = withRouter(connect(mapStateProps, mapDispatchToProps)(_DailyslotsPreview))
