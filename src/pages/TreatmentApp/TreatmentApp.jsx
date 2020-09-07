import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTreatments } from '../../actions/treatmentActions.js';
// import { TreatmentEdit } from '../TreatmentEdit/TreatmentEdit.jsx'
import { TreatmentList } from '../../cmps/TreatmentList/TreatmentList';
import './TreatmentApp.scss';
import '../../styles/style.scss';


class _TreatmentApp extends Component {

    state = {
        treatment: ''
    }


    async componentDidMount() {
        await this.props.loadTreatments()
    }
    render() {
        const { treatments } = this.props;

        if (!treatments) return 'loading...'
        return (
            <>
            <header className="main-header"/>
            <main className="home-page">
                <TreatmentList treatments={treatments} />
            </main>
            </>
        )
    }
}


function mapStateProps(state) {
    return {
        treatments: state.TreatmentReducer.treatments
    }
}

const mapDispatchToProps = {
    loadTreatments,
}

export const TreatmentApp = connect(mapStateProps, mapDispatchToProps)(_TreatmentApp)
