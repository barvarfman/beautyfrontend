import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import {StepperBtn} from '../../cmps/StepperBtn/StepperBtn';
import UtilsService from "../../services/UtilsService";
import CalendarService from '../../services/CalendarService';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { updateEmail, sendEmail } from '../../actions/emailAction.js';

export function _SubmitForm(props) {

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
    }, []);

    function pushRoute(route) {
        props.history.push(route)
    }

    function setAppointment(time, date) {
        let treatmentsType=''
             props.pickedTreatments.forEach((tr,idx)=>{
                 if( props.pickedTreatments.length!==idx+1) treatmentsType+=tr.name+', '
                else treatmentsType+=tr.name
        })
        console.log(treatmentsType);
        treatmentsType.substring()
        time = UtilsService.addHoursToMatchTheClock(time, 3)
        const startTime = `${date}T${time}:00Z`
        time = UtilsService.calculateEndTime(time, props.duration)
        const endTime = `${date}T${time}:00Z`
        console.log(startTime, endTime);
        CalendarService.update(startTime, endTime,treatmentsType, 'ayal', 'ayal@gmail.com')
    }

    function handleChange({ target }) {
        const value = target.value;
        props.updateEmail(value)
    }

    function onSendEmail(ev) {
        ev.preventDefault()
        let emailObj = {
            email: props.email,
            bodyText: 'פה צריך להיכנס גוף ההודעה'
        }
        props.sendEmail(emailObj)
    }

    return (
        <>
            <AppHeader />
            <form onSubmit={onSendEmail}> 
                <input value={props.email} onChange={handleChange} placeholder="enter email" />
                <button>שלח</button>
            </form>
            <StepperBtn pushRoute={pushRoute}/>
        </>
    );
}

function mapStateProps(state) {
    return {
        email: state.EmailReducer.email,
        pickedTreatments: state.TreatmentReducer.pickedTreatments,
    }
}

const mapDispatchToProps = {
    updateEmail,
    sendEmail
}

export const SubmitForm = connect(mapStateProps, mapDispatchToProps)(_SubmitForm)
