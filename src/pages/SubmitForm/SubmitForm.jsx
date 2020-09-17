import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { StepperBtn } from '../../cmps/StepperBtn/StepperBtn';
import UtilsService from "../../services/UtilsService";
import CalendarService from '../../services/CalendarService';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { updateEmail, updateName, updatePhone, sendEmail } from '../../actions/formAction.js';
import './SubmitForm.scss';
export function _SubmitForm(props) {

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
    }, []);


    function setAppointment(time, date) {
        let treatmentsType = ''
        props.pickedTreatments.forEach((tr, idx) => {
            if (props.pickedTreatments.length !== idx + 1) treatmentsType += tr.name + ', '
            else treatmentsType += tr.name
        })
        console.log(treatmentsType);
        treatmentsType.substring()
        time = UtilsService.addHoursToMatchTheClock(time, 3)
        const startTime = `${date}T${time}:00Z`
        time = UtilsService.calculateEndTime(time, props.duration)
        const endTime = `${date}T${time}:00Z`
        console.log(startTime, endTime);
        CalendarService.update(startTime, endTime, treatmentsType, 'ayal', 'ayal@gmail.com')
    }

    function handleChange({ target }) {
        const field = target.name;
        const value = target.value;
        switch (field) {
            case 'name':
                props.updateName(value)
                break;
            case 'phone':
                props.updatePhone(value)
                break;
            case 'email':
                props.updateEmail(value)
                break;
        }
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
                <div>
                    <div className="black">שם מלא :</div>
                    <input name="name" value={props.name} onChange={handleChange} />
                </div>
                <div>
                    <div className="black">טלפון :</div>
                    <input name="phone" value={props.phone} onChange={handleChange} />
                </div>
                <div>
                    <div className="black">מייל :</div>
                    <input name="email" value={props.email} onChange={handleChange} />
                </div>

                <button>שלח</button>
            </form>
            <StepperBtn />
        </>
    );
}

function mapStateProps(state) {
    return {
        name: state.FormReducer.name,
        email: state.FormReducer.email,
        phone: state.FormReducer.phone,
        pickedTreatments: state.TreatmentReducer.pickedTreatments,
    }
}

const mapDispatchToProps = {
    updateEmail,
    updateName,
    updatePhone,
    sendEmail
}

export const SubmitForm = connect(mapStateProps, mapDispatchToProps)(_SubmitForm)
