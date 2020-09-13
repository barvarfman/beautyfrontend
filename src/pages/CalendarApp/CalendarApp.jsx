import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import CalendarService from '../../services/CalendarService';
import { updateEmail, sendEmail } from '../../actions/emailAction.js';

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
        loadTimeSlots()
        // setAppointment()
    });

    function loadTimeSlots(pickedDate = null){
        if (!pickedDate) {
            var firstDay = getIsosDate (0)
            var secondDay = getIsosDate (1)
            var thirdDay = getIsosDate (2)
        } else {
            firstDay = getIsosDate (-1, pickedDate)
            secondDay = getIsosDate (0,  pickedDate)
            thirdDay = getIsosDate (1, pickedDate ) 
        }
        CalendarService.getAvailbleDailySlots(`${firstDay}T05:00:00`, `${firstDay}T17:00:00`, '1H')
        CalendarService.getAvailbleDailySlots(`${secondDay}T05:00:00`, `${secondDay}T17:00:00`, '1H')
        CalendarService.getAvailbleDailySlots(`${thirdDay}T05:00:00`, `${thirdDay}T17:00:00`, '1H')
    }

    function getIsosDate (daysAfterOrBefore, date = new Date()) {
        var dateCopy = new Date(date.getTime())
        dateCopy.setDate(dateCopy.getDate() + daysAfterOrBefore)
        dateCopy = dateCopy.toISOString().slice(0,10)
        console.log(dateCopy)
        return dateCopy
    }

    function setAppointment () {
        CalendarService.update ("2020-09-17T11:30:00Z", "2020-09-17T12:30:00Z", 'zipornaimlebar', 'ayal', 'ayal@gmail.com')
    }

    function handleDateChangeAndConvert(pickedDate) {
        // handleDateChange(pickedDate)
        loadTimeSlots(pickedDate)
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
            <form onSubmit={onSendEmail}>
                <input value={props.email} onChange={handleChange} placeholder="enter email" />
                <button >שלח</button>
            </form>
            <button onClick={() => props.history.push('/')}>חזרה</button>
        </>
    );
}




function mapStateProps(state) {
    return {
        email: state.EmailReducer.email
    }
}

const mapDispatchToProps = {
    updateEmail,
    sendEmail
}

export const CalendarApp = connect(mapStateProps, mapDispatchToProps)(_CalendarApp)
