import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import heLocale from "date-fns/locale/he";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { TimeslotList } from '../../cmps/TimeslotList/TimeslotList';
import { loadTimeSlots, loaderSwitch } from '../../actions/calendarActions.js';
import { StepperBtn } from '../../cmps/StepperBtn/StepperBtn';
import './CalendarApp.scss';
import { LoaderApp } from '../../cmps/LoaderApp/LoaderApp'
import { motion } from 'framer-motion'

const pageVariants={
    in:{
        opacity: 1 ,
        x:0
    },
    out:{
        opacity: 0,
        x:"50%"
    }
}
const pageTransition={
    duration:1.3,
    type:"spring",
    stiffness:50
}

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
    },
});

export function _CalendarApp(props) {
    const [selectedDate, handleDateChange] = useState(new Date());

    // Similar to componentDidMount and componentDidUpdate:
    const { loadTimeSlots } = props
    useEffect(() => { loadTimeSlots() }, [loadTimeSlots]);

    function handleDateChangeAndConvert(pickedDate) {
        props.loaderSwitch(false)
        handleDateChange(pickedDate)
        props.loadTimeSlots(pickedDate).then(() => props.loaderSwitch(true))
    }


    return (
        <motion.div
            initial="out"
            exit="in"
            animate="in"
            variants={pageVariants}
            transition={pageTransition}
        >
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
                {(props.timeSlots && props.loader) ? <TimeslotList timeslots={props.timeSlots} />
                    : <LoaderApp />}
            </div>
            <StepperBtn />
        </motion.div>
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
