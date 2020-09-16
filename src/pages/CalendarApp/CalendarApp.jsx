import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme, duration } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { TimeslotList } from '../../cmps/TimeslotList/TimeslotList';
import CalendarService from '../../services/CalendarService';
// import { updateEmail, sendEmail } from '../../actions/emailAction.js';
import { loadTimeSlots } from '../../actions/calendarActions.js';
import UtilsService from "../../services/UtilsService";
import {StepperBtn} from '../../cmps/StepperBtn/StepperBtn';

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

    function handleDateChangeAndConvert(pickedDate) {
        handleDateChange(pickedDate)
        props.loadTimeSlots(pickedDate)
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
            {(props.timeSlots) ? <TimeslotList setAppointment={setAppointment} timeslots={props.timeSlots} /> : ' '}
            <StepperBtn pushRoute={pushRoute}/>
        </>
    );
}

function mapStateProps(state) {
    return {
        timeSlots: state.CalendarReducer.timeSlots,
        duration: state.TreatmentReducer.duration,
        pickedTreatments: state.TreatmentReducer.pickedTreatments
    }
}

const mapDispatchToProps = {
    loadTimeSlots
}

export const CalendarApp = connect(mapStateProps, mapDispatchToProps)(_CalendarApp)
