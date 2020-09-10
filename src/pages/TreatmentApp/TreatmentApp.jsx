import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTreatments } from '../../actions/treatmentActions.js';
import { loadCalendar } from '../../actions/calendarActions.js';
// import { TreatmentEdit } from '../TreatmentEdit/TreatmentEdit.jsx'
import { TreatmentList } from '../../cmps/TreatmentList/TreatmentList';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import './TreatmentApp.scss';
import '../../styles/style.scss';


class _TreatmentApp extends Component {

    async componentDidMount() {
        await this.props.loadTreatments()
        await this.props.loadCalendar()
    }

    render() {
        const { treatments } = this.props;

        if (!treatments) return 'loading...'
        return (
            <>
            <AppHeader></AppHeader>
            <main className="home-page">
                <TreatmentList treatments={treatments} />
            </main>
            </>
        )
    }
}


function mapStateProps(state) {
    return {
        treatments: state.TreatmentReducer.treatments,
        calendar:state.CalendarReducer.calendar
    }
}

const mapDispatchToProps = {
    loadTreatments,
    loadCalendar
}

export const TreatmentApp = connect(mapStateProps, mapDispatchToProps)(_TreatmentApp)
