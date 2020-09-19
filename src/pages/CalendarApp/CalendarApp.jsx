import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { TimeslotList } from '../../cmps/TimeslotList/TimeslotList';
import CalendarService from '../../services/CalendarService';
import { loadTimeSlots, loaderSwitch } from '../../actions/calendarActions.js';
import UtilsService from "../../services/UtilsService";
import { StepperBtn } from '../../cmps/StepperBtn/StepperBtn';
import './CalendarApp.scss';
import { LoaderApp } from '../../cmps/LoaderApp/LoaderApp'
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
    const { loadTimeSlots } = props
    useEffect(() => loadTimeSlots(), [loadTimeSlots]);

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

    function handleDateChangeAndConvert(pickedDate) {
        props.loaderSwitch(false)
        handleDateChange(pickedDate)
        props.loadTimeSlots(pickedDate).then(() => props.loaderSwitch(true))
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
            <div >
                {(props.timeSlots && props.loader) ? <TimeslotList setAppointment={setAppointment} timeslots={props.timeSlots} />
                    : <LoaderApp />}
            </div>
            <StepperBtn />
        </>
    );
}

function mapStateProps(state) {
    return {
        timeSlots: state.CalendarReducer.timeSlots,
        loader: state.CalendarReducer.loader,
        duration: state.TreatmentReducer.duration,
        pickedTreatments: state.TreatmentReducer.pickedTreatments
    }
}

const mapDispatchToProps = {
    loadTimeSlots,
    loaderSwitch
}

export const CalendarApp = connect(mapStateProps, mapDispatchToProps)(_CalendarApp)
