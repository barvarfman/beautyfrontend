import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { StepperBtn } from '../../cmps/StepperBtn/StepperBtn';
import UtilsService from "../../services/UtilsService";
import CalendarService from '../../services/CalendarService';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { updateEmail, updateName, updatePhone, sendEmail } from '../../actions/formAction.js';
import { setTimeSlots} from '../../actions/calendarActions.js';
import { setTreatment, updateDuration, initPickedTreatments} from '../../actions/treatmentActions.js';
import './SubmitForm.scss';
import {updateActiveStep} from '../../actions/stepperAction';
import {withRouter} from 'react-router-dom';

export function _SubmitForm(props) {

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
    }, []);

    async function setAppointment(time=props.treatment.time, date=props.treatment.date) {
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
        const confirmedEvent = await CalendarService.update(startTime, endTime, treatmentsType, 'ayal', 'ayal@gmail.com')
        const event = {phone:props.phone,eventId:confirmedEvent.id}
        CalendarService.saveConfirmedEvent(event)
        cancelAppointment ('043222222')
        sendEmail()
    }

    async function cancelAppointment (phone){
        const events = await CalendarService.getEventByPhone(phone)
        const eventToRmove = events[0]
        console.log ('event to remove', eventToRmove)
        CalendarService.remove(eventToRmove.eventId)
        // delete from mongo data base
        CalendarService.removeEventFromDB(eventToRmove._id)
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

    function sendEmail() {
        const {name,phone,email,duration,treatment,pickedTreatments} = props
        let treatmentsType = ''
        pickedTreatments.forEach((tr, idx) => {
            if (pickedTreatments.length !== idx + 1) treatmentsType += tr.name + ', '
            else treatmentsType += tr.name
        })
        let emailObj = {
            email,
            bodyText: `שלום, ${name} שמחים שבחרת במספרת קובי!
            נקבע לך תור ל${treatmentsType}  
            בתאריך ${treatment.date}
            בשעה ${treatment.time}
            משך זמן הטיפול מוערך כ- ${duration} דקות
            הטלפון שהתקבל ליצירת קשר הוא - ${phone}`
        }
        props.sendEmail(emailObj)
    }

    function initApp() {
        props.updateActiveStep(0)
        props.setTreatment(null)
        props.updateDuration (+props.duration*-1)
        props.initPickedTreatments()
        props.setTimeSlots(null)
        props.history.push('/')
    }

    return (
        <>
            <AppHeader />
            <div>
                <div>
                    <div className="black">שם מלא :</div>
                    <input name="name" value={props.name} onChange={handleChange} />
                </div>
                <div>
                    <div className="black">טלפון :</div>
                    <input name="phone" type="text" value={props.phone} onChange={handleChange} />
                </div>
                <div>
                    <div className="black">מייל :</div>
                    <input name="email" value={props.email} onChange={handleChange} />
                </div>
                <button onClick={initApp}>אתחול</button>
            </div>
            <StepperBtn setAppointment={setAppointment} />
        </>
    );
}

function mapStateProps(state) {
    return {
        name: state.FormReducer.name,
        email: state.FormReducer.email,
        phone: state.FormReducer.phone,
        pickedTreatments: state.TreatmentReducer.pickedTreatments,
        duration: state.TreatmentReducer.duration,
        treatment: state.TreatmentReducer.treatment,
    }
}

const mapDispatchToProps = {
    updateEmail,
    updateName,
    updatePhone,
    sendEmail,
    updateActiveStep,
    setTreatment,
    updateDuration,
    setTimeSlots,
    initPickedTreatments
}

export const SubmitForm = withRouter(connect(mapStateProps, mapDispatchToProps)(_SubmitForm))
