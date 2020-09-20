import React, { useEffect } from "react";
import { connect } from 'react-redux';
import CalendarService from '../../services/CalendarService';
import './CancelAppointment.scss';
import { withRouter } from 'react-router-dom';
import { updatePhoneForCancel } from '../../actions/formAction.js';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
export function _CancelAppointment(props) {

    useEffect(() => {
    }, []);

    async function cancelAppointment() {
        const events = await CalendarService.getEventByPhone(props.phone)
        const eventToRmove = events[0]
        CalendarService.remove(eventToRmove.eventId)
        // delete from mongo data base
        CalendarService.removeEventFromDB(eventToRmove._id)
    }

    function handleChange({ target }) {
        const field = target.name;
        const value = target.value;
        switch (field) {
            case 'phone':
                props.updatePhoneForCancel(value)
                break;
            default:
                console.log("not working");
        }
    }

    return (
        <main>
            <AppHeader />
            <div>
                <div className="black">נא להזין מספר טלפון לביטול התור  :</div>
                <input name="phone" value={props.phone} onChange={handleChange} />
            </div>
            <button onClick={cancelAppointment}>מחק תור</button>
        </main>
    );
}

function mapStateProps(state) {
    return {
        phone: state.FormReducer.phoneForCancel,
    }
}

const mapDispatchToProps = {
    updatePhoneForCancel,
}

export const CancelAppointment = withRouter(connect(mapStateProps, mapDispatchToProps)(_CancelAppointment))
