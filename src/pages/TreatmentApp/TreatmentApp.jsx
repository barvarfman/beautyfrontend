import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadTreatments } from '../../actions/treatmentActions.js';
import { loadCalendar } from '../../actions/calendarActions.js';
// import { TreatmentEdit } from '../TreatmentEdit/TreatmentEdit.jsx'
import { TreatmentList } from '../../cmps/TreatmentList/TreatmentList';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import CalendarService from '../../services/CalendarService';
import './TreatmentApp.scss';
import '../../styles/style.scss';
import {StepperBtn} from '../../cmps/StepperBtn/StepperBtn';

export function _TreatmentApp(props) {

    useEffect( () => {
         props.loadTreatments()
         props.loadCalendar()
    }, []);

    const { treatments } = props;

    if (!treatments) return 'loading...'
    return (
        <>
            <AppHeader />
            <main className="home-page">
                <TreatmentList treatments={treatments} />
            </main>
            {/* <button onClick={()=>props.history.push('/calendar')}>הבא</button> */}
            <StepperBtn/>
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
