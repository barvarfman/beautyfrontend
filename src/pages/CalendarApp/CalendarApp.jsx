import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import {TimeslotList}  from '../../cmps/TimeslotList/TimeslotList';
import CalendarService from '../../services/CalendarService';
import { updateEmail, sendEmail } from '../../actions/emailAction.js';
import { loadTimeSlots } from '../../actions/calendarActions.js';

const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: '#e91e63',
            },
        },

        MuiPickersDay: {
            day: {
                color: 'black',
            },
            daySelected: {
                backgroundColor: '#e91e63',
            },
            dayDisabled: {
                color: '#e91e63',
            },
            current: {
                color: '#e91e63',
            },
        },
        MuiPickersModal: {
            dialogAction: {
                color: '#e91e63',
            },
        },
    },
});

export function _CalendarApp(props) {
    const [selectedDate, handleDateChange] = useState(new Date());

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        props.loadTimeSlots()
        // setAppointment()
    }, []);


    function setAppointment () {
        CalendarService.update ("2020-09-17T10:30:00Z", "2020-09-17T11:30:00Z", 'zipor', 'ayal', 'ayal@gmail.com')
    }

    function handleDateChangeAndConvert(pickedDate) {
        handleDateChange(pickedDate)
<<<<<<< HEAD
        loadTimeSlots(pickedDate)
=======
        props.loadTimeSlots(pickedDate)
>>>>>>> 26dfa6107dc7478730881520f3dd41cb0d7772c3
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
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={heLocale}>
                <ThemeProvider theme={materialTheme}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="dialog"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        value={selectedDate}
                        onChange={handleDateChangeAndConvert}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </ThemeProvider>
            </MuiPickersUtilsProvider>
            {(props.timeSlots)? <TimeslotList timeslots={props.timeSlots}/> : ' '}
            <form onSubmit={onSendEmail}>
                <input value={props.email} onChange={handleChange} placeholder="enter email" />
                <button>שלח</button>
            </form>
            <button onClick={() => props.history.push('/')}>חזרה</button>
        </>
    );
}

function mapStateProps(state) {
    return {
        email: state.EmailReducer.email,
        timeSlots: state.CalendarReducer.timeSlots
    }
}

const mapDispatchToProps = {
    updateEmail,
    sendEmail,
    loadTimeSlots
}

export const CalendarApp = connect(mapStateProps, mapDispatchToProps)(_CalendarApp)
