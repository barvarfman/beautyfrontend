import React, { useState } from "react";
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
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

    function handleDateChangeAndConvert(ev) {
        handleDateChange(ev)

        let datePicked = ev.toString().split(" ").slice(0, 4)
        let dateObj = {
            day: datePicked[0],
            month: datePicked[1],
            dayDigit: datePicked[2],
            year: datePicked[3]
        }
        console.log(dateObj);
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
