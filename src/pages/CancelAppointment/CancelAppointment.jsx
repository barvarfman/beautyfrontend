import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import UtilsService from "../../services/UtilsService";
import CalendarService from '../../services/CalendarService';
import './CancelAppointment.scss';
import { withRouter } from 'react-router-dom';
import { updatePhoneForCancel } from '../../actions/formAction.js';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { motion } from 'framer-motion'

const pageVariants = {
    in: {
        opacity: 1,
        x: 0
    },
    out: {
        opacity: 0,
        x: "50%"
    }
}

const pageTransition = {
    duration: 1.3,
    type: "spring",
    stiffness: 50
}

export function _CancelAppointment(props) {

    const [eventToCancel, setEventToCancel] = useState(null)
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
                color: '#172b4d'
            },
        },
    }));

    useEffect(() => {
    }, []);

    async function cancelAppointment() {
        const events = await CalendarService.getEventByPhone(props.phone)
        const eventToRmove = events[0]
        CalendarService.remove(eventToRmove.eventId)
        // delete from mongo data base
        CalendarService.removeEventFromDB(eventToRmove._id)
        
        setEventToCancel(null)
    }

    function handleChange({ target }) {
        const field = target.name;
        const value = target.value;
        switch (field) {
            case 'phone':
                if (value.length >= 9 && value.length <= 10) {
                    CalendarService.getEventByPhone(value)
                        .then(ev => {
                            const dateParts = (ev[0].date).split('-')
                            const dateIsraeliDisplay = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
                            setEventToCancel({
                                treatments: ev[0].treatments,
                                startTime: UtilsService.changeTimeForDisplay(ev[0].startTime, -3),
                                endTime: UtilsService.changeTimeForDisplay(ev[0].endTime, -3),
                                date: dateIsraeliDisplay,
                            })
                        })
                }
                props.updatePhoneForCancel(value)
                break;
            default:
                console.log("not working");
        }


    }

    const classes = useStyles();


    return (
        <motion.div
            initial="out"
            exit="in"
            animate="in"
            variants={pageVariants}
            transition={pageTransition}
        >
            <main className="cancel-appointment">
                <div>
                    <div className="cancel-form-title">נא להזין מספר טלפון לביטול התור  :</div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div className="cancel-input-wrapper flex">
                            <TextField className={classes.root} name="phone" id="outlined-basic" variant="outlined" value={props.phone} onChange={handleChange} />
                        </div>
                    </form>

                </div>
                {eventToCancel &&
                    <div className="apointment-details">
                        <div>פרטי התור הקיימים עבור מספר טלפון זה -</div>
                        <div> סוג הטיפול : {eventToCancel.treatments}</div>
                        <div> בתאריך : {eventToCancel.date}</div>
                        <div> בין השעות : {`${eventToCancel.endTime} - ${eventToCancel.startTime}`}</div>
                    </div>
                }
                {(eventToCancel) && <button onClick={cancelAppointment} className="trash-btn"> מחק תור <i className="fas fa-trash" ></i></button>}
            </main>
        </motion.div>
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


