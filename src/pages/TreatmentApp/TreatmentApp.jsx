import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTreatments } from '../../actions/treatmentActions.js';
import { loadCalendar } from '../../actions/calendarActions.js';
// import { TreatmentEdit } from '../TreatmentEdit/TreatmentEdit.jsx'
import { TreatmentList } from '../../cmps/TreatmentList/TreatmentList';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import './TreatmentApp.scss';
import '../../styles/style.scss';
import { StepperBtn } from '../../cmps/StepperBtn/StepperBtn';

export function _TreatmentApp(props) {
    const { loadTreatments, loadCalendar } = props
    useEffect(() => {
        loadTreatments()
        loadCalendar()
    }
        , [loadTreatments,loadCalendar]);

    const { treatments } = props;

    if (!treatments) return 'loading...'
    return (
        <>
            <AppHeader />
                <TreatmentList treatments={treatments} />
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
