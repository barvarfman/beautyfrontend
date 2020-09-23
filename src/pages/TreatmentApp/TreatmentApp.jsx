import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTreatments } from '../../actions/treatmentActions.js';
import { loadCalendar } from '../../actions/calendarActions.js';
import { TreatmentList } from '../../cmps/TreatmentList/TreatmentList';
import './TreatmentApp.scss';
import '../../styles/style.scss';
import { StepperBtn } from '../../cmps/StepperBtn/StepperBtn';
import { motion } from 'framer-motion'
const pageVariants={
    in:{
        opacity: 1 ,
        x:"0"
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

export function _TreatmentApp(props) {
    const { loadTreatments, loadCalendar } = props
    useEffect(() => {
        loadTreatments()
        loadCalendar()
    }
        , [loadTreatments, loadCalendar]);

    const { treatments } = props;

    if (!treatments) return 'loading...'
    return (
    <>
        <motion.div
            initial="out"
            exit="in"
            animate="in"
            variants={pageVariants}
            transition={pageTransition}
        >
            <TreatmentList treatments={treatments} />
        </motion.div>
    <StepperBtn />
    </>
    )
}

function mapStateProps(state) {
    return {
        treatments: state.TreatmentReducer.treatments,
        calendar: state.CalendarReducer.calendar
    }
}

const mapDispatchToProps = {
    loadTreatments,
    loadCalendar
}

export const TreatmentApp = connect(mapStateProps, mapDispatchToProps)(_TreatmentApp)
